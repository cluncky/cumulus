var express = require('express');
var router = express.Router();

const { Recommend } = require('./controller');

router.post('/', Recommend);

module.exports = router;