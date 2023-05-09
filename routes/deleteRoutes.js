const express = require("express");
const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");
const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

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
    const roomId = req.params.id.trim();
    console.log("Room ID to be deleted (trimmed):", roomId); // Add this line
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    console.log("Room to be deleted:", room);
    const deleteResult = await Room.deleteOne({ _id: roomId }); // Update this line
    console.log("Delete result:", deleteResult); // Add this line
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log("Error in delete room route:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
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
