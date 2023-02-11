import { Router } from "express";
import {createRental, getRentals} from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rental.middleware.js";


const router = Router()

router.get("/rentals", getRentals)
router.post("/rentals", rentalSchemaValidation, createRental)

export default router