
const mongoose = require("mongoose")

const URI = process.env.MONGO_URI

const connectDb = async() =>{
    try {
       await mongoose.connect(URI)
       console.log('DB connected');
       
    } catch (error) {
        console.log('Database connection failed');
        
    }
}

module.exports = connectDb