const ProductInstance = require('../models/productinstance');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.productinstance_list = asyncHandler(async (req, res, next) => {
    const instances = await ProductInstance.find().populate('product').exec()

    res.render('instance_list', {
        title: "Browse Available Products",
        instance_list: instances,
    })
})

exports.productinstance_detail = asyncHandler(async (req, res, next) => {
    const instance = await ProductInstance.findById(req.params.id).populate('product').exec()

    if (instance === null) {
        const err = new Error('Instance not found')
        err.status = 404;
        return next(err)
    }

    res.render('instance_detail', {
        title: `Available Product`,
        instance: instance
    })
})

exports.productinstance_create_get = asyncHandler(async (req, res, next) => {
    const allProducts = await Product.find({}, "name").exec();
    
    res.render('instance_form', {
        title: "Add New Product Stock",
        product_list: allProducts,
    });
})

exports.productinstance_create_post = [
    body('product', "Product must be specified").trim().isLength({ min: 1 }).escape(),
    body('size', "Size must be implemented").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const allProducts = await Product.find({}, "name").exec()
        const errors = validationResult(req)

        const productInstance = new ProductInstance({
            product: req.body.product,
            size: req.body.size,
        })
        if (!errors.isEmpty()) {
            res.render('instance_form', {
                title: "Add New Product Stock",
                errors: errors.array(),
                selected_product: productInstance.product._id,
                instance: productInstance,
                product_list: allProducts,
            })
            return
        } else {
            await productInstance.save()
            res.redirect(productInstance.url)
        }
    })
]

exports.productinstance_delete_get = asyncHandler(async (req, res, next) => {

})

exports.productinstance_delete_post = asyncHandler(async (req, res, next) => {

})

exports.productinstance_update_get = asyncHandler(async (req, res, next) => {

})

exports.productinstance_update_post = asyncHandler(async (req, res, next) => {

    asyncHandler(async (req, res, next) => {
        
    })
})