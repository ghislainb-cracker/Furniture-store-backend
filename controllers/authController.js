import User from "../models/User.js"

export const getMe = async (req, res, next) => {
     try {
          const userId = req.query.userId
          const user = await User.findById(userId)
          res.status(200).json({
               success: true,
               data: user,
          })
     } catch (error) {
          return next({
               message: error.message | "Server error",
               statusCode: 500,
          })
     }
}