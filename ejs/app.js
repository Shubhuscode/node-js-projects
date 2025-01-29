// app.js
const express = require('express');
const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample product data
const products = [
    { id: 1, name: 'Laptop', price: 75000 },
    { id: 2, name: 'Mobile', price: 25000 },
    { id: 3, name: 'Tablet', price: 35000 }
];

app.get('/items', (req, res) => {
  const items = ['Laptop', 'Smartphone', 'Headphones'];
  res.render('items', { items });
});
// Route to render the products page
app.get('/products', (req, res) => {
    res.render('products', {
        title: 'Product Catalog',
        products: products
    });
});

// Start the Express app
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
