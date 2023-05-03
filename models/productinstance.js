const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true },
})

ProductInstanceSchema.virtual('url').get(function() {
    return `/inventory/productinstance/${this.id}`
})

module.exports = mongoose.model('ProductInstance', ProductInstanceSchema);