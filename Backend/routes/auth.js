const router = require("express").Router();
const User = require("../models/User_M");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASS
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (err) {
    console.log("hello");
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("Username does not exist. Usernames are case sensitive");
      return res.json("Username does not exist. Usernames are case sensitive");
    }
    // Use the user variable we just found and decrypt the password with CryptoJS
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASS
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // Adding Jsonwebtoken
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" } // expires in 3d and will have to login again
    );
    // Now we are going to destructure our user object so we don't show encrypted password in db for extra security
    // When doing this others returns a lot of things. we use _doc to return just the user object we want
    const { password, ...others } = user._doc;

    if (originalPassword !== req.body.password) {
      consoe.log("incorrect password");
      return res.status(401).json("Incorrect Password");
    } else {
      // We send back others which is the user object without the password. Use acessToken as well for extra security
      res.status(200).json({ ...others, accessToken });
      console.log("successful login");
    }
  } catch (err) {
    console.log("incorrect password");
    res.json("incorrect password");
  }
});

module.exports = router;
