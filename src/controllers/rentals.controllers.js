import { db } from "../database/database.connection";


export async function getRentals(req, res){

    try{

        const rental = await db


    }
    catch(err){
        res.status(500).send(err.message)
    }



}

