import { gameSchema } from "../schemas/game.schema.js";
import { db } from "../database/database.connection.js";

export async function gameSchemaValidation(req, res, next){
    const game = req.body


    const validation = gameSchema.validate(game, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      res.status(400).send("Preencha os campos corretamente");
      console.log(errors);
      return;
    }

    const alreadyExists = await db.query(`SELECT * FROM games WHERE name=$1`, [game.name])

    if(alreadyExists){{
        res.status(409).send("Game already exists")
        return
    }}

    res.locals.game = game

    next()

} 