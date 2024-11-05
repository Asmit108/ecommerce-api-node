const paymentService = require('../services/payment.service')

const createPaymentLink = async (req, res) => {
    const user=req.user
    try {
        console.log("create",req.params.id);
        const paymentLink = await paymentService.createPaymentLink(req.params.id,user)
        console.log("create",paymentLink)
        return res.status(200).send(paymentLink)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}

const updatePaymentInformation = async (req, res) => {
    try {
        console.log("req",req)
        await paymentService.updatePaymentInformation(req.query)
        return res.status(200).send({message:"payment information updated",success:true})
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}

const redirectToSuccessPage=async(req,res)=>{
    try {
        const { paymentId} = req.query;
        
        console.log(`Payment ID: ${paymentId}`);
        res.redirect(`http://localhost:3000/payments/success?paymentId=${paymentId}`);
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports={createPaymentLink,updatePaymentInformation,redirectToSuccessPage}