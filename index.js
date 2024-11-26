const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')

const userRoute = require('./routes/userRoutes')
const paymentRoute = require("./routes/paytmRoute");
const connectToMongo = require('./configs/db')
connectToMongo();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/user',userRoute)
app.use('/api/v1/payment',paymentRoute)

const port =  process.env.PORT || 8000 ;

app.get('/',(req,res)=>{
    res.send("server is running...");
})

app.listen(port,()=>{
    console.log(`server is listerning to ${port}`);
})