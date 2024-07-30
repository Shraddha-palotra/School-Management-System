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
import validationErrors from "../ERRORS/Validations.js";


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
    return res.status(400).json({ message: validationErrors.PLEASE_ENTER_ALL_FIELD });
  }

  // Validate phone number length
  if (phoneNumber.length < 10 || phoneNumber.length > 10) {
    return res.status(400).json({ message: validationErrors.PHONENUMBER_TOO_SHORT });
  }

  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: validationErrors.PASSWORD_TOO_SHORT });
  }

  //  Validate password match
  if (password !== confirmPassword) {
    console.log("password and confirmpassword do not match");
    return res.json({
      status: false,
      message: validationErrors.PASSWORD_MISMATCH,
    });
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: validationErrors.INVALID_EMAIL });
  }

  const user = await AnotherModel.findOne({ email });
  // Check if user already exists
  if (user) {
    return res.json({field:"email", message: validationErrors.USER_ALREADY_REGISTERED });
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
      return res.json({ message: validationErrors.OTP_ERROR });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ status: true, message: validationErrors.OTP_SENT });
    }
  });

  } catch (error) {
  console.error("Error in signup API:", error);
  return res
    .status(500)
    .json({ status: false, message: validationErrors.INTERNAL_SERVER_ERROR });
}
});

// for verify email
router.post("/verify-otp", async (req, res) => {
  console.log("Verify-otp called");
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ status: false, message: validationErrors.INVALID_OTP});
    }

  
    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      console.error("Error: OTP has expired");
      return res.status(400).json({ status: false, message: validationErrors.OTP_EXPIRED,data:null});
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
    return res.json({ status: true, message: validationErrors.REGISTERED_SUCCESSFULLY,token});
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return res.status(500).json({ status: false, message: validationErrors.INTERNAL_SERVER_ERROR });
  }
});


// user API headDash 
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: validationErrors.NO_TOKEN_PROVIDED});

  jwt.verify(token, process.env.KEY, (err, user) => {
    if (err) return res.status(403).json({ message: validationErrors.INVALID_TOKEN });
    req.user = user;
    next();
  });
};



router.get("/user", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: validationErrors.NO_TOKEN_PROVIDED });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    // console.log('decoded',decoded);
    const user = await AnotherModel.findOne({ name: decoded.name });
    if (!user) {
      return res.status(404).json({ message: validationErrors.USER_NOT_FOUND });
    }
    res.json({data:user, message: validationErrors.ACCESS_DATA_SUCCESSFULLY});
  } catch (error) {
    res.status(400).json({ message: validationErrors.INVALID_TOKEN });
  }
});



//this is for login authentication

router.post("/login", async (req, res) => {
   console.log("Login API called");
  const { email, password } = req.body;
  
  const user = await AnotherModel.findOne({ email });

  if (!user) {
    return res.json({field: "email", message: validationErrors.USER_NOT_REGISTERED });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ field: "password", message: validationErrors.INCORRECT_PASSWORD });
  }

  const token = jwt.sign({ name: user.name }, process.env.KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 * 24 * 7 });

  return res.json({ status: true, message: validationErrors.LOGIN_SUCCESSFULLY, user, token });
  
});


//this is for forgot password
router.post("/forgot_password", async (req, res) => {
  //   console.log("forgot-password API called");
  const { email } = req.body;
  //   console.log(req.body);
  try {
    const user = await AnotherModel.findOne({ email });
    if (!user) {
      return res.json({field: "email", message: validationErrors.USER_NOT_REGISTERED });
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
        return res.json({ message: validationErrors.OTP_ERROR });
      } else {
        return res.json({ status: true, message: validationErrors.OTP_SENT});
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
    return res.status(400).json({ message: validationErrors.PLEASE_ENTER_ALL_FIELD });
  }
  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: validationErrors.PASSWORD_TOO_SHORT });
  }

  //  Validate password match
  if (password !== confirmPassword) {
    console.log("password and confirmpassword do not match");
    return res.json({
      status: false,
      message: validationErrors.PASSWORD_MISMATCH,
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
    return res.json({ status: true, message: validationErrors.UPDATED_RECORD });
  } catch (err) {
    return res.json({message: validationErrors.INVALID_TOKEN});
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
      return res.status(400).json({ field: "id" ,message: validationErrors.USER_NOT_FOUND});
    }

    const passwordValid = await bcrypt.compare(oldPassword, user.password);
    if (!passwordValid) {
      return res.status(400).json({field: "oldPassword", message: validationErrors.INCORRECT_PASSWORD });
    }

    if (newPassword !== confirmPassword) {
      console.log("password and confirmpassword do not match");
      return res.status(400).json({
        field: "confirmPassword",
        message: validationErrors.PASSWORD_MISMATCH,
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
      message: validationErrors.PASSWORD_CHANGE,
      updatedLoggedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: true, message: validationErrors.ERROR});
  }
});

// this is for profile

const __filename = fileURLToPath( import.meta.url);
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
     id,
      { $set: data },
      { new: true }
    );
    return res.json({
      status: true,
      message: validationErrors.PROFILE_UPDATED,
      updatedProfileUser,
    });
  } catch (error) {
    console.log(error);
  }
});


export { router as UserRouter };
