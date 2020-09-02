const { authRoute } = require('./auth.route');
const { paymentRoute } = require('./payment.route');
const { transferRoute } = require('./transfer.route');
const { walletRoute } = require('./wallet.route');
module.exports = {
    authRoute,
    paymentRoute,
    transferRoute,
    walletRoute
}