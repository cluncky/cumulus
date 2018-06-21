var express = require('express');
var router = express.Router();

const { InitDB } = require('./controller');

router.post('/init-db', InitDB);

module.exports = router;