import 'dotenv/config'
import './src/database/connectdb.js'
import express from 'express'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './src/routes/auth.route.js'
import expenseRoutes from './src/routes/expense.route.js'
import userRoutes from './src/routes/user.route.js'
import incomeRoutes from './src/routes/income.route.js'
import cors from 'cors'

const app = express()

const whitelist = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(
  cors({
    origin: function (origin, callback) {
      //for bypassing postman req with  no origin
      if (!origin) {
        return callback(null, true)
      }
      // console.log('origin: ', origin)
      if (whitelist.includes(origin)) {
        return callback(null, origin)
      }
      return callback('No autorizado por cors')
    },
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/incomes', incomeRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`😍😍 http://localhost:${PORT}`))
