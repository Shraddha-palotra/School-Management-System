import express from "express";
import bcrypt from "bcrypt";
import AnotherModel from "../models/User.js";
import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from 'multer';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";


const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    {id: user._id, name:user.name, email:user.email, phoneNumber:user.phoneNumber},
    process.env.KEY, {expiresIn:"7d"}
  );
};

// this is for signup authentication
router.post("/signup", async (req, res) => {
  console.log("signup API called");
  try {
    const { name, phoneNumber, email, password, confirmPassword } = req.body;
  console.log(req.body);

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
    return res.json({field:"email", message: "user already exsited" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 2 * 60000); // OTP valid for 2 minutes

  const newOtp = new Otp({ email, otp, expiresAt: otpExpiresAt });
  await newOtp.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shraddhapalotra@gmail.com",
      pass: "xmey fuij fzdd vyuy",
    },
  });

  const mailOptions = {
    from: "shraddhapalotra@gmail.com",
    to: email,
    subject: "Your OTP for Signup",
    text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ status: true, message: "OTP sent to your email" });
    }
  });

  } catch (error) {
  console.error("Error in signup API:", error);
  return res
    .status(500)
    .json({ status: false, message: "Internal Server Error" });
}
});

// for verify email
router.post("/verify-otp", async (req, res) => {
  console.log("Verify-otp called");
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ status: false, message: "Invalid OTP" });
    }

  
    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      console.error("Error: OTP has expired");
      return res.status(400).json({ status: false, message: "OTP has expired" });
    }



    const {name, phoneNumber, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = new AnotherModel({
      name,
      email,
      phoneNumber,
      password: hashPassword,
      isVerified: true,
    });

    await newUser.save();
    await Otp.deleteOne({ email, otp });

    const token = generateToken(newUser);
    // return res.json({ status: true, message: "Registered successfully", token });

    const savedUser = newUser;
    return res.json({ status: true, message: "Registered successfully",token});
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

// User route to get user data

router.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or invalid format" });
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.KEY);
    const user = await AnotherModel.findById(decoded.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired, please log in again" });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Malformed token" });
    }
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY); // Use a different key for refresh tokens
    const newToken = jwt.sign({ id: decoded.id }, process.env.KEY, { expiresIn: '7d' }); // Short-lived access token
    res.json({ token: newToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

//this is for login authentication

router.post("/login", async (req, res) => {
  //  console.log("Login API called");
  const { email, password } = req.body;
  
  const user = await AnotherModel.findOne({ email });
  if (!user) {
    console.log("inside user check");
    return res.json({field: "email", msg: "user is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ field: "password", msg: "password is incorrect" });
  }

  const token = jwt.sign({ name: user.name }, process.env.KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.json({ status: true, msg: "login successful", user, token });
  
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
      return res.status(400).json({ field: "id" ,msg: "user not found" });
    }

    const passwordValid = await bcrypt.compare(oldPassword, user.password);
    if (!passwordValid) {
      return res.status(400).json({field: "oldPassword", msg: "password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      console.log("password and confirmpassword do not match");
      return res.status(400).json({
        field: "confirmPassword",
        msg: "Password and ConfirmPassword do not match",
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/profiles');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.put("/updateprofile/:id", upload.single('profileImage'), async (req, res) => {
  console.log("Updateprofile API is called");
  console.log("params", req.params);
  const { id } = req.params;
  const data = req.body;
  console.log("id is", id);

  if (req.file) {
    data.profileImage = `/uploads/profiles/${req.file.filename}`;
  }
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
