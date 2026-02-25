const express = require("express");
const router = express.Router({mergeParams:true});

//Express
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

//Database


const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");

const {createReview, destroyReview}  = require("../controllers/reviews.js");

//Post Review Route
router.post("/",validateReview,isLoggedIn,wrapAsync(createReview));
//Delete Review Route
router.delete("/:revId",isLoggedIn,isReviewAuthor,wrapAsync(destroyReview));

module.exports = router;
