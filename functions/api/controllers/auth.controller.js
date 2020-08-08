const axios = require('axios');
const functions = require('firebase-functions');
const { signature } = require('../utils/signature');
const { ACCOUNT_URL } = require('../constants/urls');
const { postData } = require('../utils/sendwyre');
var fs = require('fs');

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
                    },
                    {
                        fieldId: "individualCellphoneNumber",
                        value: req.body.phonenumber
                    },
                    {
                        fieldId: "individualDateOfBirth",
                        value: req.body.dob
                    },
                    {
                        fieldId: "individualSsn",
                        value: req.body.ssn
                    }
                ]
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
            res.json(response.data);

        } catch (error) {
            console.log("this is erorr");
            next(error)
        }
    }

    async uploadData(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}/${req.params.field_id}?masqueradeAs=${req.params.user_id}&timestamp=${timestamp}`;
            const headers = {};
            const file = req.files[0];
            const extension = file.originalname.split('.').pop();
            if(extension == 'pdf') headers['Content-Type'] = 'applicatin/pdf';
            else if(extension == 'jpeg' || extension == 'JPEG') headers['Content-Type'] = 'image/jpeg';
            else if (extension == 'png' || extension == 'PNG') headers['Content-Type'] = 'image/png';
            else if (extension == 'doc' || extension == 'DOC') headers['Content-Type'] = 'application/msword';
            else if (extension == 'docx' || extension == 'DOCX') headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            else {
                res.status(400).send('type is not matched');
                return;
            }


            // let paulo = fs.readFileSync('/Volumes/Work/paulo.jpeg');
            const qr = { masqueradeAs: req.params.user_id };
            const options = {
                qs: qr,
                headers: headers
            }
            postData(`${ACCOUNT_URL}/${req.params.user_id}/${req.params.field_id}`, file.buffer, options)
                .then(data => {
                    console.log("success", data);
                    res.send(JSON.parse(data));
                },
                err => {
                    console.log("error", JSON.parse(err));
                    res.send(err);
                });

        } catch (error) {
            console.log("error: ", error);
            next(error)
        }
    }

    async getAccount(req, res, next) {
        try {

            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}?masqueradeAs=${req.params.user_id}&timestamp=${timestamp}`;
            // if(functions.config().wyre.owner === req.params.user_id){
            //     fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}?&timestamp=${timestamp}`;
            // } else {
            //     fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}?masqueradeAs=${req.params.user_id}&timestamp=${timestamp}`;
            // }
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

    async updateAccount(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const fullUrl = `${functions.config().wyre.url}${ACCOUNT_URL}/${req.params.user_id}?masqueradeAs=${req.params.user_id}&timestamp=${timestamp}`;
            const headers = {};
            let profilefield = [];
            if (req.body.name)
                profilefield.push({
                    fieldId: "individualLegalName",
                    value: req.body.name
                });
            if (req.body.phonenumber)
                profilefield.push({
                    fieldId: "individualCellphoneNumber",
                    value: req.body.phonenumber
                });
            if (req.body.email)
                profilefield.push({
                    fieldId: "individualEmail",
                    value: req.body.email
                });
            if (req.body.dob)
                profilefield.push({
                    fieldId: "individualDateOfBirth",
                    value: req.body.dob
                });
            if (req.body.ssn)
                profilefield.push({
                    fieldId: "individualSsn",
                    value: req.body.ssn
                });
            if (req.body.street1 || req.body.street2 || req.body.city || req.body.state || req.body.postalCode || req.body.country) {
                profilefield.push({
                    fieldId: "individualResidenceAddress",
                    value: {
                        street1: req.body.street1,
                        street2: req.body.street2,
                        city: req.body.city,
                        state: req.body.state,
                        postalCode: req.body.postalCode,
                        country: req.body.country
                    }
                });
            }
            const body = {
                type: 'INDIVIDUAL',
                country: 'US',
                subaccount: true,
                profileFields: profilefield
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