const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/users_middlewares');
const productControllers = require('../controllers/products_controllers');
const productMiddlewares = require('../middlewares/products_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

//public access
router.get('/', productControllers.getProductsData);

//private access
router.post('/',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.newProduct
);

//private access
router.put('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    productMiddlewares.validateProductId,
    generalMiddlewares.checkBody,
    productMiddlewares.requireProductData,
    productControllers.modifyProduct
);

//private access
router.delete('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    productMiddlewares.validateProductId,
    productControllers.deleteProduct
);

module.exports = router;