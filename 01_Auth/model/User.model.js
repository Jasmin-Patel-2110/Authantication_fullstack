import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/*
  create new schema for user
*/
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"], // options for role field
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpiry: {
      type: Date,
    },
    refreshToken: String,
  },
  {
    timestamps: true, // add createdAt and updatedAt fields
  }
);

/* 
  if password is modified, hash password before saving to database

  It is called hooks. In this case it's called pre hook
*/
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // 10 is salt round
  }

  next(); // pass control to next middleware, controller or route handler
});

const User = mongoose.model("User", userSchema); // create model from schema

export default User;
