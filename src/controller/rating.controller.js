const reviewService = require('../services/rating.service')

const createRating = async (req, res) => {
    const user = req.user
    try {
        const review = await ratingService.createRating(req.body, user)
        return res.status(200).send(review)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const getAllRatings = async (req, res) => {
    try {
        const reviews = await reviewService.getAllRating(req.params.id)
        return res.status(200).send(reviews)
    } catch (error) {
        return res.status.send(500).send({ error: error.message })
    }
}

module.exports = { createRating, getAllRatings }