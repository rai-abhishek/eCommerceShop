import asynchandler from "../middleware/ayncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register User
// @route   POST /api/register
// @access  Public
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookies
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asynchandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asynchandler(async (req, res) => {
  res.send("Update user Profile");
});

// @desc    get user
// @route   GET /api/users
// @access  Private / admin
const getUsers = asynchandler(async (req, res) => {
  res.send("get users");
});

// @desc    get user by id
// @route   GET /api/users/:id
// @access  Private / admin
const getUserByID = asynchandler(async (req, res) => {
  res.send("get user by ID");
});

// @desc    delete user
// @route   DELETE /api/users/:id
// @access  Private / admin
const deleteUsers = asynchandler(async (req, res) => {
  res.send("Delete users");
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private / admin
const updateUser = asynchandler(async (req, res) => {
  res.send("Update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUsers,
  updateUser,
};
