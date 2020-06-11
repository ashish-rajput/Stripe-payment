const { Schema, Types, model} = require ('mongoose')

const planSchema = new Schema ({

    name : { type: String, required: true},

    detail : { type: String, required: true},

    amount : Number,

    currency : { type: String, required:true},

    currency_symbol : { type: String, required:true}


}, {timestamps:true});




const PLANS = model('plans', planSchema, 'plans');
module.exports = PLANS;