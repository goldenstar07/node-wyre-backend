const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.route('/')
    .post(authController.createAccount);
router.route('/:user_id')
    .get(authController.getAccount)
    .put(authController.updateAccount);

module.exports = { authRoute: router }