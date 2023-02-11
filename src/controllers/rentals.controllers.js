import { db } from "../database/database.connection.js";


export async function getRentals(req, res){

    try{
        const rentals = await db.query(`SELECT * FROM rentals`)

        res.send(rentals.rows)
    }
    catch(err){
        res.status(500).send(err.message)
    }

}

export async function createRental(req, res){

        // const newGame = req.body (busca direto da req, não recebe edição do middleware)
        const rental2 = res.locals.rental2
        const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = rental2
    

       try{
        const rental = await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
        res.status(201).send(rental.rows)


        }
        catch(err){
            res.status(500).send(err.message)
            console.log(err)
        }
}