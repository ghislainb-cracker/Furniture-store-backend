import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// User schema definition
const UserSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Please add a name"],
          trim: true,
          maxlength: [50, "Name cannot be more than 50 characters"],
          minlength: [3, "Name cannot be less than 3 characters"],
     },
     email: {
          type: String,
          required: [true, "Please add an email"],
          unique: true,
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please check your email"],
     },
     phone: {
          type: String,
          maxlength: [25, "Phone number cannot be longer than 25 characters"],
     },
     password: {
          type: String,
          required: [true, "Please add a password"],
          minlength: [6, "Password should be at least 6 characters"],
          select: false,
     },
     role: {
          type: String,
          enum: ["user", "admin"],
          default: "user",
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
}, {
     timestamps: true,
     toJSON: { virtuals: true },
     toObject: { virtuals: true },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
     // Only hash the password if it has been modified (or is new)
     if (!this.isModified("password")) {
          return next();
     }

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
     return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
     // Generate token
     const resetToken = crypto.randomBytes(20).toString("hex");

     // Hash token and set to resetPasswordToken field
     this.resetPasswordToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

     // Set expire (10 minutes)
     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

     return resetToken;
};

// Create and export the model
const User = mongoose.model("User", UserSchema);

export default User