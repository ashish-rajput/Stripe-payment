// const express = require('express');
// const http = require('http');
// const cors = require('cors');

// fs = require('fs');

// const stripe = require('stripe')('sk_test_iRiG4hHNDVdL9MSqvFb0wozR000JM7nKuR');

// create = function() {
//     const stripeToken = "tok_1GrfCoHsLoSCVNDb9HXrFKbt";
//     const price = 1;
//     const priceInPence = price * 10;

// const chargeData = getChargeData(priceInPence, stripeToken);
//   stripe.charges.create(chargeData).then(charge => {
//         fs.writeFile('chargeData.json', JSON.stringify(charge),  (err,data) => {
//           if (err) {
//             return console.log('writeFile err',err);
//           }
//           console.log('writeFile chargeData',data);
//         });

//         console.log('chargeData', charge)
//         stripe.charges.capture(charge.id)
//         .then(res => {
//           console.log(' stripe.charges captured ',res)
//           fs.writeFile('chargeCapture.json', JSON.stringify(charge),  (err,data) => {
//             if (err) {
//               return console.log('writeFile err',err);
//             }
//             console.log('writeFile chargeData',data);
//           });
//         })
//         .catch(err => {
//           console.error(' stripe.charges captured error ',res);
//         })
//       }).catch(error => {
//         // do something in error here
//         console.log(error)
//       });

//  };



//  function createOrder(charge){
//   console.log('createOrder Initializing.... ')
//     stripe.orders.create(
//         charge,
//         function(err, order) {
//             if(order){
//               console.log('order', order)
//             fs.writeFile('makeOrderCreation.json', JSON.stringify(order), (err,data) => {
//              if (err) {
//                return console.log('writeFile err makeOrderCreation ',err);
//              }
//              console.log('writeFile makeOrderCreation ',data);
//          })
//             console.log('makeOrderCreation', order)
//             stripe.charges.capture(charge.id)
//                .then(res => res)
//                .catch(err => err)
//         }
//         if(err){
//           console.log('createOrder err ',err)
//         }
//         }
//       );
// }

//  function getChargeData (amount, stripeToken) {
//     const amountInPence = amount * 100;
//     return {
//        amount: amountInPence,
//        currency: 'usd',
//        source: stripeToken,
//        capture: false
//     }
//  }

//  exports.createCharge = function (amount, stripeToken) {
//    const chargeData = getChargeData(amount, stripeToken);
//    return stripe.charges.create(chargeData)
//       .then(res => res)
//       .catch(err => err)
// };

//  const app = express();

//  const server = http.createServer(app);

//  server.listen(8090);

//  server.on('error',(err) => console.error(err));

//  console.log('Server Started')

//  server.on('listening',() => console.log(`Server running `));

//  create();