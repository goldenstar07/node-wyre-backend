const express = require('express');
const router = express.Router();

const { authRoute, paymentRoute, transferRoute, walletRoute } = require('./routes');

router.use('/account', authRoute);
router.use('/payment', paymentRoute);
router.use('/transfer', transferRoute);
router.use('/wallet', walletRoute);
module.exports = {
    apiRouter: router
};