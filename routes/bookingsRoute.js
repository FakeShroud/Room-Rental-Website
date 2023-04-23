const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
  console.log(req.body);

  const { fromdate } = req.body;
  const { todate } = req.body;
  const { data } = req.body;
  const { userid } = req.body;
  const { transactionId } = req.body;
  const { roomid } = req.body;
  const { totalamount } = req.body;
  const { totaldays } = req.body;
  console.log(roomid);
  try {
    const booking = await Booking.create({
      data: data.name,
      userid,
      fromdate,
      todate,
      transactionId: "1234567890",
      roomid,
      totaldays,
      totalamount,
    });
    const roomtemp = await Room.findOne({ _id: roomid });
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save();
    res.json({
      success: true,
    });
    // res.send("Booking Successfull")
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const  userid  = req.body.userid;
  
  try {
    const bookings = await Booking.find({ userid: userid });
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
module.exports = router;
