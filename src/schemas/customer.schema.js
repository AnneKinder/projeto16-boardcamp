import joi from 'joi'
import date from '@joi/date'

const Joi = joi.extend(date)

export const customerSchema = joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(10).max(11).required(),
        cpf: Joi.string().min(11).max(11).required(),
        birthday: Joi.date().format('YYYY-MM-DD').required()
})

