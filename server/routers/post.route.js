const express = require('express');
const router = express.Router();

const {getAllPosts, createPost, getPostById} = require('../controllers/post.controller');
const authenticateUser = require('../middleware/auth.middleware');

router.get('/getAll', getAllPosts);
router.post('/create', authenticateUser, createPost);
router.get('/get/:id', getPostById);

module.exports = router;

