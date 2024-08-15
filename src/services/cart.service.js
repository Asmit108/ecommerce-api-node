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
        // Find the cart for the user
        console.log(1);
        let cart = await Cart.findOne({ users: userId }).exec();
        if (!cart) {
            throw new Error('Cart not found');
        }

        // Populate cartItems field in the cart object
        cart = await cart.populate({
            path: 'cartItems',
            populate: {
                path: 'product'
            }
        })

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        if (cart.cartItems && cart.cartItems.length > 0) {
            for (let cartItem of cart.cartItems) {
                totalPrice += cartItem.price;
                totalDiscountedPrice += cartItem.discountedPrice
                totalItem += cartItem.quantity;
            }
        }
        console.log(cart.totalPrice," ",totalPrice);
        console.log(cart.totalDiscountedPrice," ",totalDiscountedPrice);
        console.log(cart.totalItem," ",totalItem);
        const isCartUpdated = (
            cart.totalPrice !== totalPrice ||
            cart.totalDiscountedPrice !== totalDiscountedPrice ||
            cart.totalItem !== totalItem ||
            cart.discount !== (totalPrice - totalDiscountedPrice)
        );
        
        // Only update and save the cart if there are changes
        if (isCartUpdated) {
            console.log("updated_cart");
            cart.totalPrice = totalPrice;
            cart.totalDiscountedPrice = totalDiscountedPrice;
            cart.totalItem = totalItem;
            cart.discount = totalPrice - totalDiscountedPrice;

            await cart.save();
        }

        return cart;

    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}


const addCartItem = async (userId, req) => {
    try {
        let cart = await Cart.findOne({ users: userId }).populate("cartItems");
        const product = await Product.findById(req.productId);

        const isPresent = await cartItem.find({ cart: cart._id, product: product._id, userId: userId, size: req.size }).exec();

        if (isPresent == null || isPresent.length == 0) {
            console.log(100);
            const cart_Items = new cartItem({
                cart: cart._id,
                product: product._id,
                userId: userId,
                quantity: 1,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice
            });
            const createdCartItem = await cart_Items.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return cart.cartItems;
        }

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

module.exports = { findUserCart, createCart, addCartItem }