const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { saveRedirectUrl } = require("../middleware.js");

const {renderSignUp, signUp, renderLogin, afterLogin, logout} = require("../controllers/user.js");

router.get("/signup", renderSignUp);

router.post(
  "/signup",
  wrapAsync(signUp)
);

router.get("/login", renderLogin);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(afterLogin)
);

router.get("/logout",logout);

module.exports = router;
