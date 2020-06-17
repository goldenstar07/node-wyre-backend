const express = require('express');
const router = express.Router();

const { authRoute } = require('./routes');

router.use('/account', authRoute);

module.exports = {
    apiRouter: router
};