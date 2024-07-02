const express = require("express");
const {createUser, loginUser, logoutUser, getUserProfile, updateUserProfile, getPublicProfile } = require("../controllers/user");
const authMiddleware = require("../authMiddleware/authMiddleware");
const Router = express.Router();

Router.post('/register', createUser);

Router.post('/login', loginUser);

Router.get('/profile', authMiddleware, getUserProfile);

Router.patch('/profile', authMiddleware, updateUserProfile);

Router.get('/profile/:id', getPublicProfile);

Router.post('/logout', authMiddleware, logoutUser);

module.exports = Router;