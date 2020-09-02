const axios = require('axios');
const functions = require('firebase-functions');
const { signature } = require('../utils/signature');
const { WALLETS_URL, WALLET_URL } = require('../constants/urls');


class WalletController {
    async createWallet(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${WALLETS_URL}?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                name: req.body.name,
                callbackURL: '',
                type: req.body.type,
                notes: functions.config().wyre.owner
            };

            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "POST",
                url: fullUrl,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }

    async getWalletbyID(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${WALLET_URL}/${req.params.wallet_id}?timestamp=${timestamp}`;
                const headers = {};
                const details = "";
                headers['Content-Type'] = 'application/json';
                headers['X-Api-Key'] = functions.config().wyre.key;
                headers['X-Api-Signature'] = signature(fullUrl, details);

                const config = {
                    method: "GET",
                    url: fullUrl,
                    headers: headers,
                }

                const response = await axios(config);
                res.send(response.data);

            } catch (error) {
                next(error)
            }
    }

    async updateWalletbyID(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${WALLET_URL}/${req.params.wallet_id}/update?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                name: req.body.name ? req.body.name : '',
                notes: req.body.notes ? req.body.notes : ''
            };

            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "POST",
                url: fullUrl,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }

    async removeWalletbyID(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${WALLET_URL}/${req.params.wallet_id}?timestamp=${timestamp}`;
            const headers = {};
            const details = "";
            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "DELETE",
                url: fullUrl,
                headers: headers,
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }

    async listWallets(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${WALLETS_URL}?limit=${req.body.limit}&offset=${req.body.offset}&timestamp=${timestamp}`;
            const headers = {};
            const details = "";

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "GET",
                url: fullUrl,
                headers: headers
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
// processing
    async limitsCalc(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}/v3/widget/limits/calculate?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                walletType: req.body.walletType,
                accountId: req.body.accountId,
                sourceCurrency: req.body.sourceCurrency,
                address: {
                    street1: req.body.address.street1,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    postalCode: req.body.address.postalCode,
                    country: req.body.address.country,
                }
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "POST",
                url: fullUrl,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }

    async ordersReserveID(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}/v3/widget/limits/calculate?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                amount: req.body.amount,
                sourceCurrency: req.body.sourceCurrency,
                destCurrency: req.body.destCurrency,
                dest: req.body.dest,
                firstName: req.body.firstName ? req.body.firstName : '',
                lastName: req.body.lastName ? req.body.lastName : '',
                phone: req.body.phone ? req.body.phone : '',
                email: req.body.email ? req.body.email : '',
                country: req.body.country ? req.body.country : '',
                postalCode: req.body.postalCode ? req.body.postalCode : '',
                state: req.body.state ? req.body.state : '',
                city: req.body.city ? req.body.city : '',
                street1: req.body.street1 ? req.body.street1 : '',
                lockFields: req.body.lockFields,
                redirectUrl: req.body.redirectUrl ? req.body.redirectUrl : '',
                failureRedirectUrl: req.body.failureRedirectUrl ? req.body.failureRedirectUrl : '',
                paymentMethod: req.body.paymentMethod ? req.body.paymentMethod : '',
                referrerAccountId: req.body.referrerAccountId
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "POST",
                url: fullUrl,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
// processing
    async orderQuote(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}/v3/orders/quote/partner?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                amount: req.body.amount,
                sourceCurrency: req.body.sourceCurrency,
                destCurrency: req.body.destCurrency,
                dest: req.body.dest,
                country: req.body.country,
                accountId: req.body.accountId,
                walletType: req.body.walletType
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "POST",
                url: fullUrl,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
// processing
    async getOrdersReserve(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}/v3/orders/${req.params.order_id}?timestamp=${timestamp}`;
            const headers = {};

            const details = "";

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "GET",
                url: fullUrl,
                headers: headers
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
// processing
    async debitcardAuthByOrder(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}/v3/debitcard/authorization/${req.params.order_id}?timestamp=${timestamp}`;
            const headers = {};

            const details = "";

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "GET",
                url: fullUrl,
                headers: headers
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
    // processing
    async debitcardAuthPartner(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}/v3/debitcard/authorize/partner?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                type: req.body.type,
                walletOrderId: req.body.walletOrderId,
                reservation: req.body.reservation,
                sms: req.body.sms,
                card2fa: req.body.card2fa,
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "POST",
                url: fullUrl,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    walletController: new WalletController()
}