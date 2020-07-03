const express = require('express');
const router = express.Router();

const { authRoute, paymentRoute, transferRoute } = require('./routes');

router.use('/account', authRoute);
router.use('/payment', paymentRoute);
router.use('/transfer', transferRoute);
module.exports = {
    apiRouter: router
};