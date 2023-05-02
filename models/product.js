const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 500 },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    section: [{ type: Schema.Types.ObjectId, ref: "Section", required: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
})

ProductSchema.virtual('url').get(function() {
    return `/inventory/product/${this.id}`
})

module.exports = mongoose.model("Product", ProductSchema);