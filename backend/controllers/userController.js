import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function to create token for user to login
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {};

//route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User alreday exists with given email address.",
      });
    }
    //validate email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email address.",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter at lest eight character password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    //save user to database
    const user = await newUser.save();
    //generate token for user with _id
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//route for addmin login
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
