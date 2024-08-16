const mongoose = require('mongoose')
const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const mongodburl = `mongodb+srv://asmitmbi108:${password}@cluster0.ofyttj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDb = () => {
    return mongoose.connect(mongodburl)
}

module.exports = { connectDb }