const express = require('express');
const router = express.Router();
const { walletController } = require('../controllers');

router.route('/')
	.post(walletController.createWallet)
	.get(walletController.listWallets);

router.route('/:wallet_id')
	.get(walletController.getWalletbyID)
	.put(walletController.updateWalletbyID)
	.delete(walletController.removeWalletbyID);

router.route('orders/reserve/:account_id')
	.post(walletController.ordersReserveID);

router.route('orders/:order_id/:account_id')
	.get(walletController.getOrdersReserve);

router.route('debitcard/auth/:order_id/:account_id')
	.get(walletController.debitcardAuthByOrder);

router.route('debitcard/auth/partner/:account_id')
	.post(walletController.debitcardAuthPartner);

router.route('orders/quote/partner/:account_id')
	.post(walletController.orderQuote);

router.route('widget/limits/calculate/:account_id')
	.post(walletController.limitsCalc);

module.exports = { walletRoute: router }