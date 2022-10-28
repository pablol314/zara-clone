const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const passport = require("passport")
const users = require("../controllers/users")

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/signin")
    .get( users.renderLogin)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/signin", keepSessionInfo:true}), users.login)

router.get("/logout", users.logout)

module.exports = router;