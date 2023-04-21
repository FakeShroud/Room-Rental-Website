const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
    const{
        room,
        userid,
        fromDateObj,
        toDateObj,
        totalamount,
        totaldays,
    } = req.body;
    try {
        const newbooking = new Booking({
            data,
            roomid : data._id,
            userid,
            fromDateObj,
            toDateObj,
            totalamount,
            totaldays,
            transactionId: "1234",
        
        })
        const booking = await newbooking.save();
        res.send("Booking Successfull")
    } catch (error) {
        res.status(400).json({message: error})
    }
});
module.exports = router;