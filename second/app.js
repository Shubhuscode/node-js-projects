const express = require('express');
const app = express();

// Set up Pug as the templating engine
app.set('view engine', 'pug');

// Route to render the home page
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Welcome', message: 'Dynamic content with Pug and Express!' });
});

// Route to render a list of items (example route)
app.get('/items', (req, res) => {
  const items = ['Laptop', 'Smartphone', 'Tablet'];
  res.render('pages/items', { items });
});

// Sample product data for product catalog
const products = [
    { id: 1, name: 'Laptop', price: 75000 },
    { id: 2, name: 'Smartphone', price: 50000 },
    { id: 3, name: 'Tablet', price: 35000 }
];

// Route to render the products page
app.get('/products', (req, res) => {
    res.render('pages/products', {
        title: 'Product Catalog',
        products: products
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
