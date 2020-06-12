const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const app = express();
const URL = 'https://api.testwyre.com';
const key = 'AK-DP87RF9M-HXL9HRL6-HJBB36TP-TXJFAPMT';
const secret = 'SK-363QJB7U-GP6LQRBT-VQFPP7BG-87PD9YHQ';

app.use(cors({ origin: true }));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/create', (req, res) => {
  //salt - Math.abs(CryptoJS.lib.WordArray.random(12).words[0]);
  let timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
  let uri = '/v3/accounts';
  let fullUri = `${URL}${uri}?timestamp=${timestamp}`;
  let body = '';
  body = {
    type: 'INDIVIDUAL',
    country: 'US',
    subaccount: true,
    profileFields:[
      {
        "fieldId": "individualLegalName",
        "value": req.body.name.toString()
      },
      {
        "fieldId": "individualEmail",
        "value": req.body.email.toString()
      },
      {
        "fieldId": "individualResidenceAddress",
        "value": {
          "street1": req.body.street1.toString(),
          "street2": req.body.street2.toString(),
          "city": req.body.city.toString(),
          "state": req.body.state.toString(),
          "postalCode": req.body.zip.toString(),
          "country": req.body.country.toString()
        }
      }
    ]
  } 
  let details = JSON.stringify(body);
  let to_sign = fullUri + details;
  let signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret));
  console.log(signature);
  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
  console.log(signature);
  let headers = {};
  headers['Content-Type'] = 'application/json';
  headers['X-Api-Key'] = key;
  headers['X-Api-Signature'] = signature;

  const config = {
      method: "POST",
      url: fullUri,
      headers: headers,
      data: details
    }  
  axios(config).then(response => {
      if (response.data){
        res.send(response.data);
      }
    }).catch((error) =>{
      if (error.response) {
        res.send(error.response.data);
      } else if (error.request) {
        res.send(error.request);
      } else {
        res.send(error.message);
      }
      console.log("78",error.config);
    });
});
  
exports.wyre = functions.https.onRequest(app);
