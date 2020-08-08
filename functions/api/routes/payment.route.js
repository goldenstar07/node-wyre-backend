const express = require('express');
const router = express.Router();
const { paymentController } = require('../controllers');

router.route('/each/:account_id')
	.post(paymentController.createPayment);

router.route('/:account_id')
    .get(paymentController.listPayment);

router.route('/:payment_id/:account_id')
	.delete(paymentController.deletePayment)
	.get(paymentController.getPayment);

router.route('/attach/:payment_id/:account_id')
	.put(paymentController.attachBlockChain);

module.exports = { paymentRoute: router }