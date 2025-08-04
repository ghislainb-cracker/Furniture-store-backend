import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'

import UserRoutes from './routes/userRoutes.js'
import AuthRoutes from './routes/authRoutes.js'

if (process.env.NODE_ENV !== 'production') {
     dotenv.config({ path: '.env' })
}

const App = express()

App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use(cors())
App.use(morgan('dev'))

// App.use(express.static(path.join(__dirname, 'public')))

App.get("/", (req, res) => {
     res.status(200).json({
          success: true,
          message: "Furniture shop API is running",
          version: '1.0.0'
     })
})

App.use(UserRoutes)
App.use(AuthRoutes)

const connectDB = async () => {
     try {
          const connection = await mongoose.connect(process.env.MONGODB_URI)
          console.info(`MongoDB connected: ${connection.connection.host}`)
     } catch (error) {
          console.error('MongoDB connection error: ', error)
          process.exit(1)
     }
}

App.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500
     return res.status(statusCode).json({
          success: false,
          message: err.message || 'Server error',
     })
})

const port = process.env.port

const startServer = async () => {
     try {
          await connectDB()
          const server = App.listen(port, () => {
               console.info(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
          })

          process.on('unhandledRejection', (err, promise) => {
               console.warn(`Error: ${err.message}`)
               server.close(() => process.exit(1))
          })
     } catch (error) {
          console.error("Failed to start server: ", error)
          process.exit(1)
     }
}

startServer()

export default App