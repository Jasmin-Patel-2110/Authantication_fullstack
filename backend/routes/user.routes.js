import express from "express";
import {
  forgotPassword,
  loginUser,
  logout,
  profile,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controller/user.controller.js"; // importing controllers
import { isLoggedIn } from "../middleware/auth.middleware.js"; // importing middleware

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser); // In url, anything after /verify/ will be token and it will be passed to verifyUser
router.post("/login", loginUser);
router.get("/logout", isLoggedIn, logout); // flow: isLoggedIn (middleware) -> logout
router.get("/profile", isLoggedIn, profile); // flow: isLoggedIn (middleware) -> profile
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:passwordResetToken", resetPassword); // In url, anything after /resetPassword/ will be passwordResetToken and it will be passed to resetPassword

export default router;
