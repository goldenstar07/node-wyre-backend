const { authController } = require('./auth.controller');
const { paymentController } = require('./payment.controller');
const { transferController } = require('./transfer.controller');
const { walletController } = require('./wallet.controller');
module.exports = {
    authController,
    paymentController,
    transferController,
    walletController
}