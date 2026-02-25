const express = require("express");
const router = express.Router();

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const {index,renderNewForm,showListing, createListing, renderEditForm, editListing, deleteListing} = require("../controllers/listings.js");

//All Listings Route
router
    .route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn,upload.single('listing[image]'),wrapAsync(createListing));
//New Route
router.get("/new", isLoggedIn,renderNewForm);

//Show Route
router
    .route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(editListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));


module.exports = router;