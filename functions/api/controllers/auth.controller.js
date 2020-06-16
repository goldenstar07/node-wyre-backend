const axios = require('axios');
const functions = require('firebase-functions');
const { signature } = require('../utils/signature');
const { ACCOUNT_URL } = require('../constants/urls');


class AuthController {
    async createAccount(req, res, next) {
        try {

            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                type: 'INDIVIDUAL',
                country: 'US',
                subaccount: true,
                profileFields:[
                    {
                        fieldId: "individualLegalName",
                        value: req.body.name
                    },
                    {
                        fieldId: "individualEmail",
                        value: req.body.email
                    },
                    {
                        fieldId: "individualResidenceAddress",
                        value: {
                        street1: req.body.street1,
                        street2: req.body.street2,
                        city: req.body.city,
                        state: req.body.state,
                        postalCode: req.body.postalCode,
                        country: req.body.country
                        }
                    }
                ]
            }
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

    async getAccount(req, res, next) {
        try {

            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}?timestamp=${timestamp}`;
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

    async updateAccount(req, res, next) {
        try {

            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                type: 'INDIVIDUAL',
                country: 'US',
                subaccount: true,
                profileFields:[
                    {
                        fieldId: "individualLegalName",
                        value: req.body.name
                    },
                    {
                        fieldId: "individualCellphoneNumber",
                        value: req.body.phonenumber
                    },
                    {
                        fieldId: "individualEmail",
                        value: req.body.email
                    },
                    {
                        fieldId: "individualDateOfBirth",
                        value: req.body.dob
                    },
                    {
                        fieldId: "individualResidenceAddress",
                        value: {
                            street1: req.body.street1,
                            street2: req.body.street2,
                            city: req.body.city,
                            state: req.body.state,
                            postalCode: req.body.postalCode,
                            country: req.body.country
                        }
                    }
                ]
            }
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
}

module.exports = {
    authController: new AuthController()
}