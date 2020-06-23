const axios = require('axios');
const functions = require('firebase-functions');
const { signature } = require('../utils/signature');
const { TRANSFERS_URL, RATES_URL } = require('../constants/urls');


class transferController {
    async createTransfer(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${TRANSFERS_URL}?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                source: "account:" + req.body.accountId,
                sourceAmount: req.body.sourceAmount,
                sourceCurrency: req.body.sourceCurrency,
                dest: req.body.dest,
                destCurrency: req.body.destCurrency,
                message: req.body.message ? req.body.message : "",
                autoConfirm: req.body.autoConfirm ? req.body.autoConfirm : false
                // destAmount: req.body.destAmount ? req.body.destAmount : null,
                // notifyUrl: req.body.notifyUrl ? req.body.notifyUrl : "",
                // customId: req.body.customId ? req.body.customId : "",
                // amountIncludesFees: req.body.amountIncludesFees ? req.body.amountIncludesFees : false,
                // preview: req.body.preview ? req.body.preview : false,
                // muteMessages: req.body.muteMessages ? req.body.muteMessages : false
            };

            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.api_key;
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

    async historyTransfer(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${TRANSFERS_URL}?timestamp=${timestamp}`;
                const headers = {};
                const details = "";
                headers['Content-Type'] = 'application/json';
                headers['X-Api-Key'] = functions.config().wyre.api_key;
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

    async confirmTransfer(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${TRANSFERS_URL}/${req.params.transfer_id}/confirm?timestamp=${timestamp}`;
                const headers = {};
                const details = "";
                headers['Content-Type'] = 'application/json';
                headers['X-Api-Key'] = functions.config().wyre.api_key;
                headers['X-Api-Signature'] = signature(fullUrl, details);

                const config = {
                    method: "POST",
                    url: fullUrl,
                    headers: headers,
                }
                const response = await axios(config);
                res.send(response.data);
            } catch (error) {
                next(error)
            }
    }

    async getTransfer(req, res, next) {
        try {
                const timestamp = new Date().getTime();
                const fullUrl = `${functions.config().wyre.url}${TRANSFERS_URL}/${req.params.transfer_id}?timestamp=${timestamp}`;
                const headers = {};
                const details = "";
                headers['Content-Type'] = 'application/json';
                headers['X-Api-Key'] = functions.config().wyre.api_key;
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

    async getRates(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${RATES_URL}?as=${req.params.as}&timestamp=${timestamp}`;
            const headers = {};
            const body = {
                blockchain: req.body.blockchain ? req.body.blockchain : "BTC",
                notify: req.body.notify ? req.body.notify : null,
                muteMessages: req.body.muteMessages ? req.body.muteMessages : false
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = functions.config().wyre.api_key;
            headers['X-Api-Signature'] = signature(fullUrl, details);

            const config = {
                method: "GET",
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
    transferController: new transferController()
}