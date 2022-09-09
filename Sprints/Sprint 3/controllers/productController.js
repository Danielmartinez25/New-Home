module.exports = {
    productDetail : (req,res) => {
        return res.render('productDetail')   
    },
    productCart : (req,res) => {
        return res.render('productCart',{
            title : 'Carrito'
        })   
    },
    productAdd : (req,res) => {
        return res.render('productAdd',{
            title : 'Actualizar'
        })   
    },
    productEdition: (req,res) => {
        return res.render('productEdition',{
            title : 'Edición'
        })   
    }
}
