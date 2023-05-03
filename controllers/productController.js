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

})

exports.product_detail = asyncHandler(async (req, res, next) => {

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