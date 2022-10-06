module.exports = (req,res,next) => {
    if(req.cookies.newHome){
        req.session.userLogged = req.cookies.newHome
    }
    next()
}