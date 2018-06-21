var express = require('express');
var router = express.Router();

const { GetUser, GetUsers, CreateUser, UpdateUser, DeleteUser } = require('./controller');

router.get('/list', GetUsers);
router.get('/:id', GetUser);
router.put('/', CreateUser);
router.post('/:id', UpdateUser);
router.delete('/:id', DeleteUser);

module.exports = router;