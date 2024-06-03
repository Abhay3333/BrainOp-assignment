const {Post} = require('../models/post.model');
const {User} = require('../models/user.model');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'firstName lastName profileImage email');
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
      }
}

const createPost = async(req,res)=>{
    const { title, desc, thumbnail, author } = req.body;

  // Validate request body
  if (!title || !desc || !author) {
    return res.status(400).json({ message: 'Title, description, and author are required' });
  }

  try {
    // Ensure the author exists
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Create a new post
    const post = new Post({
      title,
      desc,
      thumbnail,
      author
    });

    // Save the post to the database
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
}

const getPostById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id).populate('author', 'firstName lastName profileImage email');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  }

module.exports = {getAllPosts, createPost, getPostById};