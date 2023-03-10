import { db } from "../database/database.connection.js";


export async function getGames(req, res){

    try{
    const games = await db.query('SELECT * FROM games')
    res.send(games.rows)

    }
    catch{(err)
        res.status(500).send(err.message)
        console.log("Não conectou")
    }
}


export async function createGame(req, res){
    // const newGame = req.body (busca direto da req, não recebe edição do middleware)
    const newGame = res.locals.game
    const {name, image, stockTotal, pricePerDay} = newGame

   try{
    const game = await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])

    res.status(201).send(game.rows)

    }
    catch(err){
        res.status(500).send(err.message)
        console.log(err)
    }

}
