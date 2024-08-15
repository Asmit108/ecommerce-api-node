const Address = require("../models/address.model");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const cartService = require("./cart.service");
const orderItems = require("../models/orderitems.model");

const createOrder = async (user, shippAddress) => {
    try {
        console.log("or");
        shippAddress.user=user._id
        console.log("ord");
        const existAddress = await Address.findOne(shippAddress);
        console.log("order");
        let address;
        if (existAddress) {
            // console.log(1);
            address = existAddress
        }
        else {
            console.log(2);
            address = new Address(shippAddress)
            console.log(shippAddress)
            console.log(3);
            address.user = user._id
            console.log(4);
            await address.save();
            console.log(1);
            user.address.push(address._id);
            await user.save();
        }
        console.log(address)
        const cart = await Cart.findOne({ users: user._id }).populate('cartItems')
        const order_Items = []
        for (const item of cart.cartItems) {
            const orderItem = new orderItems({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedPrice: item.discountedPrice
            })
            const createdOrderItem = await orderItem.save();
            order_Items.push(createdOrderItem)
        }
        const createdOrder = new Order({
            user,
            orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountedPrice,
            discount: cart.discount,
            totalItem: cart.totalItem,
            shippingAddress: address,
            orderItems: order_Items
        })
        const savedOrder = await createdOrder.save();
        console.log(savedOrder)
        return savedOrder;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

const placeOrder = async (orderId) => {
    try {
        const order = await findOrderById(orderId)
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        order.orderStatus = "PLACED";
        order.paymentDetails.paymentStatus = "COMPLETED"

        return await order.save();

    } catch (error) {
        throw new Error(error.message)
    }
}

const confirmOrder = async (orderId) => {
    try {
        const order = await findOrderById(orderId)
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        order.orderStatus = "CONFIRMED";
        return await order.save();

    } catch (error) {
        throw new Error(error.message)
    }
}

const shipOrder = async (orderId) => {
    try {
        const order = await findOrderById(orderId)
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        order.orderStatus = "SHIPPED";
        return await order.save();

    } catch (error) {
        throw new Error(error.message)
    }
}

const deliverOrder = async (orderId) => {
    try {
        const order = await findOrderById(orderId)
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        order.orderStatus = "DELIVERED";
        return await order.save();

    } catch (error) {
        throw new Error(error.message)
    }
}

const cancelOrder = async (orderId) => {
    try {
        const order = await findOrderById(orderId)
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        order.orderStatus = "CANCELLED";
        return await order.save();

    } catch (error) {
        throw new Error(error.message)
    }
}

const findOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId)
            .populate("user")
            .populate({ path: "orderItems", populate: { path: "product" } })
            .populate("shippingAddress")
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        return order

    } catch (error) {
        throw new Error(error.message)
    }
}

const usersOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId})
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();

        return orders

    } catch (error) {
        throw new Error(error.message) 
    }
}

const getAllOrders = async () => {
    try {
        return await Order.find()
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();

    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteOrder = async (orderId) => {
    try {
        const order = await findOrderById(orderId)
        if (!order) {
            throw new Error("order not found:", orderId)
        }
        Order.findByIdAndDelete(order._id)
        return null;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createOrder,
    placeOrder,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
};



