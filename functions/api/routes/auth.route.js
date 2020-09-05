const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { filesUpload } = require('../middleware/fileupload');

router.route('/')
    .post(authController.createAccount);

router.route('/upload/:paymentMethodId')
    .post(filesUpload , authController.uploadData);

router.route('/:user_id')
    .get(authController.getAccount)
    .put(authController.updateAccount);

module.exports = { authRoute: router }