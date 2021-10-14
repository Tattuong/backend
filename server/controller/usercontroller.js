const jwt = require("jsonwebtoken");
const User = require("../models/User");

const argon2 = require("argon2"); // xac minh mat khau

const regitserUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ success: false, message: "Missing username, email or password" });
  try {
    const user = await User.find({ username });
    if (user.length > 0) {
      res.status(400).json({
        success: false,
        errors: {
          username: 'username already taken'
        }
      });
    } else {
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      // Return token

      res.json({
        success: true,
        message: "User created successfully"
      });
    }

    // All good
    // res.redirect('/login')
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  regitserUser,
};