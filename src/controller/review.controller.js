const reviewService=require('../services/review.service')

const createReview=async(req,res)=>{
    const user=req.user
    try {
        const review=await reviewService.createReview(req.body,user)
        return res.status(200).send(review)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReview(req.params.id)
        return res.status(200).send(reviews)
    } catch (error) {
        return res.status.send(500).send({ error: error.message })
    }
}

module.exports={createReview,getAllReviews}