const express = require('express');
const { signUp, login, signText, loginText } = require('../controller/auth.controller');
const { validateSignUp, validateLogin } = require('../middleware/validation.middleware');
const router = express.Router();


router.post('/signUpOne',validateSignUp, signUp);
router.post('/loginOne', validateLogin, login );

router.post('/signUpTwo', validateSignUp, signText);
router.post('/loginTwo',validateLogin, loginText);

module.exports = router;    