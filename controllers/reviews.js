const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("New Review Saved");
    req.flash("success","New Review Added!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req,res,next)=>{
    let {id,revId} = req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : revId}});
    await Review.findByIdAndDelete(revId);

    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);

}