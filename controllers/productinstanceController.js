const ProductInstance = require('../models/productinstance');
const asyncHandler = require('express-async-handler');

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

})

exports.productinstance_create_post = [

    asyncHandler(async (req, res, next) => {

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