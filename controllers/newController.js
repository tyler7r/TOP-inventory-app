const asyncHandler = require('express-async-handler');

exports.new = asyncHandler(async (req, res, next) => {
    res.render('new', {
        title: "Add to Inventory",
    })
})