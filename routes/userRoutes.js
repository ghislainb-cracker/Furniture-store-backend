import express from 'express'
import { register, login, forgotPassword, resetPassword } from '../controllers/userController.js'

const UserRoutes = express.Router()

UserRoutes.post("/api/user/register", register)
UserRoutes.post("/api/user/login", login)
UserRoutes.post("/api/user/forgot", forgotPassword)
UserRoutes.post("/api/user/reset", resetPassword)

export default UserRoutes