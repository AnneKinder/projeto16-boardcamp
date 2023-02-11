import { customerSchema } from "../schemas/customer.schema.js";
import { db } from "../database/database.connection.js";


export async function customerSchemaValidation (req, res, next){

    const customer = req.body

    const validation = customerSchema.validate(customer, {abortEarly: false})

    if (validation.error){
        const errors = validation.error.details.map((detail) => detail.message)
        res.status(400).send(errors)
        return
    }

    const cpfAlreadyExists = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [customer.cpf])


    if (cpfAlreadyExists.rowCount!==0){
        res.status(409).send("CPF already taken.")
        return
    }


    res.locals.customer = customer

    next()

}
