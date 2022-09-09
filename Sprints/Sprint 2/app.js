const express = require ('express');
const path = require ('path');
const app = express();
const port = 3030;

app.use (express.static('public'));

app.get ('/', (req,res) => res.sendFile (path.join(__dirname, 'views', 'index.html')))
app.get ('/index', (req,res) => res.sendFile (path.join(__dirname, 'views', 'index.html')))
app.get ('/login', (req,res) => res.sendFile (path.join(__dirname, 'views', 'login.html')))
app.get ('/productCart', (req,res) => res.sendFile (path.join(__dirname, 'views', 'productCart.html')))
app.get ('/productDetail', (req,res) => res.sendFile (path.join(__dirname, 'views', 'productDetail.html')))
app.get ('/register', (req,res) => res.sendFile (path.join(__dirname, 'views', 'register.html')))

app.listen (port, () => console.log(`Server running in port: http://localhost:` + port));