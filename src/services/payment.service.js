const razorpay=require('../config/razorpayClient');
const orderService=require('../services/order.service')

const createPaymentLink=async(orderId,user)=>{
    try {
        const order=await orderService.findOrderById(orderId)
        const paymentLinkRequest={
            amount:order.totalDiscountedPrice*100,
            currency:"INR",
            customer:{
                name:user.firstName+" "+user.lastName,
                contact:user.mobile,
                email:user.email
            },
            notify:{
                sms:true,
                email:true,
            },
            reminder_enable:true,
            callback_url:"http://localhost:3000/payment/${orderId}",
            callback_method:"get"
        };
        console.log("p");
        const paymentLink=await razorpay.paymentLink.create(paymentLinkRequest)
        
        const paymentLinkId=paymentLink.id;
        const payment_link_url=paymentLink.short_url
        const resData={
            paymentLinkId,
            payment_link_url 
        }
        console.log("resDta",resData)
        order.orderStatus="PLACED"
        order.save();
        return resData

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

const updatePaymentInformation=async(reqData)=>{
         const paymentId=reqData.payment_id 
         const orderId=reqData.order_id

         try {
            const order=orderService.findOrderById(orderId)
            const payment=razorpay.payments.fetch(paymentId)
            if(payment.status=='captures'){
                order.paymentDetails.paymentId=paymentId
                order.paymentDetails.status="COMPLETED"
                order.orderStatus="PLACED"

                await order.save();
            }

            const resData={message:"Your order has been placed",success:true}
            return resData
         } catch (error) {
            throw new Error(error.message)
         }
}

module.exports={createPaymentLink,updatePaymentInformation}