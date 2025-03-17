import jwt from "jsonwebtoken";

/*
  Middleware to check if user is logged in
*/
export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // console.log("Token found: ", token ? "YES" : "NO");

    if (!token) {
      return res.status(401).json({
        message: "token not found",
        success: false,
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET); // verify token and return decoded data (payload)

    req.user = decodedData; // store decoded data in req.user

    // console.log("Decoded Data ", decodedData);
  } catch (error) {
    console.log("auth middleware failure.");
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
  next(); // pass control to next middleware, controller or route handler
};
