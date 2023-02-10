import { gameSchema } from "../schemas/game.schema.js";

export function gameSchemaValidation(req, res, next){
    const game = req.body


    const {error} = gameSchema.validate(game, {abortEarly: false})


    if (error){
        const errorMessage = error.details(detail => detail.message)
        return res.status(400).send(errorMessage)
    }

    res.locals.game = game

    next()

} 