const Address = require("../models/address.model");
const Order = require("../models/order.model");
const cartService = require("./cart.service");

const createOrder = async (user, shippAddress) => {
    try {
        let address;
        if (shippAddress._id) {
            let existAddress = await Address.findById(shippAddress._id)
            address = existAddress
        }
        else {
            address = new Address(shippAddress)
            address.user = user
            await address.save();
            user.addresses.push(address);
            await user.save();
        }
        const cart = await cartService.findUserCart(user._id);
        const orderItems = []
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
            orderItems.push(createdOrderItem)
        }
        const createdOrder = new Order({
            user,
            orderItems,
            totalPrice: cart.totalPrice,
            totaldiscountedPrice: cart.totalDiscountedPrice,
            discount: cart.discount,
            totalItem: cart.totalItem,
            shippingAddress: address
        })
        const savedOrder = await createdOrder.save();
        return savedOrder;
    } catch (error) {
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
        const orders = await Order.findById({ user: userId, orderStatus: "PLACED" })
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



