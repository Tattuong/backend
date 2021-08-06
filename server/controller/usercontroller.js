const jwt = require("jsonwebtoken");
const User = require("../models/User");

const argon2 = require("argon2"); // xac minh mat khau



const regitserUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  try {
    const user = await User.find({username})
    if (user.length>0) {
      res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    } else {
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
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
