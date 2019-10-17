const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth')

const orderController = require('../controllers/orders');

//Routing to get all the details of the orders
router.get("/",checkAuth,orderController.orders_get_all);


/*router.get('/',checkAuth, (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .exec()
        .then(result => {

            res.status(200).json({
                count: result.length,
                orders: result.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }

                    }
                })

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});*/

//Routing to create a particular order
router.post('/', checkAuth ,(req, res, next) => {
   

    Product.findById(req.body.productId)
        .then(product => {

            if(product==null)
            {
                return res.status(404).json({
                    message:"Product Not Found"
                })
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            order
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                })

        }).catch(err => {
            console.log(err);
            res.status(500).json()({
                error:err
            })
        })
       



});

//Routing to get specific order details
router.get('/:orderId', checkAuth ,(req, res, next) => {
    
    Order.findById(req.params.orderId)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//Routing to delete the order
router.delete('/:orderId', checkAuth ,(req, res, next) => {
Order.remove({_id:req.params.orderId}).exec()
.then(result => {
    console.log(result);
    res.status(200).json(result);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})

  
});

//EXPORTING THE MODULE
module.exports = router;