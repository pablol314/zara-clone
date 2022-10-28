const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: {virtuals:true}}

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/c_lpad,h_1125,w_750")
})


const ProductSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    price_discount: Number,
    image: String,
    description: String
}, opts);

module.exports = mongoose.model("Product", ProductSchema);