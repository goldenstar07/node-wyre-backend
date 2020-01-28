const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const app = express();
const URL = 'https://sandboxapi.rapyd.net';
const key = '60043F6D3C676B824DF1';
const secret = '0f658c5917dbec956fb06a7cd21edb6f6b1518c7b8fd13bceb261d5d970922f57252fa267a036c33';

app.use(cors({ origin: true }));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/create', (req, res) => {
  let salt = Math.abs(CryptoJS.lib.WordArray.random(12).words[0]);
  let timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
  let uri = '/v1/user';
  let fullUri = `${URL}/v1/user`;
  let method = "post";
  let body = '';
  if(req.body.phone_number.toString() != '{}' && req.body.phone_number.toString() != ''){
    body = {
      first_name: req.body.first_name.toString(),
      last_name: req.body.last_name.toString(),
      phone_number: req.body.phone_number.toString(),
      email: req.body.email.toString(),
      type: req.body.type.toString(),
      business_details: {},
      metadata: {
        merchant_defined: true
      }
    } 
  }
  let details = JSON.stringify(body);
  let to_sign = method + uri + salt + timestamp + key + secret + details;
  let signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret));
  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
  let headers = {};
  headers['access_key'] = key;
  headers['Content-Type'] = 'application/json';
  headers['salt'] = salt;
  headers['signature'] = signature;
  headers['timestamp'] = timestamp;

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
    }).catch(function (error) {
      if (error.response) {
        res.send(error.response, error.response.data);
      } else if (error.request) {
        res.send(error.request);
      } else {
        res.send(error.message);
      }
      console.log("78",error.config);
    });
});
  
exports.rapyd = functions.https.onRequest(app);
