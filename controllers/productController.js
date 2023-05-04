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
    body('categorySelect', "Category must be specified").trim().isLength({ min: 1 }).escape(),
    body('name', "Name must be at least 3 characters").trim().isLength({ min: 3 }).escape(),
    body('description', "Description must be at least 3 characters long").trim().isLength({ min: 3 }).escape(),
    body('price', "Price must be specified").trim().isLength({ min: 1 }).isInt().escape(),
    body('quantity', "Quantity must be specified").trim().isLength({ min: 1 }).isInt().escape(),
    body("sectionSelect.*").escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const product = new Product({
            name: req.body.name,
            section: req.body.sectionSelect,
            category: req.body.categorySelect,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
        })
        console.log(req.body.sectionSelect, req.body.categorySelect);
        if (!errors.isEmpty()) {
            const [allSections, allCategories] = await Promise.all([
                Section.find().exec(),
                Category.find().exec(),
            ])
            for (const section of allSections) {
                if (product.section.indexOf(section._id) > -1) {
                    section.checked = 'true'
                }
            }
            res.render('product_form', {
                title: "Add New Product",
                sections: allSections,
                categories: allCategories,
                selected_category: product.category._id,
                product: product,
                errors: errors.array(),
            })
            return
        } else {
            await product.save()
            res.redirect(product.url)
        }
    })
]

exports.product_delete_get = asyncHandler(async (req, res, next) => {
    const [product, allProductInstances] = await Promise.all([
        Product.findById(req.params.id).exec(),
        ProductInstance.find({ product: req.params.id }).populate('product').exec()
    ])

    if (product === null) {
        res.redirect('/inventory/products')
    }
    res.render('product_delete', {
        title: "Delete Product",
        product: product,
        product_instances: allProductInstances
    })
})

exports.product_delete_post = asyncHandler(async (req, res, next) => {
    const [product, allProductInstances] = await Promise.all([
        Product.findById(req.params.id).exec(),
        ProductInstance.find({ product: req.params.id }).populate('product').exec(),
    ])
    if (allProductInstances.length > 0) {
        res.render('product_delete', {
            title: "Delete Product",
            product: product,
            product_instances: allProductInstances,
        })
        return
    } else {
        await Product.findByIdAndRemove(req.params.id)
        res.redirect('/inventory/products')
    }
})

exports.product_update_get = asyncHandler(async (req, res, next) => {
    const [product, allSections, allCategories] = await Promise.all([
        Product.findById(req.params.id).populate("section").populate('category').exec(),
        Section.find().exec(),
        Category.find().exec(),
    ])

    if (product === null) {
        const err = new Error("Product not found.")
        err.status = 404;
        return next(err)
    }
    for (const section of allSections) {
        for (const product_s of product.section) {
            if (section._id.toString() === product_s._id.toString()) {
                section.checked = 'true'
            }
        }
    }
    res.render('product_form', {
        title: "Update Product",
        sections: allSections,
        categories: allCategories,
        product: product,
    })
})

exports.product_update_post = asyncHandler(async (req, res, next) => {
    (req, res, next) => {
        if (!(req.body.section instanceof Array)) {
            if (typeof req.body.section === 'undefined') {
                req.body.section = []
            } else {
                req.body.section = new Array(req.body.section)
            }
        }
        next()
    },

    body('categorySelect', "Category must be specified").trim().isLength({ min: 1 }).escape(),
    body('name', "Name must be at least 3 characters").trim().isLength({ min: 3 }).escape(),
    body('description', "Description must be at least 3 characters long").trim().isLength({ min: 3 }).escape(),
    body('price', "Price must be specified").trim().isLength({ min: 1 }).isInt().escape(),
    body('quantity', "Quantity must be specified").trim().isLength({ min: 1 }).isInt().escape(),
    body("sectionSelect.*").escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const product = new Product({
            name: req.body.name,
            section: req.body.sectionSelect === 'undefined' ? [] : req.body.section,
            category: req.body.categorySelect,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            _id: req.params.id,
        })

        if (!errors.isEmpty()) {
            console.log('here');
            const [allSections, allCategories] = await Promise.all([
                Section.find().exec(),
                Category.find().exec(),
            ])
            for (const section of allSections) {
                if (product.section.indexOf(section._id) > -1) {
                    section.checked = 'true'
                }
            }
            res.render('product_form', {
                title: "Update Product",
                sections: allSections,
                categories: allCategories,
                product: product,
                errors: errors.array(),
            })
            return
        } else {
            const theproduct = await Product.findByIdAndUpdate(req.params.id, product, {})
            res.redirect(theproduct.url);
        }
    })
})