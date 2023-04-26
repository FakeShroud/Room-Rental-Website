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



module.exports = router;
