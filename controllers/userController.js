import User from "../models/User.js"
import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import process from "process"
import { sendPasswordResetEmail } from "../utils/email.js"

// Generate the jsonwebtoken
const generateToken = (id) => {
     return jsonwebtoken.sign({ id }, process.env.JWT_SECRET);
}

// Register account
export const register = async (req, res, next) => {
     try {
          const { name, email, password } = req.body

          // Check for unavailable fields
          if (!name || !email || !password || name == "" || email == "" || password == "") {
               return next({
                    message: 'All fields are required',
                    statusCode: 400,
               })
          }

          // Check if the email is already registered
          const existingUser = await User.findOne({ email })
          if (existingUser) {
               return next({
                    message: "User already exist",
                    statusCode: 400,
               })
          }

          const user = await User.create({
               name, email, password, role: 'user'
          })

          // Get token
          const token = generateToken(user._id)

          user.password = undefined

          return res.status(201).json({
               success: true,
               message: "Account created successfully",
               data: {
                    username: user.name,
                    useremail: user.email,
                    userrole: user.role,
                    userid: user._id,
                    token
               }
          })
     } catch (error) {
          console.error("Error during register: ", error)
          return next({
               message: error.errors?.email.properties.message || "Server error",
               statusCode: 400,
          });
     }
}

export const login = async (req, res, next) => {
     try {
          const { email, password } = req.body

          // Check for unavailable fields
          if (!email || !password || email == "" || password == "") {
               return next({
                    message: 'All fields are required',
                    statusCode: 400,
               })
          }

          // Check of email is already registered
          const user = await User.findOne({ email }).select('+password')
          if (!user) {
               return next({
                    message: 'Invalid email',
                    statusCode: 401,
               })
          }

          // Match passwords
          const isMatch = await user.matchPassword(password)
          if (!isMatch) {
               return next({
                    message: 'Invalid password',
                    statusCode: 401,
               })
          }

          // Get token
          const token = generateToken(user._id)

          user.password = undefined

          return res.status(200).json({
               success: true,
               message: "Login successfully",
               data: {
                    username: user.name,
                    useremail: user.email,
                    userrole: user.role,
                    userid: user._id,
                    token
               }
          })
     } catch (error) {
          console.warn("Error during login: ", error)
          return next({
               message: error,
               statusCode: 401,
          })
     }
}

export const forgotPassword = async (req, res, next) => {
     try {
          const { email } = req.body
          if (!email || email == "") {
               return next({
                    message: "Email is required",
                    statusCode: 400,
               })
          }

          // For knowing the platform, can be either web or mobile
          const platform = req.header("Platform");
          if (!platform || platform == "") {
               return next({
                    message: "Platform unknown! Add the platform in the header,",
                    statusCode: 400,
               })
          }

          const user = await User.findOne({ email })
          if (!user) {
               return next({
                    message: 'Email not found',
                    statusCode: 401,
               })
          }

          // Get token
          const resetToken = generateToken(user._id)
          user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
          user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000)

          await user.save({ validateBeforeSave: false })

          const resetUrl = `${platform === 'mobile' ? process.env.DEEPLINK_RESET : process.env.WEB_RESET}?token=${resetToken}`;

          try {
               await sendPasswordResetEmail(user.email, resetUrl, platform)
               return res.status(200).json({
                    message: 'Reset email sent, check your email',
                    success: true,
               })
          } catch (error) {
               console.error("Email sending error: ", error)
               user.resetPasswordToken = undefined
               user.resetPasswordExpire = undefined
               await user.save({ validateBeforeSave: false })
               return next({
                    message: 'Email could not be sent. Try again later',
                    statusCode: 400,
               })
          }
     } catch (error) {
          console.warn("Error sending reset link: ", error)
          return next({
               message: error,
               statusCode: 400,
          })
     }
}

export const resetPassword = async (req, res, next) => {
     const { resetToken, newPassword, confirmPassword } = req.body
     try {
          const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

          const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
          if (!user) {
               return next({
                    message: 'Invalid token or token has exprired',
                    statusCode: 400,
               })
          }

          user.password = newPassword
          user.resetPasswordToken = undefined
          user.resetPasswordExpire = undefined

          await user.save()

          const token = generateToken(user._id)
          return res.status(200).json({
               success: true,
               message: "Password reset was successfully",
               data: {
                    username: user.name,
                    useremail: user.email,
                    userrole: user.role,
                    userid: user._id,
                    token
               }
          })
     } catch (error) {
          return next({
               message: error,
               statusCode: 500,
          })
     }
}