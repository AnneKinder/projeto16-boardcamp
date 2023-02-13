import { Router } from "express";
import {createRental, getRentals, returnRental} from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rental.middleware.js";


const router = Router()

router.get("/rentals", getRentals)
router.post("/rentals", rentalSchemaValidation, createRental)
router.post("/rentals/:id/return", returnRental)

export default router