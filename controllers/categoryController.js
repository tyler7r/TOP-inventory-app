const Category = require('../models/category');
const Product = require('../models/product')
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec()

    res.render('category_list', {
        title: "Browse Categories",
        category_list: categories,
    })
})

exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, productsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Product.find({ category: req.params.id }, "name description").exec()
    ])

    if (category === null) {
        const err = new Error('Category not found')
        err.status = 404;
        return next(err);
    }

    res.render('category_detail', {
        title: `Browse ${category.name}`,
        category: category,
        category_products: productsInCategory,
    })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {

})

exports.category_create_post = [

    asyncHandler(async (req, res, next) => {

    })
]

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {

})

exports.category_update_get = asyncHandler(async (req, res, next) => {

})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    
    asyncHandler(async (req, res, post) => {

    })
})