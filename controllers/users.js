const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("users/register")
}

module.exports.register = async(req, res, next) => {
    try {
        const {username, password} = req.body;
        if (username=="tiff" || username=="admin") {
            const user = new User({username});
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if(err) return next(err);
                req.flash("success", "Bienvenida");
                res.redirect("/sellpage")
            })
        } else {
            return next();
        }
    }catch(e){
        req.flash("error", e.message);
        res.redirect("register")
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/signin")
}

module.exports.login = (req, res) => {
    req.flash("success", "Hola! Cómo has estado?");
    const redirectUrl = req.session.returnTo || "/sellpage";
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if(err) return next(err);
        req.flash("success", "Bye!");
        res.redirect("/sellpage")
    })
}