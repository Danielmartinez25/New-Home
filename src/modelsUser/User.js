const fs = require ('fs');
const path = require("path");

const User = {

    getData: function () {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'),'utf-8'));
    },

    generateId: function (){
        let allUsers = this.findAll ();     /* obtengo todos los usuarios */
        let lastUser = allUsers.pop();      /* Me quedo con el ultimo usuario */
        if (lastUser){
            return lastUser.id + 1;
        }
        /* Si no existe ningun usuario */
        return 1;   
    },

    findAll: function () {
        return this.getData();
    },

    findById : function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find (oneUser => oneUser.id === id);
        return userFound;
    },

    findByTag: function (tag, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find (oneUser => oneUser[tag] === text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push (newUser);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(allUsers,null,3),'utf-8');
        return newUser;
        
    },

    delete : function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter (oneUser => oneUser.id !== id);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(finalUsers,null,3),'utf-8');
        return true;
    }

}



module.exports = User;