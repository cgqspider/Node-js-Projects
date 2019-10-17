/*NOTE:
if you are using Windows machine, the issue may be due to un-valid character in the resulting filename.
for me, it worked after i replaced the colon ":" with "-" as the colon is not a valid character for file names in windows
here -> new Date creates something like this 2018-11-01T15:55:08 so the colon in between the numbers
*/


const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Reject a File
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
})
const router = express.Router();

//Routing to GET all the products
router.get('/', (req, res, next) => {
    Product.find()
        .select("name price _id productImage")
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                Products: doc.map(newres => {
                    return {
                        name: newres.name,
                        price: newres.price,
                        _id: newres._id,
                        productImage:newres.productImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + newres._id
                        }
                    }
                })
            };

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

});

//Routing to CREATE the product
router.post('/', upload.single('productImage'), (req, res, next) => {
   
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: 'uploads/'+req.file.originalname
    });

    product.save().then(result => {
        res.status(200).json({
            message: "Products Successfully Created",
            product: product
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });


});

//Routing to GET the specific product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404)
                    .json({ message: "This Document doesn't Exists" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });


});

//Routing to UPDATE the Product
router.patch('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })

        .catch(err => {
            console.log(error);
            res.status(500).json({
                error: err
            });
        });
})

//Routing to DELETE the product
router.delete('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

//EXPORTING THE MODULE
module.exports = router;