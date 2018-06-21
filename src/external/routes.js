var express = require('express');
var router = express.Router();

const { Recommend, GetRoutes } = require('./controller');

router.post('/recommend', Recommend);
router.post('/routes', GetRoutes);

module.exports = router;