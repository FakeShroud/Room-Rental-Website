const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.json(rooms);
  } catch (error) {
    return res.status(400).json({ message: err });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  
  try {
    const room = await Room.findOne({ _id: roomid });
    return res.json(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("Room added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
    
  }
});

  router.delete("/:roomId", async (req, res) => {
    try {
      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      await room.remove();
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  

module.exports = router;
