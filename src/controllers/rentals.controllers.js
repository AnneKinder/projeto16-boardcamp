import { db } from "../database/database.connection.js";


export async function getRentals(req, res) {

    try {
        const rentals = await db.query(
            `
             SELECT rentals.*, json_build_object(
               
                'id', customers.id,
                'name', customers.name
                
                )
                AS customer, 
                json_build_object(
               
                    'id', games.id,
                    'name', games.name
                    
                    ) 
                    AS game
             FROM rentals 
             JOIN customers
             ON rentals."customerId"=customers.id
             JOIN games
             ON rentals."gameId"=games.id;
             `)

        res.send(rentals.rows)
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

export async function createRental(req, res) {

    const rental2 = res.locals.rental2
    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = rental2


    try {
        const rental = await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
        res.status(201).send(rental.rows)

    }
    catch (err) {
        res.status(500).send(err.message)
        console.log(err)
    }
}

export async function returnRental(req, res) {

    const {id} = req.params
   
    const date = new Date()

    const currentDate = date.toISOString().split('T')[0]

    try {
        const dayOfReturn = currentDate.slice(8,10)
        console.log(dayOfReturn)
        if (!id){
            res.status(404).send("Rental doesn't exist.")
            return
        }
        
        const alreadyReturned = await db.query( `SELECT ("returnDate") FROM rentals WHERE id=$1`, [id])
    
        if (alreadyReturned.rows[0]!==null){
           res.status(400).send("Product was already returned.")
           return
        }


        const returnRental = await db.query(`UPDATE rentals SET "returnDate"=$1 WHERE id = $2;`, [currentDate, id])
        res.status(201).send(returnRental.rows)

  

    }
    catch (err) {
        res.status(500).send(err.message)
        console.log(err)
    }
}