

// const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
// const { Message } = require("firebase-functions/pubsub");

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const { Message } = require("firebase-functions/pubsub");
dotenv.config()
const stripe  =require('stripe')(process.env.SECRET_KEY)
const app = express()
app.use(cors({origin:true}))
app.use(express.json())
// console.log(process.env.SECRET_KEY);
app.get('/',(req,res)=>{
    res.status(200).json({
        Message:'fixed'
    })
  
})
app.post('/payment/create' , async(req,res)=>{
    const total = req.query.total
    if(total>0){
        // console.log('payment received',total);
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:'usd'
        })
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        })
        res.send(total)
    }else{
        res.status(401).json({
            Message:'total must be grater than 0'
        })
    }
})

exports.api = onRequest(app)