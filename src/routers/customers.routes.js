import {Router} from 'express'
import {createCustomer, getCustomerById, getCustomers, updateCustomer} from '../controllers/customers.controllers.js'
import { customerSchemaValidation } from '../middlewares/customer.middleware.js'

const router = Router()

router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomerById)
router.post("/customers",customerSchemaValidation ,createCustomer)
router.put("/customers/:id", customerSchemaValidation, updateCustomer)


export default router