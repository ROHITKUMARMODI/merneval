const bcrypt = require("bcryptjs");
let { validationResult } = require("express-validator");
let { v4: uuid } = require("uuid");
const users = require("../db/models/user.model");
const jwt = require("jsonwebtoken");
const use = require("../routes/user.route");

let siginUser = async (req, res) => {
  let errors = validationResult(req);
  let body = req.body;
  if (errors && errors.length) {
    res.status(400).json({ success: false, message: errors[0].message });
  }

  if (!body || !body.email || !body.password) {
    return res.status(400).json({ success: false, message: "PLease check credentials" });
  }
  query = {
    email: body.email,
  };
  console.log(query);
  let user = await users.findOne(query);
  if (!user && Object.keys(users).length == 0) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const isPasswordMatched = await bcrypt.compare(body.password, user.password);
  if (!isPasswordMatched) {
    return res.status(404).json({ success: false, message: "Password incorrect" });
  }
  const payload = { userId: user._id,type: user.type || 0, name: user.name,};
  const tokenSecret = process.env.TOKEN_SECRET;
  jwt.sign(
    payload,
    tokenSecret,
    {
      expiresIn: 3600,
    },
    (err, token) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      res.json({ success: true, token: token });
    }
  );
};

let signUpUser = async (req, res) => {
  const errors = validationResult(req);
  const body = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg, // use msg, not message
});
  }

  if (!body || !body.email || !body.password || !body.name || !body.phone) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: name, email, password, phone",
    });
  }

  try {
    const existingUser = await users.findOne({ email: body.email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already signed up",
      });
    }

    const salt = await bcrypt.genSalt(11);

    const newUser = {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, salt),
      phone: body.phone,
    };

    await users.insertOne(newUser);

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
};

let updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, phone } = req.body;

  try {
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({ success: true, message: "User details updated successfully", user });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Error updating user" });
  }
};


let deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await users.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};


module.exports = {
  siginUser,
  signUpUser,
  updateUser,
  deleteUser,
};
