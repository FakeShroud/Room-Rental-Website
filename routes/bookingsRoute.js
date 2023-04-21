const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
    console.log(req.body);
    const {data} = req.body;
    // const {_id} = data;
    console.log(data)
    const {fromdate} = req.body
    console.log(fromdate)
    // const{
    //     // room,
        
    //     fromdate,
    //     todate,
    //     totalamount,
    //     totaldays,
    // } = req.body;
    try {
        // const NewBooking = await new Booking({
        //     data,
        //     // _id,
        //     // userid,
        //     fromdate,
        //     // todate,
        //     // totalamount,
        //     // totaldays,
        //     // transactionId: "1234",
        
        // })
        const booking = await Booking.create({
            
            fromdate,
        })
        res.json(
            {
                "success": true
            }
        )
        // res.send("Booking Successfull")
    } catch (error) {
        res.status(400).json({message: error})
    }
});
module.exports = router;