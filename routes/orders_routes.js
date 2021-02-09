//
const express = require('express');
const router = express.Router();
const userMiddlewares = require('../middlewares/users_middlewares');
const orderControllers = require('../controllers/orders_controllers');
const orderMiddlewares = require('../middlewares/orders_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

//public access
router.post('/',
    generalMiddlewares.validateToken,
    generalMiddlewares.checkBody,
    orderMiddlewares.requireOrderData,
    orderMiddlewares.isProductAvailable,
    orderControllers.newOrder
);

//public access and private
router.get('/',
    generalMiddlewares.validateToken,
    orderControllers.getOrdersData
);

//private access
router.put('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    orderMiddlewares.validateOrderId,
    generalMiddlewares.checkBody,
    orderMiddlewares.requireOrderStatus,
    orderControllers.modifyOrderStatus
);

//private access
router.delete('/:id',
    generalMiddlewares.validateToken,
    generalMiddlewares.isAdminUser,
    orderMiddlewares.validateOrderId,
    orderControllers.deleteOrder
);

module.exports = router;