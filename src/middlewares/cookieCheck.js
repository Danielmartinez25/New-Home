module.exports = (req,res,next) => {
    if(req.cookies.newHome){
        req.session.userLogin= req.cookies.newHome
        res.locals.userLogin = req.session.userLogin;
    }
    next()
}