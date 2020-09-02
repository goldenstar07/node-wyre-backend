const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { filesUpload } = require('../middleware/fileupload');

router.route('/')
    .post(authController.createAccount);

router.route('/upload/:user_id/:field_id/:doc_type/:subType')
    .post(filesUpload , authController.uploadData);

router.route('/:user_id')
    .get(authController.getAccount)
    .put(authController.updateAccount);

module.exports = { authRoute: router }