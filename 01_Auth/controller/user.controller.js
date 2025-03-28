import bcrypt from "bcryptjs";
import User from "../model/User.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import transporter from "../utils/mail.utils.js";

const registerUser = async (req, res) => {
  /* 
  Algorithm for registerUser

    1. get data
    2. validate
    3. check if user already exists
    4. create user in database
    5. create a verification token
    6. save token in database
    7. send token to user as email
    8. send success status to user
  */

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    name.trim();
    email.trim();
    password.trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist...",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save();

    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email, // list of receivers
      subject: "Verify your Email",
      text: "Please click on the following link - ",
      html: `
      Verification Link: ${process.env.BASE_URL}/api/v1/user/verify/${user.verificationToken}
      </br>
      Verification Token: ${user.verificationToken}
      </br>
      Verification token(link) will expire in 10 minutes.
      </br>
      <b>This is a testing email, not for production use.</b>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: `User registered successfully`,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User not registered.",
      error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  /* 
  Algorithm for verifyUser

    1. get token from url
    2. find user with same token
    3. set isVerified to true for that user
    4. remove verification token from user
    5. save
    6. send success status to user
  */

  try {
    const { token } = req.params;

    token.trim();
    // console.log(token);

    if (!token) {
      return res.status(400).json({
        message: "Invalid token... Bad request...",
      });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        message: "token expired... invalid token...",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({
      message: "User verified successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User not verified.",
      error,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  /* 
  Algorithm for loginUser

    1. get email and password
    2. check if user exist with that email
    3. check if user is verified
    4. check if password is correct
    5. generate accessToken and refreshToken
    6. store accessToken and refreshToken in cookies and refreshToken in user
    7. save user in db
    8. send success status to user
  */

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    email.trim();
    password.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email",
      });
    }

    // const jwtToken = jwt.sign(
    //   {
    //     id: user._id,
    //     role: user.role,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: process.env.JWT_EXPIRY,
    //   }
    // );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: process.env.REFRESHTOKEN_EXPIRY }
    );

    user.refreshToken = refreshToken;

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: process.env.ACCESSTOKEN_EXPIRY }
    );

    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      // maxAge: 24 * 60 * 60 * 1000, // in milliseconds
    };

    // res.cookie("token", jwtToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token: { accessToken, refreshToken },
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "User not registered.",
      error,
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  /* 
  Algorithm for forgotPassword

    1. get email from user
    2. check if user exist with that email
    3. generate passwordResetToken
    4. save it to database
    5. send it to user trough email
  */
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "email not found",
        success: false,
      });
    }

    email.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    const passwordResetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email, // list of receivers
      subject: "Verify your Password Reset",
      text: "Please click on the following link - ",
      html: `
      Verification Link: ${process.env.BASE_URL}/api/v1/user/resetPassword/${user.passwordResetToken}
      </br>
      password Reset Token: ${user.passwordResetToken}
      </br>
      password Reset token(link) will expire in 10 minutes.
      </br>
      <b>This is a testing email, not for production use.</b>
      `,
    };

    transporter.sendMail(mailOptions);

    // console.log("password before: ", user.password);

    return res.status(200).json({
      message: "Password reset mail sent successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "forgot password failure",
      success: false,
    });
  }
};

const resetPassword = async (req, res) => {
  /* 
  Algorithm for resetPassword

    1. get passwordResetToken from params
    2. get newPassword and conformPassword
    3. find user based on token
    4. check if passwordResetToken expired
    5. change password
    6. remove passwordResetToken and passwordResetExpiry from user
    7. save user
    8. send success status
  */

  const { passwordResetToken } = req.params;
  const { newPassword, conformPassword } = req.body;

  passwordResetToken.trim();
  newPassword.trim();
  conformPassword.trim();

  if (!passwordResetToken) {
    return res.status(400).json({
      message: "Invalid passwordResetToken",
      success: false,
    });
  }

  if (!newPassword || !conformPassword || newPassword !== conformPassword) {
    return res.status(400).json({
      message: "all fields required",
      success: false,
    });
  }
  try {
    const user = await User.findOne({ passwordResetToken });

    if (!user) {
      return res.status(400).json({
        message: "no user found",
        success: false,
      });
    }
    if (user.passwordResetExpiry < Date.now()) {
      return res.status(400).json({
        message: "passwordResetToken expired",
        success: false,
      });
    }

    user.password = newPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;

    await user.save();

    // console.log("password after: ", user.password);

    return res.status(200).json({
      message: "password reset successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "password reset failure",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  /* 
  Algorithm for logout

    1. get userId from req.user
    2. find user with userId (if not found, return error)
    3. set refreshToken to null in user
    4. save user in db
    5. clear cookies
    6. send response
  */

  if (!req.user) {
    return res.status(400).json({
      message: "no cookie found",
      success: false,
    });
  }

  const user = await User.findOne({ _id: req.user.id });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }

  user.refreshToken = null;

  await user.save();

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(202).json({
    message: "logged out successfully",
    success: true,
  });
};

const profile = async (req, res) => {
  /* 
  Algorithm for profile

    1. get userId from req.user
    2. find user with userId
    3. get user excluding _id, password, passwordResetToken, passwordResetExpiry, verificationToken and refreshToken
      (because we don't want to send those to frontend)
    4. send response with user 
  */
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
      });
    }

    const user = await User.findById(userId).select(
      "-_id -password -passwordResetToken -passwordResetExpiry -verificationToken -refreshToken"
    );

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User found",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "profile get failure",
      success: false,
    });
  }
};

export {
  registerUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
  profile,
};
