import { Router } from "express";
import {createRental, deleteRental, getRentals, returnRental} from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rental.middleware.js";
import { returnRentalSchemaValidation } from "../middlewares/returnRental.middleware.js";


const router = Router()

router.get("/rentals", getRentals)
router.post("/rentals", rentalSchemaValidation, createRental)
router.post("/rentals/:id/return", returnRentalSchemaValidation, returnRental)
router.delete("/rentals/:id", deleteRental)

export default router