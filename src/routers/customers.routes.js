import {Router} from 'express'
import {getCustomers} from '../controllers/customers.controllers.js'

const router = Router()

router.get("/customers", getCustomers)

export default router