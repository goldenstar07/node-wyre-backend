const CryptoJS = require('crypto-js');
const functions = require('firebase-functions');

const signature = (url, data) => {
    const signData = url + data;
    const signatureToken = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(signData.toString(CryptoJS.enc.Utf8), functions.config().wyre.sec));
    return signatureToken;
}

module.exports = { signature }