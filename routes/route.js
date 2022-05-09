const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController.js");
const userController = require("../controllers/userController")




router.post("/createbooks", bookController.createBook); // CreateBook
router.post("/createuser", userController.createUser);


module.exports=router;