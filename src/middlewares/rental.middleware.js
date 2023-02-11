import { rentalSchema } from "../schemas/rental.schema.js";
import { db } from "../database/database.connection.js";

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

    const currentCustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId])
    const currentGame = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])
    const date = new Date()

  const currentDate = date.toISOString().split('T')[0]

    const rental2={
        
              customerId: customerId,
              gameId: gameId,
              rentDate: currentDate,
              daysRented: daysRented,
              returnDate: null, 
              originalPrice: currentGame.rows[0].pricePerDay*daysRented,
              delayFee: null
          
    }


    res.locals.rental2 = rental2

    next()

} 