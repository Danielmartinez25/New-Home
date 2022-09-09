module.exports = (req,res,next) => {
    if(req.session.userLogged && req.session.userLogged.rol === 'admin'){
        next()
    }else{
        res.redirect('/')
    }
}