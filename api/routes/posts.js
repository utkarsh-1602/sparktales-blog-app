require('dotenv').config();
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer();
let streamifier = require('streamifier');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  api_url:process.env.CLOUDINARY_URL
});

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const public_id = post.photo_publicId;
        // Delete image from Cloudinary
        cloudinary.uploader.destroy(public_id, function(error,result) {
          console.log("Deleted from cloudinary : ", result, error);
        });
 
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    }
    else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/uploadImage', upload.single('file'), async (req, res) => {
  try {
    const imagePath = req.file.buffer;
    // Using cloudinary.uploader.upload_stream
    const uploadStream = cloudinary.uploader.upload_stream(
      function(error, result) {
        if (error) {
          console.error('Error uploading image to Cloudinary:', error);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
          console.log('Cloudinary Upload Result:', result);
          res.status(200).json({ success: true, result });
        }
      }
    );
    
    streamifier.createReadStream(imagePath).pipe(uploadStream);
    // res.status(200).json({ success: true, uploadStream });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;

