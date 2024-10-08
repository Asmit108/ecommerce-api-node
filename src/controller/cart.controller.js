const cartService=require('../services/cart.service')

const findUserCart=async(req,res)=>{
    const user=req.user;
    try {
        const cart=await cartService.findUserCart(user._id);
        return res.status(200).send(cart)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const addCartItem=async(req,res)=>{
    const user=req.user;
    try {
        console.log(1);
        const cartItem=await cartService.addCartItem(user._id,req.body);
        console.log(2);
        console.log(cartItem);
        return res.status(200).send(cartItem)
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:error.message})
    }
}

module.exports={findUserCart,addCartItem}