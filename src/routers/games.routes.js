import {Router} from 'express'
import { getGames, createGame } from '../controllers/games.controllers.js'
import { gameSchemaValidation } from '../middlewares/game.middleware.js'

const router = Router()


router.get("/games",  getGames)
router.post("/games", gameSchemaValidation, createGame)


export default router