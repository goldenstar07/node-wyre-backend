const express = require('express');
const router = express.Router();
const { paymentController } = require('../controllers');

router.route('/')
	.post(paymentController.createPayment);

router.route('/:account_id')
    .get(paymentController.listPayment);

router.route('/:payment_id')
	.delete(paymentController.deletePayment)
	.get(paymentController.getPayment);

router.route('/attach/:payment_id')
	.post(paymentController.attachBlockChain);

module.exports = { paymentRoute: router }