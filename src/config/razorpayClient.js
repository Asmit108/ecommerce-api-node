const Razorpay = require('razorpay');

const KEY_ID='rzp_test_hvf64RyhdJoDbt'
const KEY_SECRET='U11VpzHg7tDWTXh9tROp2eWd'
const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET
});

module.exports=razorpay