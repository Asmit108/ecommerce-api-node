const paymentService = require('../services/payment.service')

const createPaymentLink = async (req, res) => {
    const user=req.user
    try {
        console.log(req.params.id);
        const paymentLink = await paymentService.createPaymentLink(req.params.id,user)
        console.log(paymentLink)
        return res.status(200).send(paymentLink)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

const updatePaymentInformation = async (req, res) => {
    try {
        await paymentService.updatePaymentInformation(req.query)
        return res.status(200).send({message:"payment information updated",success:true})
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports={createPaymentLink,updatePaymentInformation}