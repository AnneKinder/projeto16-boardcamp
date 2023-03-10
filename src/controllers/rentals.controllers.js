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
        const rental = await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, null, $5, null)`,
            [customerId, gameId, rentDate, daysRented, originalPrice])

        res.status(201).send(rental.rows)

    }
    catch (err) {
        res.status(500).send(err.message)
        console.log(err)
    }
}

export async function returnRental(req, res) {

    const { returnDate, delayFee, id } = res.locals.rental


    try {

        await db.query(
            `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3 `,
            [returnDate, delayFee, id])

        res.sendStatus(200)

    }
    catch (err) {

        res.status(500).send(err.message)
        console.log(err.message)

    }
}

export async function deleteRental(req, res) {
    const { id } = req.params


    try {

        const results = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])

        if (results.rowCount == 0) {
            res.sendStatus(404)
            return
        }

        if (!results.rows[0].returnDate) {
            res.sendStatus(400)
            return
        }

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        res.sendStatus(200)


    }
    catch (err) {

        res.status(500).send(err.message)

    }


}