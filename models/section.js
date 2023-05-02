const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SectionSchema = new Schema({
    name: { type: String, maxLength: 100 }
})

SectionSchema.virtual('url').get(function() {
    return `/inventory/section/${this.id}`
})

module.exports = mongoose.model('Section', SectionSchema);