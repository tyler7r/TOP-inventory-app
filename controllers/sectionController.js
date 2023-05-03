const Section = require('../models/section');
const Product = require('../models/product')
const asyncHandler = require('express-async-handler');

exports.section_list = asyncHandler(async (req, res, next) => {
    const sections = await Section.find().exec();

    res.render('section_list', {
        title: "Browse Sections",
        section_list: sections,
    })
})

exports.section_detail = asyncHandler(async (req, res, next) => {
    const [section, productsInSection] = await Promise.all([
        Section.findById(req.params.id).exec(),
        Product.find({ section: req.params.id }, "name description").exec() 
    ])

    if (section === null) {
        const err = new Error("Section not found")
        err.status = 404
        return next(err)
    }

    res.render('section_detail', {
        title: `${section.name}'s Section`,
        section: section.name,
        section_products: productsInSection,
    })
})

exports.section_create_get = asyncHandler(async (req, res, next) => {

})

exports.section_create_post = [

    asyncHandler(async (req, res, next) => {

    })
]

exports.section_delete_get = asyncHandler(async (req, res, next) => {

})

exports.section_delete_post = asyncHandler(async (req, res, next) => {

})

exports.section_update_get = asyncHandler(async (req, res, next) => {

})

exports.section_update_post = asyncHandler(async (req, res, next) => {
    asyncHandler(async (req, res, next) => {
        
    })
})