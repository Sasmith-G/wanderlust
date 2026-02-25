const User = require("../models/user.js");
module.exports.renderSignUp = (req, res) => {
    res.render("users/signup.ejs");
};
module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const regUser = await User.register(newUser, password);
      req.login(regUser,(err)=>{
        if(err) {return next(err)}
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/listings");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.afterLogin = async (req, res) => {
    req.flash("success","Welcome back to WanderLust!")
    let redirectURL = res.locals.redirectUrl || "/listings";
    res.redirect(redirectURL);
}

module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","You are logged out now");
      res.redirect("/listings");
    })
  }