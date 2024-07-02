const express = require("express");
const authMiddleware = require("../authMiddleware/authMiddleware");
const { getLinks, updateLinks, deleteLink } = require("../controllers/links");

const Router = express.Router();

Router.get('/', authMiddleware, getLinks);

Router.patch('/', authMiddleware, updateLinks);

Router.delete('/:id', authMiddleware, deleteLink);

module.exports = Router;