const PAYMENT = require('../controllers/payment.controller');


const router =  require('express').Router();

router.post('/create-token',PAYMENT.createToken);

router.post('/pay',PAYMENT.pay);

router.post('/createProduct',PAYMENT.createProduct);

module.exports = router;
