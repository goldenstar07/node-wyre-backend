const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const app = express();
app.use(cors({ origin: true }));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/trade', (req, res) => {
  let apiKey = req.body.key.toString();
  let apiSecret = req.body.secret.toString();
  let uri = "https://api.bittrex.com/v3/orders";
  let method = "POST"
  let coin = req.body.coin.toString(); //DGB-USD || BTC-USD
  let content = `{"marketSymbol": "${coin}","direction": "sell","type": "MARKET","quantity": ${req.body.amount.toString()},"timeInForce": "FILL_OR_KILL"}`;
  let timestamp = req.body.timestamp;
  let contentHash = CryptoJS.SHA512(content).toString(CryptoJS.enc.Hex);
  let preSign = [timestamp,uri,method.toUpperCase(), contentHash].join('');
  let signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(CryptoJS.enc.Hex);
  let headers = {};
  headers['Api-Timestamp'] = timestamp;
  headers['Api-Key'] = apiKey;
  headers['Accept'] = 'application/json';
  headers['Application-Id'] = 223;
  headers['Content-Type'] = 'application/json';
  headers['Api-Signature'] = signature;
  headers['Api-Content-Hash'] = contentHash;

  const config = {
      method: method,
      url: uri,
      headers: headers,
      data: content
    }
  axios(config).then(response => {
    console.log(response.data);
      if (response.data){
        res.send(response.data);
      }else{
        res.end();
      }
    })
    .catch(error => {console.log(error);
    });
});

app.post('/balance', (req, res) => {
  let apiKey = req.body.key.toString();
  let apiSecret = req.body.secret.toString();
  let coin = req.body.coin.toString();
  let uri = "https://api.bittrex.com/v3/balances/" + coin; //dgb || btc
  let method = "GET"
  let content = '';
  let timestamp = new Date().getTime();
  let contentHash = CryptoJS.SHA512(content).toString(CryptoJS.enc.Hex);
  let preSign = [timestamp,uri,method.toUpperCase(), contentHash].join('');
  let signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(CryptoJS.enc.Hex);
  let headers = {};
  headers['Api-Timestamp'] = timestamp;
  headers['Api-Key'] = apiKey;
  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';
  headers['Api-Signature'] = signature;
  headers['Api-Content-Hash'] = contentHash;

  const config = {
      method: method,
      url: uri,
      headers: headers
    }
  axios(config).then(response => {
    console.log(response.data);
      if (response.data){
        res.send(response.data);
      }else{
        res.end();
      }
    })
    .catch(error => {console.log(error);
    });
});

app.post('/deposit', (req, res) => {
  let apiKey = req.body.key.toString();
  let apiSecret = req.body.secret.toString();
  let uri = "https://api.bittrex.com/v3/deposits/open";
  let method = "GET"
  let content = '';
  let timestamp = new Date().getTime();
  let contentHash = CryptoJS.SHA512(content).toString(CryptoJS.enc.Hex);
  let preSign = [timestamp,uri,method.toUpperCase(), contentHash].join('');
  let signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(CryptoJS.enc.Hex);
  let headers = {};
  headers['Api-Timestamp'] = timestamp;
  headers['Api-Key'] = apiKey;
  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';
  headers['Api-Signature'] = signature;
  headers['Api-Content-Hash'] = contentHash;

  const config = {
      method: method,
      url: uri,
      headers: headers
    }
  axios(config).then(response => {
    console.log(response.data);
      if (response.data){
        res.send(response.data);
      }else{
        res.end();
      }
    })
    .catch(error => {console.log(error);
    });
});

app.post('/address', (req, res) => {
  let apiKey = req.body.key.toString();
  let apiSecret = req.body.secret.toString();
  let coin = req.body.coin.toString();
  let uri = "https://api.bittrex.com/v3/addresses";
  let method = "POST"
  let content = `{"currencySymbol": "${coin}"}`;
  let timestamp = new Date().getTime();
  let contentHash = CryptoJS.SHA512(content).toString(CryptoJS.enc.Hex);
  let preSign = [timestamp,uri,method.toUpperCase(), contentHash].join('');
  let signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(CryptoJS.enc.Hex);
  let headers = {};
  headers['Api-Timestamp'] = timestamp;
  headers['Api-Key'] = apiKey;
  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';
  headers['Api-Signature'] = signature;
  headers['Api-Content-Hash'] = contentHash;

  const config = {
      method: method,
      url: uri,
      headers: headers,
      data: content
    }
  axios(config).then(response => {
    console.log(response.data);
      if (response.data){
        res.send(response.data);
      }else{
        res.end();
      }
    })
    .catch(error => {res.send(error);
    });
});

app.post('/getaddress', (req, res) => {
  let apiKey = req.body.key.toString();
  let apiSecret = req.body.secret.toString();
  let coin = req.body.coin.toString();
  let uri = "https://api.bittrex.com/v3/addresses/" + coin;
  let method = "GET"
  let content = '';
  let timestamp = new Date().getTime();
  let contentHash = CryptoJS.SHA512(content).toString(CryptoJS.enc.Hex);
  let preSign = [timestamp,uri,method.toUpperCase(), contentHash].join('');
  let signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(CryptoJS.enc.Hex);
  let headers = {};
  headers['Api-Timestamp'] = timestamp;
  headers['Api-Key'] = apiKey;
  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';
  headers['Api-Signature'] = signature;
  headers['Api-Content-Hash'] = contentHash;

  const config = {
      method: method,
      url: uri,
      headers: headers,
    }
  axios(config).then(response => {
    console.log(response.data);
      if (response.data){
        res.send(response.data);
      }else{
        res.end();
      }
    })
    .catch(error => {res.send(error);
    });
});
  
exports.bittrex = functions.https.onRequest(app);
