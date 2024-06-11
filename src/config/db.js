const mongoose=require('mongoose')
const mongodburl="mongodb+srv://asmitmbi108:ramanujam@cluster0.ofyttj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mongodburl)
}

module.exports={connectDb}