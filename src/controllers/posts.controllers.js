const Post = require('../models/posts.model');

// See all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({date: 'desc' });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// See a specific post
const getPostById = async (req, res) => {
  try {
    const postFound = await Post.find({ _id: req.params.id })
      .sort({ date: 'desc' })
      .limit(1);

    if (!postFound || postFound.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(postFound[0]);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { title, description, type, date } = req.body;
  
  try {
    const newPost = new Post({ title, description, type, date });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    console.error('Error saving post:', e);
    res.status(500).json({ error: 'Failed to create post' });
  }
};


// Delete a post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { title, description, type, date } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, type, date },
      { new: true } // Use { new: true } to return the updated post
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};
