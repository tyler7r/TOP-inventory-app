const Product = require('../models/product');
const ProductInstance = require('../models/productinstance');
const Section = require('../models/section');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
    const [allSections, allCategories] = await Promise.all([
        Section.find().exec(),
        Category.find().exec(),
    ])
    res.render('product_form', {
        title: "Add New Product",
        categories: allCategories,
        sections: allSections,
    });
})

exports.product_create_post = [
    (req, res, next) => {
        if (!(req.body.sectionSelect instanceof Array)) {
            if (typeof req.body.sectionSelect === 'undefined') req.body.sectionSelect = []
            else req.body.sectionSelect = new Array(req.body.sectionSelect);
        }
        next()
    },

    // body('sectionSelect', "Section must be specified").trim().isLength({ min: 1 }).escape(),
    body("sectionSelect.*").escape(),
    body('categorySelect', "Category must be specified").trim().isLength({ min: 1 }).escape(),
    body('name', "Name must be at least 3 characters").trim().isLength({ min: 3 }).escape(),
    body('description', "Description must be at least 3 characters long").trim().isLength({ min: 3 }).escape(),
    body('price', "Price must be specified").trim().isLength({ min: 1 }).isNumeric().escape(),
    body('quantity', "Quantity must be specified").trim().isLength({ min: 1 }).isNumeric().escape(),

    asyncHandler(async (req, res, next) => {
        const [allSections, allCategories] = await Promise.all([
            Section.find().exec(),
            Category.find().exec(),
        ])
        const errors = validationResult(req)
        const product = new Product({
            name: req.body.name,
            section: req.body.sectionSelect,
            category: req.body.categorySelect,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
        })
        if (!errors.isEmpty()) {
            for (const section of allSections) {
                if (product.section.indexOf(section._id) > -1) {
                    section.checked = 'true'
                }
            }
            res.render('product_form', {
                title: "Add New Product",
                sections: allSections,
                categories: allCategories,
                // selected_category: product.category._id,
                product: product,
                errors: errors.array(),
            })
        } else {
            await product.save()
            res.redirect(product.url)
        }
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