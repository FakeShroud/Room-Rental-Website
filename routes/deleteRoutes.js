const express = require("express");
const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");
const router = express.Router();



// Delete Booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log("Error in delete booking route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Room

router.delete("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    await Room.deleteOne({ _id: req.params.id });
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log("Error in delete room route:", error);
    res.status(500).json({ message: "Server error" });
  }
});








router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in delete user route:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
