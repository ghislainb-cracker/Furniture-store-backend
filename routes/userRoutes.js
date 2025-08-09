import express from 'express'
import { register, login, forgotPassword, resetPassword } from '../controllers/userController.js'

const UserRoutes = express.Router()

UserRoutes.post("/register", register)
UserRoutes.post("/login", login)
UserRoutes.post("/forgot", forgotPassword)
UserRoutes.post("/reset", resetPassword)

export default UserRoutes