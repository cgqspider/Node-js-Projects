const Order = require('../models/order');

exports.orders_get_all= (req, res, next) => {
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
    }