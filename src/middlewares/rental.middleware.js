import { rentalSchema } from "../schemas/rental.schema.js";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function rentalSchemaValidation(req, res, next){
    const rental = req.body
    const {customerId, gameId, daysRented} = rental


    const validation = rentalSchema.validate(rental, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      res.status(400).send("Preencha os campos corretamente");
      console.log(errors);
      return;
    }

    const customerExists = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId])
    const gameExists = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
    const checkStock = await db.query( `SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`, [gameId])

    const rentedUnities = checkStock.rowCount
    const allUnitiies = gameExists.rows[0].stockTotal


    if (
        customerExists.rowCount==0 ||
        gameExists.rowCount==0 ||
        rentedUnities >= allUnitiies
        ){
        res.status(400)
        return
    }


    const rental2={
        
              customerId: customerId,
              gameId: gameId,
              rentDate: dayjs().format("YYYY-MM-DD"),
              daysRented: daysRented,
              returnDate: null, 
              originalPrice: gameExists.rows[0].pricePerDay*daysRented,
              delayFee: null
          
    }


    res.locals.rental2 = rental2

    next()

} 