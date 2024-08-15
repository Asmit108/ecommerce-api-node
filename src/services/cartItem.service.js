const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");
const userService = require("../services/user.service");
const { findUserCart } = require("./cart.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  console.log("cartItemId",cartItemId);
  console.log("cartItemData",cartItemData);
  try {
    const item = await CartItem.findById(cartItemId).populate('product')
    if (!item) {
      throw new Error("cart item not found:", cartItemId)
    }
    const user = await userService.findUserById(item.userId)
    if (!user) {
      throw new Error("user not found:", userId)
    }
    console.log("item",item);
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      console.log("updatedCartItem",updatedCartItem);
      return updatedCartItem;
    }
    else {
      throw new Error("you can't update this cart Item")
    }

  } catch (error) {
    console.log(error);
    throw new Error(error.message)
  }
}

const removeCartItem = async (userId, cartItemId) => {

  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart item not found:", cartItemId)
    }
    const user = await userService.findUserById(item.userId)
    if (!user) {
      throw new Error("user not found:", userId)
    }
    if (user._id.toString() === userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
    }
    else {
      throw new Error("you can't delete another user's cart Item")
    }

  } catch (error) {
    throw new Error(error.message)
  }
}

const findCartItemById = async (cartItemId) => {
  try {
    const item = await CartItem.findById(cartItemId)
    if (!item) {
      throw new Error("cart item not found:", cartItemId)
    }
    return item

  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById }
