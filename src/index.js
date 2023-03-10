import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

import gameRoutes from './routers/games.routes.js'
import rentalRoutes from './routers/rentals.routes.js'
import customerRoutes from './routers/customers.routes.js'




app.use([gameRoutes, rentalRoutes, customerRoutes])

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running in port ${port}`))