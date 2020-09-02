const axios = require('axios');
const functions = require('firebase-functions');
const { signature } = require('../utils/signature');
const { PAYMENTMETHOD_URL, PAYMENTMETHODS_URL } = require('../constants/urls');


class PaymentController {
    async createPayment(req, res, next) {
        console.log(req.body)
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${PAYMENTMETHODS_URL}?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                owner: req.body.owner,
                paymentMethodType: "INTERNATIONAL_TRANSFER",
                paymentType: "LOCAL_BANK_WIRE",
                currency: "USD",
                country: "US",
                beneficiaryType: "CORPORATE",
                beneficiaryCompanyName: req.body.companyName,
                beneficiaryEinTin: req.body.ein,
                beneficiaryLandlineNumber: req.body.phone,
                beneficiaryEmailAddress: req.body.email,
                accountNumber: req.body.accountNumber,
                routingNumber: req.body.routingNumber,
                accountType: req.body.accountType,
                chargeablePM: false
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

    async deletePayment(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${PAYMENTMETHOD_URL}/${req.params.payment_id}?timestamp=${timestamp}`;
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

    async listPayment(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${PAYMENTMETHODS_URL}?timestamp=${timestamp}`;
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

    async getPayment(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${PAYMENTMETHOD_URL}/${req.params.payment_id}?timestamp=${timestamp}`;
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

    async attachBlockChain(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${PAYMENTMETHOD_URL}/${req.params.payment_id}/attach?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                blockchain: "ALL",
                notify: null,
                muteMessages: true
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
    paymentController: new PaymentController()
}