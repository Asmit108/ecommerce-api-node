const Razorpay = require('razorpay');

const KEY_ID='rzp_test_1nPr3ugBxoC3YI'
const KEY_SECRET='8UwjIDyi1Y1OHh5AhMIxxBso'
const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET
});

module.exports=razorpay