const db = require("../../database/models");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { sendJsonError } = require("../../helpers/sendJsonError");


module.exports = {
  register: async (req, res) => {
    const { name, surname, email, password, street, city, province } = req.body;

    try {
      const { id, rolId } = await db.User.create({
        name: name?.trim(),
        surname: surname?.trim(),
        email: email?.trim(),
        password: password?.trim(),
        street: street?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        avatar: req.file?.filename,
        rolId: 2,
      });
      await db.Address.create({
        street: name?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        userId: id,
      });

      /*       const token = sign({ id, rolId }, process.env.SECRET_KEY_JWT, {
        expiresIn: "4h",
      }); */

      return res.status(201).json({
        ok: true,
        status: 201,
        /*         token, */
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendJsonError("El email y password son requeridos", res, 401);
      }

      const user = await db.User.findOne({ where: { email } });

      const {
        id,
        rolId,
        password: passwordHash,
      } = user || { id: null, rolId: null, password: null };

      if (!user) {
        return sendJsonError(
          "No existe ningún usuario con ese email",
          res,
          404
        );
      }

      const isPassValid = await compare(password, passwordHash);

      if (!isPassValid) {
        return sendJsonError("Credenciales invalidas", res);
      }

      /*       const token = await sign({ id, rolId }, process.env.SECRET_KEY_JWT, {
        expiresIn: "4h",
      }); */

      res.status(200).json({
        ok: true,
        status: 200,
        /*         token,
              urlData: `${req.protocol}://${req.get("host")}${
                req.baseUrl
              }/me/${token}`, */
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  update: async (req, res) => {
    const { id } = req.userToken;
    const { name, surname, street, city, province } = req.body;
    try {
      const options = {
        include: [
          {
            association: "addresses",
            attributes: {
              exclude: ["userId", "deletedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["deletedAt", "password"],
          include: [literalQueryUrlImage(req, "avatar", "avatar", "/users")],
        },
      };
      const user = await db.User.findByPk(id, options);

      user.name = name?.trim() || user.name;
      user.surname = surname?.trim() || user.surname;
      user.avatar = req.file?.filename || user.avatar;

      const indexAddressActive = user.addresses.findIndex(
        (address) => address.active === true
      );
      const address = user.addresses[indexAddressActive];

      address.street = street?.trim() || address.street;
      address.city = city?.trim() || address.city;
      address.province = province?.trim() || address.province;

      await user.save();
      await address.save();

      return res.status(200).json({
        ok: true,
        status: 200,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Ocurrió un error",
      });
    }
  },
  remove: async (req, res) => {
    try {
      const userId = req.params.id || req.userToken.id;
      const removeAddress = await db.Address.destroy({
        where: { userId } /* ,force:true */,
      }); /* == userId : userId */
      const removeUser = await db.User.destroy({
        where: { id: userId } /* ,force:true */,
      });

      if (!removeUser || !removeAddress) {
        return res.status(404).json({
          ok: false,
          status: 404,
          msg: "Es probable que el usuario no existe",
        });
      }

      return res.status(200).json({
        ok: true,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Server error",
      });
    }
  },
};
