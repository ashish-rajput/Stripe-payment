const stripeToken = require('stripe')(process.env.PUBLIC_KEY);
const stripe = require('stripe')(process.env.SECRET_KEY);

const response = require('../services/response')

async function createToken (req, res) {
     const {number,exp_month,exp_year,cvc,cardHolderName} = {...req.body}
     try{
          stripeToken.tokens.create({
               card:{
                    number: number,
                    exp_month:exp_month,
                    exp_year:exp_year,
                    cvc:cvc,
                    name:cardHolderName
               }
          },function(err, token){
               if(err){
                    let msg = ""
                    console.log(err)
                    return response.validationResponse(err,res)
               }
               else{
                    return response.okResponse("Ok",res,token)
               }
          })
     } catch(error){
         console.log(error)
         return response.validationResponse(null,res)
     }
 };

async function pay (req,res) {

     const data = {...req.body}
     let message;

     if(!(data.stripeToken && data.price)){
          return response.validationResponse("Parameters missing",res)
     }

    const {stripeToken, price} = data
    const priceInPence = price ;

     const chargeData = getChargeData(priceInPence, stripeToken);

     stripe.charges.create(chargeData).then(charge => {

          stripe.charges.capture(charge.id).then(result => {

               return response.okResponse("Payment successful",res,result)

          })

          .catch(err => {
               return response.validationResponse(err,res)
          })
     }).catch(error => {

                    switch (error.type) {
                         case 'StripeCardError':
                           // A declined card error
                           message="Your card's expiration year is invalid."
                           break;
                         case 'StripeInvalidRequestError':
                           message=" Invalid parameters were supplied to Stripe's API"
                           break;
                         case 'StripeAPIError':
                           message="An error occurred internally with Stripe's API"
                           break;
                         case 'StripeConnectionError':
                           message="Some kind of error occurred during the HTTPS communication"
                           break;
                         case 'StripeAuthenticationError':
                           message="You probably used an incorrect API key"
                           break;
                         case 'StripeRateLimitError':
                           message="Too many requests hit the API too quickly"
                           break;
                       }

          // do something in error here
          return response.validationResponse(message,res)

     });
}

function getChargeData (amount, stripeToken) {
     const amountInPence = amount * 100;
     return {
          amount: amountInPence,
          currency: 'usd',
          source: stripeToken,
          capture: false
     }
}

async function createProduct (req,res) {
     try{
          stripe.products.create(
               {name: 'Gold Special'},
               function( product,err) {
                 // asynchronously called
                 if(err){
                      return response.validationResponse(err,res)
                 }
                 console.log(product)
                 return response.okResponse("Product has been added",res, product)
               }
             );
     }
     catch(error){
          console.log(error)
          return response.validationResponse(null,res)
     }
}

 module.exports= {
     createToken,
     pay,
     createProduct,
 }