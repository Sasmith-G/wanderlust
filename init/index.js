const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ATLAS_DB_URL = "mongodb+srv://sasank-v:H2Ea3GkUhsZM8IUj@cluster0.wjmst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(ATLAS_DB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner : '66d311757d19d2fc7a83090a'}))
    await Listing.insertMany(initData.data);
    console.log("Data is Inititalised");
}

const fixOwner = async () => {
    const allListings = await Listing.find({});
    for( let list of allListings){
        list.owner = "66db3c1ba2bc066d32b1e468"
    }
    const toBeSaved = allListings.map((list)=>list.save());
    await Promise.all(toBeSaved);
    console.log("Owner Updated");
} 