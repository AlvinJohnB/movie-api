const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware.js");

module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(400).json({ message: "All fields are required" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = authMiddleware.createAccessToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  }
};
