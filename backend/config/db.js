const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected");
        
    } catch (err) {
        console.error("Error connecting Mongodb",err);
        process.exit(1);
    }
};

module.exports = connectDB;


