const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
     }
     const userData = await User.findOne({email}).lean().select("_id name email");
     if(userData){
      return res.status(200).json({ message: 'User already exist. Please try with different email' });
     }
    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // In a real-world app, you should hash the password before saving
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean().select("_id name image email createdAt");
    if(users.length==0){
        return res.status(404).json({message:"No Record Found"});
    }
   return res.status(200).json({ message: 'User Listing', data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getUserDetail = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.body.user._id}).select("_id name email image createdAt");
    if(!user){
        return res.status(404).json({message:"No Record Found"});
    }
   return res.status(200).json({ message: 'User Detail', data: user });
  } catch (error) {
    console.error('Error fetching user detail:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// edit user detail
const editUserDetail = async (req, res) => {
  try {
    let body=req.body;
    const user = await User.findOneAndUpdate({_id:req.body.user._id},{...body},{new:true});
    if(!user){
        return res.status(404).json({message:"No Record Found"});
    }
   return res.status(200).json({ message: 'Updated Successfully', data: user });
  } catch (error) {
    console.error('Error in updating user detail:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({_id:req.body.user._id});
    if(!user){
        return res.status(404).json({message:"No Record Found"});
    }
   return res.status(200).json({ message: 'User Deleted Successfully' });
  } catch (error) {
    console.error('Error in deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// upload image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Save file path to the database
    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { image: req.file.path },
      { new: true }
    );
   
    return res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed', details: err });
  }
};
module.exports = {
  createUser,
  getUsers,
  loginUser,
  getUserDetail,
  editUserDetail,
  deleteUser,
  uploadImage
};
