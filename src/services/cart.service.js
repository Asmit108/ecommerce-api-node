const Cart = require('../models/cart.model')
const cartItem = require('../models/cartItem.model')
const Product = require('../models/product.model')

const createCart = async (user) => {
    try {
        const cart = new Cart({ users: user })
        const createdCart = await cart.save();
        return createdCart;

    } catch (error) {
        throw new Error(error.message)
    }
}

const findUserCart = async (userId) => {
    try {
        let cart = await Cart.findOne({ users: userId });
        let cartItems = await cartItem.findOne({ cart: cart._id }).populate('product')
        cart.cartItems = cartItems;
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;
        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.totalDiscountedPrice;
            totalItem += cartItem.quantity;
        }
        cart.totalPrice = totalPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice - totalDiscountedPrice;

        return cart;

    } catch (error) {
        throw new Error(error.message)
    }
}

const addCartItem = async (userId, req) => {
  try{
    let cart = await Cart.findOne({ users: userId });
    const product = await Product.findById(req.productId);

    const isPresent = cartItem.find({ cart: cart._id, product: product._id, userId: userId });

    if (!isPresent) {
        const item = new cartItem({ 
            cart: cart._id,
            product: product._id, 
            userId: userId, 
            quantity: 1,
            price:product.price,
            size:req.size,
            discountedPrice:product.discountedPrice
        });
        const createdCartItem=await cartItem.save();
        cart.cartItems.push(createdCartItem);
        await cart.save();
        return "Item added to cart"
    }
  }catch(error){
    throw new Error(error.message)
  }
}

module.exports = { findUserCart, createCart, addCartItem }