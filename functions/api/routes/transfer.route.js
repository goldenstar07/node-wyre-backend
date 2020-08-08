const express = require('express');
const router = express.Router();
const { transferController } = require('../controllers');

router.route('/:account_id')
    .post(transferController.createTransfer)
    .get(transferController.historyTransfer);

router.route('/confirm/:transfer_id/:account_id')
	.post(transferController.confirmTransfer);

router.route('/:transfer_id/:account_id')
	.get(transferController.getTransfer);

router.route('/rates/:as')
	.get(transferController.getRates);

module.exports = { transferRoute: router }