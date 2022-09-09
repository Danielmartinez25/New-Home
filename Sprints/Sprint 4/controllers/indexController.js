const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index : (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json')));
        let loMejor = products.filter(product => product.section === "lo mejor" && product.discount <= 20 );
        let oferta = products.filter(product =>  product.section === "oferta");

        return res.render('index', {
             title: 'New Home',
             loMejor,
             oferta,
             toThousand
    });
  },
  search : (req,res) => {

    let {keywords} = req.query;
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json')));

    let result = products.filter(product => product.title.toLowerCase().includes(keywords.toLowerCase()));

    return res.render('results', {
        products: result ,
        keywords : req.query.keywords,
        toThousand
    })
}
};