import express from 'express'
import { getMe } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const AuthRoutes = express.Router()
AuthRoutes.use(protect)

AuthRoutes.get("/api/auth/getMe", getMe)

export default AuthRoutes