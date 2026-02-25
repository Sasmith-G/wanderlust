const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = async (req,res,next)=>{
    if(!req.isAuthenticated()){
        //Redirect URL save
        req.session.redirectURL = req.originalUrl;
        req.flash("error","You must be logged in to create Listing!!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectURL){
        res.locals.redirectUrl = req.session.redirectURL;
    }
    next();
}

module.exports.isOwner = async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to Edit !!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>(el.message)).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>(el.message)).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next) =>{
    let {revId,id} = req.params;
    let review = await Review.findById(revId);
    console.log()
    if(res.locals.currUser && !review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}