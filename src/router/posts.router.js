const express = require('express');
const router = express.Router();

const {
    getAllPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost,
} = require('../controllers/posts.controllers');

router.get('/my', (req, res) => {
    res.send('Hello World!');
})
// posts
router.get('/', getAllPosts);

router.get('/post/:id', getPostById);

router.post('/create/', createPost);

router.put('/update/:id', updatePost);

router.delete('/delete/:id', deletePost);

// Exports
module.exports = router;
