import { db } from '../database/database.connection.js'

export async function getCustomers(req, res) {

    try {

        const customers = await db.query(`SELECT * FROM customers`)
        res.send(customers.rows)

    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`,[id])
        res.send(customer.rows[0])
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomer(req, res){

    const newCustomer = res.locals.customer
    const {name, phone, cpf, birthday} = newCustomer

    try{
        const customer = db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
        res.status(201).send(customer.rows)

    }
    catch(err){
        res.status(500).send(err.message)
    }
}

export async function updateCustomer(req,res){

    const updatedCustomer = req.body
    const {id, name, phone, cpf, birthday} = updatedCustomer

    try{

        const customer = await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday,id])
        res.status(200).send(customer.rows)

    }
    catch(err){
        res.status(500).send(err.message)
    }
}