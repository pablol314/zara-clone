const Product = require("../models/product");

module.exports.getSellpage = async(req, res) => {
    const products = await Product.find({});
    res.render("sellpage", {products});
};

module.exports.addProduct =  (req, res) => {
    res.render("products/new") ;
};

module.exports.postAddProduct = async (req, res, next) => {
    const product = new Product(req.body.product);
    product.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    await product.save();
    req.flash("success", "¡Hecho! Agregaste un nuevo producto.");
    res.redirect(`/sellpage/${product._id}`)
};


module.exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        req.flash("error", "No pudimos obtener ese producto.");
        return res.redirect("/sellpage");
    }
    res.render("products/showpage", {product});
};

module.exports.getProductEdit = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        req.flash("error", "No pudimos obtener ese producto.");
        return res.redirect("/sellpage");
    }
    res.render("products/edit", {product});
}

module.exports.editProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product});
    req.flash("success", "¡Hecho! Modificaste un producto.");
    res.redirect(`/sellpage/${product._id}`)
}

module.exports.deleteProduct = async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash("success", "¡Hecho! Eliminaste el producto.");
    res.redirect("/sellpage");
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Adios!")
    res.redirect("/")
}