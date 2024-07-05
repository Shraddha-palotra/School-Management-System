import express from "express";
import bcrypt from "bcrypt";
import AnotherModel from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

// this is for signup authentication
router.post("/signup", async (req, res) => {
  // console.log("signup API called");
  const { name, phoneNumber, email, password, confirmPassword } = req.body;
  // console.log(req.body);

  // Validate required fields
  if (!name || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }

  // Validate phone number length
  if (phoneNumber.length < 10 || phoneNumber.length > 10) {
    return res.status(400).json({ msg: "Phone Number should be 10 digits" });
  }

  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should be atleast 8 characters" });
  }

  //  Validate password match
  if (password !== confirmPassword) {
    console.log("password and confirmpassword do not match");
    return res.json({
      status: false,
      message: "Password and ConsirmPassword do not match",
    });
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ msg: "Please enter a valid email address" });
  }

  const user = await AnotherModel.findOne({ email });
  // Check if user already exists
  if (user) {
    return res.json({ message: "user already exsited" });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  // create new user
  const newUser = AnotherModel({
    name,
    phoneNumber,
    email,
    password: hashpassword,
  });

  // save the user
  await newUser.save();
  return res.json({ status: true, message: "record register" });
});

//this is for login authentication

router.post("/login", async (req, res) => {
  //  console.log("Login API called");
  const { email, password } = req.body;
  //  console.log(req.body);

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }

  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should be atleast 8 characters" });
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ msg: "Please enter a valid email address" });
  }

  const user = await AnotherModel.findOne({ email });
  if (!user) {
    console.log("inside user check");
    return res.json({field: "email" ,status: false, msg: "user is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ field: "password", msg: "password is incorrect" });
  }

  const token = jwt.sign({ name: user.name }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.json({ status: true, msg: "login successful", user });
});

//this is for forgot password
router.post("/forgot_password", async (req, res) => {
  //   console.log("forgot-password API called");
  const { email } = req.body;
  //   console.log(req.body);
  try {
    const user = await AnotherModel.findOne({ email });
    if (!user) {
      return res.json({field: "email", msg: "user is not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shraddhapalotra@gmail.com",
        pass: "xmey fuij fzdd vyuy",
      },
    });

    var mailOptions = {
      from: "shraddhapalotra@gmail.com",
      to: email,
      subject: "Reset password ",
      text: `http://localhost:3000/resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: " error sending email !" });
      } else {
        return res.json({ status: true, message: "email sent !" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// this this for reset password
router.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
 

  // Validate required fields
  if (!password || !confirmPassword) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }
  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should be atleast 8 characters" });
  }

  //  Validate password match
  if (password !== confirmPassword) {
    console.log("password and confirmpassword do not match");
    return res.json({
      status: false,
      message: "Password and ConsirmPassword do not match",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await AnotherModel.findByIdAndUpdate(
      { _id: id },
      { password: hashpassword }
      
    );
    return res.json({ status: true, message: "updated record" });
  } catch (err) {
    return res.json("invalid token");
  }
});

//  this is for change password

router.put("/changepassword/:id", async (req, res) => {
  // console.log("Changed-password API is called");
  // console.log("key request body", req.body);
  const { id } = req.params;
  // console.log(id);
  const { newPassword, oldPassword, confirmPassword } = req.body;
  // console.log("new password ", newPassword);
  // console.log("old password ", oldPassword);
  console.log(req.body);

  try {
    const user = await AnotherModel.findById({_id:id});
    if (!user) {
      return res.status(404).json({ field: "id" ,msg: "user not found" });
    }

    const passwordValid = await bcrypt.compare(oldPassword, user.password);
    if (!passwordValid) {
      return res.status(400).json({field: "oldPassword", msg: "password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      console.log("password and confirmpassword do not match");
      return res.json({
        msg: "Password and ConsirmPassword do not match",
      });
    }
     
  
    const hashpassword = await bcrypt.hash(newPassword.toString(), 8);

    user.password = hashpassword;

    const updatedLoggedUser = await AnotherModel.findByIdAndUpdate(
      { _id: id },
      { password: hashpassword }
    );
    return res.json({
      status: true,
      msg: "Password changed successfully",
      updatedLoggedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: true, msg: "An error occurred while changing the password" });
  }
});

// this is for profile

router.put("/updateprofile/:id", async (req, res) => {
  console.log("Updateprofile API is called");
  console.log("params", req.params);
  const { id } = req.params;
  const data = req.body;
  console.log("id is", id);

  try {
    const updatedProfileUser = await AnotherModel.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    return res.json({
      status: true,
      message: "Password changed successfully",
      updatedProfileUser,
    });
  } catch (error) {
    console.log(error);
  }
});


export { router as UserRouter };
