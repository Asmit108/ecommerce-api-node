const app = require(".");
const { connectDb } = require("./config/db");
const PORT=4000;
app.listen(PORT,async()=>{
    await connectDb();
    console.log('ecommerce api listening on port:',PORT)
})