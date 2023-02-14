import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function returnRentalSchemaValidation(req, res, next){
    const {id} = req.params
   
    let rental = await db.query(` SELECT * FROM rentals WHERE id=$1 ` [id])
    rental =  rental.rows[0]


    if (!rental){
        res.sendStatus(404)
        return
    }

    if (rental.returnDate){
        res.sendStatus(400)
        return
    }

    const returnDate = dayjs().format("YYYY-MM-DD")
    const dateExpiresAt= dayjs(rental.rentDate, 'day').add(rental.daysRented, 'day')

    const diffDays = dayjs().diff(dateExpiresAt, 'day')

    let delayFee

    if ( diffDays>0){
        delayFee = diffDays*(rental.originalPrice/rental.daysRented)
    }
    
    res.locals.rental = {returnDate, delayFee, id}


    next()

} 