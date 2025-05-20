import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//place order using Cash On Delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//place order usin Stripe Method
const placeOrderStripe = async (req, res) => {};
//place order using Razor method
const placeOrderRazorpay = async (req, res) => {};
//All orders data for admin panel
const allOrders = async (req, res) => {};
//User order data for FrontEnd
const userOrders = async (req, res) => {};
//Update order status from admin panel
const updateStatus = async (req, res) => {};
export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
