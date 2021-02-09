//Check
/** Imports and definitions */
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const projectDatabase = require('./config/database');

//Route imports
const ordersRoutes = require('./routes/orders_routes');
const productsRoutes = require('./routes/products_routes');
const usersRoutes = require('./routes/users_routes');

server.use(bodyParser.json());

//I use the specific routes for each request made to the following endpoints
server.use('/orders', ordersRoutes);
server.use('/products', productsRoutes);
server.use('/users', usersRoutes);

/** Server */
projectDatabase.sequelize.authenticate()
.then(() => {
    server.listen(3000, () => {
        console.log('Server initialized on port 3000');
    });
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });