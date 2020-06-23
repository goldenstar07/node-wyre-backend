const { authController } = require('./auth.controller');
const { paymentController } = require('./payment.controller');
const { transferController } = require('./transfer.controller');

module.exports = {
    authController,
    paymentController,
    transferController
}