const Rating=require('../models/rating.model')
const productService=require('../services/product.service')

const createRating=async(reqData,user)=>{

    const product=await productService.findProductById(reqData.productId)
    const rating=new Rating({
       review:reqData.rating,
       product:product._id,
       user:user._id,
       createdAt:new Date()
    })
    await product.save();
    return await rating.save();
}

const getAllRating=async(productId)=>{
    const product=await productService.findProductById(productId)
    return await Rating.find({product:productId}).exec();
}

module.exports={createRating,getAllRating}
