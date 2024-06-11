const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");
const userService = require("../services/user.service");
const { findUserCart } = require("./cart.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {

  try {
    const item = await CartItem.findById(cartItemId)
    if (!item) {
      throw new Error("cart item not found:", cartItemId)
    }
    const user = await userService.findUserById(item.userId)
    if (!user) {
      throw new Error("user not found:", userId)
    }
    if (user._id.toString() === userId.tostring()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    }
    else {
      throw new Error("you can't update this cart Item")
    }

  } catch (error) {
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
    if (user._id.toString() === userId.tostring()) {
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
