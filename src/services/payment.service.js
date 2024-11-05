const razorpay = require('../config/razorpayClient');
const orderService = require('../services/order.service')

const createPaymentLink = async (orderId, user) => {
    try {
        const order = await orderService.findOrderById(orderId)
        const paymentLinkRequest = {
            amount: order.totalDiscountedPrice * 100,
            currency: "INR",
            customer: {
                name: user.firstName + " " + user.lastName,
                contact: user.mobile,
                email: user.email
            },
            notify: {
                sms: true,
                email: true,
            },
            reminder_enable: true,
            callback_url: `http://localhost:4000/api/payments/callback`,
            callback_method: "get",
        };
        console.log("p");
        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest)
        console.log(paymentLink)
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url
        const resData = {
            paymentLinkId,
            payment_link_url
        }
        console.log("resDta", resData)
        order.orderStatus = "PLACED"
        order.save();
        return resData

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

const updatePaymentInformation = async (reqData) => {
    console.log(reqData)
    const paymentId = reqData.paymentId
    const orderId = reqData.orderId

    try {
        const order = await orderService.findOrderById(orderId)
        console.log("updateorderid", orderId)
        console.log("updatepaymentId", paymentId)
        const payment = await razorpay.payments.fetch(paymentId);
        console.log("updatepayment", payment)
        if (payment.status == 'captured') {
            order.paymentDetails.paymentId = paymentId
            order.paymentDetails.paymentStatus = "COMPLETED"
            order.orderStatus = "PLACED"
            order.paymentDetails.paymentMethod = payment.payment_mode

            await order.save();
        }

        const resData = { message: "Your order has been placed", success: true }
        return resData
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = { createPaymentLink, updatePaymentInformation }