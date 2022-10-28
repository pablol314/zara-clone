const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn} = require("../middleware");
const sellpage = require("../controllers/sellpage")
const multer = require("multer");
const { storage } = require("../cloudinary")
const upload = multer({ storage })




router.route("/")
        .get(catchAsync(sellpage.getSellpage))
        .post(isLoggedIn, upload.array("image"), catchAsync(sellpage.postAddProduct))

router.get("/addProduct", isLoggedIn, sellpage.addProduct);

router.route("/:id")
    .get(catchAsync(sellpage.getProduct))
    .put(isLoggedIn, catchAsync(sellpage.editProduct))
    .delete(isLoggedIn, catchAsync(sellpage.deleteProduct));

router.get("/:id/edit", isLoggedIn, catchAsync(sellpage.getProductEdit));

router.get("/logout", sellpage.logout)

module.exports = router;