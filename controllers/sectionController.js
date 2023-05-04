const Section = require('../models/section');
const Product = require('../models/product')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
        section: section,
        section_products: productsInSection,
    })
})

exports.section_create_get = asyncHandler(async (req, res, next) => {
    res.render("section_form")
})

exports.section_create_post = [
    body("section", "Section must contain at least 2 characters").trim().isLength({ min: 2 }).escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const section = new Section({ name: req.body.section });
        if (!errors.isEmpty()) {
            res.render("section_form", {
                title: "Create New Section",
                section: section,
                errors: errors.array()
            });
            return
        } else {
            const sectionExists = await Section.findOne({ name:req.body.section });
            if (sectionExists) {
                res.redirect(sectionExists.url)
            } else {
                await section.save()
                res.redirect(section.url)
            }
        }
    })
]

exports.section_delete_get = asyncHandler(async (req, res, next) => {
    const [section, productsInSection] = await Promise.all([
        Section.findById(req.params.id),
        Product.find({ section: req.params.id })
    ])
    if (section === null) {
        res.redirect('/inventory/sections')
    }
    res.render('section_delete', {
        title: "Delete Section",
        section: section,
        section_products: productsInSection
    })
})

exports.section_delete_post = asyncHandler(async (req, res, next) => {
    const [section, productsInSection] = await Promise.all([
        Section.findById(req.params.id),
        Product.find({ section: req.params.id })
    ])
    if (productsInSection.length > 0) {
        res.render('section_delete', {
            title: "Delete Section",
            section: section,
            section_products: productsInSection
        })
    } else {
        await Section.findByIdAndRemove(req.params.id)
        res.redirect('/inventory/sections')
    }
})

exports.section_update_get = asyncHandler(async (req, res, next) => {

})

exports.section_update_post = asyncHandler(async (req, res, next) => {
    asyncHandler(async (req, res, next) => {
        
    })
})