const Category = require('../models/category');
const Product = require('../models/product')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
    res.render('category_form')
})

exports.category_create_post = [
    body('category', "Category must be at least 3 characters long.").trim().isLength({ min: 3 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = new Category({ name: req.body.category});
        if (!errors.isEmpty()) {
            res.render('category_form', {
                title: "Create New Category",
                category: category,
                errors: errors.array()
            })
        } else {
            const categoryExists = await Category.findOne({ name: req.body.category })
            if (categoryExists) {
                res.redirect(categoryExists.url)
            } else {
                await category.save()
                res.redirect(category.url)
            }
        }
    })
]

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, productsInCategory] = await Promise.all([
        Category.findById(req.params.id),
        Product.find({ category: req.params.id }),
    ])

    if (category === null) {
        res.redirect('/inventory/categories')
    }
    res.render('category_delete', {
        title: "Delete Category",
        category: category,
        category_products: productsInCategory
    })
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const [category, productsInCategory] = await Promise.all([
        Category.findById(req.params.id),
        Product.find({ category: req.params.id })
    ])
    if (productsInCategory.length > 0) {
        res.render('category_delete', {
            title: "Delete Category",
            category: category,
            category_products: productsInCategory
        })
        return
    } else {
        await Category.findByIdAndRemove(req.params.id)
        res.redirect('/inventory/categories')
    }
})

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec()
    if (category === null) {
        const err = new Error("Category not found.")
        err.status = 404;
        return next(err)
    }
    res.render('category_form', {
        title: "Update Category",
        category: category,
    })
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    body('category', "Category must be at least 3 characters long.").trim().isLength({ min: 3 }).escape(),

    asyncHandler(async (req, res, post) => {
        const errors = validationResult(req)

        const category = new Category({
            name: req.body.category,
            _id: req.params.id,
        })

        if (!errors.isEmpty()) {
            res.render("category_form", {
                title: "Update Category",
                category: category,
                errors: errors.array(),
            }) 
            return
        } else {
            const thecategory = await Category.findByIdAndUpdate(req.params.id, category, {})
            res.redirect(thecategory.url);
        }
    })
})