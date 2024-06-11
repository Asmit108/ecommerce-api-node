const Review=require('../models/review.model')
const productService=require('../services/product.service')

const createReview=async(reqData,user)=>{

    const product=await productService.findProductById(reqData.productId)
    const review=new Review({
       review:reqData.review,
       product:product._id,
       user:user._id,
       createdAt:new Date()
    })
    await product.save();
    return await review.save();
}

const getAllReview=async(productId)=>{
    const product=await productService.findProductById(productId)
    return await Review.find({product:productId}).populate("user").exec();
}

module.exports={createReview,getAllReview}
