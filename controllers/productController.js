const Product = require('../models/product');
const ProductInstance = require('../models/productinstance');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    const [allProducts, allInstances] = await Promise.all([
        Product.countDocuments({}).exec(),
        ProductInstance.countDocuments({}).exec(),
    ])

    res.render('index', {
        title: "Inventory Home",
        product_count: allProducts, 
        instance_count: allInstances,
    })
})

exports.product_list = asyncHandler(async (req, res, next) => {
    const products = await Product.find({}, "name description price quantity").populate('category').populate('section').exec();

    res.render('product_list', {
        title: "Browse Products",
        product_list: products
    })
})

exports.product_detail = asyncHandler(async (req, res, next) => {
    const [product, productInstances] = await Promise.all([
        Product.findById(req.params.id).populate('section').populate('category').exec(),
        ProductInstance.find({ product: req.params.id }).exec()
    ])

    if (product === null) {
        const err = new Error('No product found')
        err.status = 404;
        return next(err)
    }

    res.render('product_detail', {
        title: product.name,
        product: product,
        product_instances: productInstances,
    })
})  

exports.product_create_get = asyncHandler(async (req, res, next) => {

})

exports.product_create_post = [

    asyncHandler(async (req, res, next) => {

    })
]

exports.product_delete_get = asyncHandler(async (req, res, next) => {

})

exports.product_delete_post = asyncHandler(async (req, res, next) => {

})

exports.product_update_get = asyncHandler(async (req, res, next) => {

})

exports.product_update_post = asyncHandler(async (req, res, next) => {

    asyncHandler(async (req, res, next) => {

    })
})