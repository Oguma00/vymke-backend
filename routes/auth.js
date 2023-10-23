const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { model } = require("mongoose");
const User = require("../models/user");
const router = require("express").Router();
// signup
router.post(
  "/signup",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "please enter a valid password").isAlphanumeric(),
    check("password", "please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const { email, password, firstName,lastName,location,phone,bio } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: {
            msg: "User Alresdy Exists",
          },
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        bio,
        location,
      });
      const savedUser = await newUser.save();
      const token = await jwt.sign(
        {
          id: savedUser._id,
          email: savedUser.email,
        },
        process.env.JWT_SIGN,
        { expiresIn: "3d" }
      );

      console.log(token);

      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);
// sign in
router.post(
  "/signin",
  [check("email", "please enter a valid email").isEmail()],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({
          error: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }

      const token = await jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SIGN,
        { expiresIn: "3d" }
      );

      console.log(token);
      res.status(200).json(user);
    } catch (error) {}
  }
);
module.exports = router;
