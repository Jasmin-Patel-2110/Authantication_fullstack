import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

/*
  Middleware to check if user is logged in
*/
export const isLoggedIn = async (req, res, next) => {
  /* 
  Algorithm for isLoggedIn

    1. get accessToken and refreshToken from cookies
    2. if accessToken is not present, check if refreshToken is present
      - if refreshToken is present, find user from db based on id from decoded data and refreshToken
      - if user is not found, return error
      - if user is found, generate new accessToken and refreshToken
      - store new accessToken and refreshToken in cookies
      - store user in req.user

    3. if accessToken is present, verify it
      - if accessToken is not valid, return error
      - if accessToken is valid, find user from db based on decoded data(id)
      - if user is not found, return error
      - if user is found, generate new accessToken and refreshToken
      - store new accessToken and refreshToken in cookies
      - store user in req.user
    
    4. if accessToken is not present and refreshToken is not present, return error
*/
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // console.log("inside middle ware ", accessToken, refreshToken);
    // console.log("Token found: ", accessToken && refreshToken ? "YES" : "NO");

    if (!accessToken) {
      // check for refresh token
      if (!refreshToken) {
        return res.status(400).json({
          message: "user not logged in",
          success: false,
        });
      }

      const decodedData = jwt.verify(
        refreshToken,
        process.env.REFRESHTOKEN_SECRET
      );

      // have refresh token. Find user from db based on refresh token
      const user = await User.findOne({
        _id: decodedData.id,
        refreshToken: refreshToken,
      });

      // check if user exist
      if (!user) {
        return res.status(400).json({
          message: "Invalid refresh token",
        });
      }

      await resetTokens(user, req, res);

      req.user = { id: user._id, role: user.role };
    } else {
      // verify accessToken and return decoded data (payload)
      const decodedData = jwt.verify(
        accessToken,
        process.env.ACCESSTOKEN_SECRET
      );

      const user = await User.findOne({ _id: decodedData.id });

      // check if user exist
      if (!user) {
        return res.status(400).json({
          message: "token expired or user not found",
        });
      }

      await resetTokens(user, req, res);

      req.user = { id: user._id, role: user.role };
    }
  } catch (error) {
    console.log("auth middleware failure.");
    return res.status(500).json({
      message: "Internal server error",
      error,
      success: false,
    });
  }
  next(); // pass control to next middleware, controller or route handler
};

async function resetTokens(user, req, res) {
  /*
    Algorithm to reset tokens

      1. generate new refresh token
      2. store new refresh token in user
      3. generate new access token
      4. store new access token and refresh token in cookies

  */

  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: process.env.REFRESHTOKEN_EXPIRY }
  );

  user.refreshToken = newRefreshToken; // store in user

  // generate new accessToken token
  const newAccessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: process.env.ACCESSTOKEN_EXPIRY }
  );

  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  // res.cookie("token", jwtToken, cookieOptions);
  res.cookie("accessToken", newAccessToken, cookieOptions);
  res.cookie("refreshToken", newRefreshToken, cookieOptions);
}
