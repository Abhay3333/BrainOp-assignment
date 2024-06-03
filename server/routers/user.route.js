const express = require('express');
const router = express.Router();

const {register,login,getUser,getUserById,updateUserById,deleteUserById} = require('../controllers/user.controller');
const authenticateUser = require('../middleware/auth.middleware');

router.post('/register',register);
router.post('/login',login);
router.get('/users',getUser);
router.get('/users/:id',authenticateUser,getUserById);
router.put('/users/:id',authenticateUser,updateUserById);
router.delete('/users/:id',authenticateUser,deleteUserById);

module.exports = router;