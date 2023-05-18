const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.post("/checkemailexists", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/register", async (req, res) => {
  const newuser = new User(req.body);
  try {
    const user = await newuser.save();
    res.send("User created successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
        district: user.district,
        number: user.number,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    // Find user by id and update the user data
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user data as a response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
