import { Router } from "express";
import getRentals from "../controllers/rentals.controllers.js";


const router = Router()

router.get("/rentals", getRentals)

export default router