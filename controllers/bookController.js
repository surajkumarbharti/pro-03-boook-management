const { default: mongoose } = require('mongoose');
const bookModel = require('../models/bookModel');
const validator = require("../validator/validator.js");
const userModel = require("../models/userModel")



const isValidDetails = function(book)
{
    if(typeof book === 'undefined' || book === null){
        return false
    }
    if(typeof book === 'string' && value.trim().length == 0){
        return false
    }
    return true

}

const createBook = async function (req, res) {
    try {
      const book = req.body;
  
      if (!validator.isValidDetails(book)) {
        res
          .status(400)
          .send({ status: false, msg: "Please provide the Book details" }); //Validate the value that is provided by the Client.
      }
  
      const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = book;
        
  
      if (!validator.isValidValue(userId)) {
        return res.status(403).send({    /////status 403 unauthorize
          status: false,
          message: "Unauthorized access.",
        });
      }
  
      if (!validator.isValidValue(title)) {
        return res
          .status(400)    ///// status 400 for bad request
          .send({ status: false, msg: "Please provide the Title" }); //Title is Mandory
      }
  
      const isDuplicateTitle = await bookModel.findOne({ title: title });
      if (isDuplicateTitle) {
        return res
          .status(400)
          .send({ status: true, msg: "Title already exists." }); //Title is Unique
      }
  
      if (!validator.isValidValue(excerpt)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide the excerpt" }); //Excerpt is Mandory
      }
  
      const isValidUserId = await userModel.findById(userId);
  
      if (!isValidUserId) {
        return res.status(404).send({ status: true, msg: "User not found." }); //find User in userModel
      }
  
      if (!validator.isValidValue(ISBN)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide the ISBN" }); //ISBN is mandory
      }
  
      const isDuplicateISBN = await bookModel.findOne({ ISBN: ISBN });
      if (isDuplicateISBN) {
        return res
          .status(400)
          .send({ status: true, msg: "ISBN already exists." }); //ISBN is unique
      }
  
      if (!validator.isValidValue(category)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide the Category" }); //Category must be present
      }
  
      if (!validator.isValidValue(subcategory)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide the subCategory" }); //subcategory must be present
      }
  
      if (!validator.isValidValue(releasedAt)) {
        return res.status(400).send({
          status: false,
          msg: "Please provide the release date of book.",
        }); //release date is mandory
      }
  
      if (!/^\d{4}-\d{2}-\d{2}$/.test(releasedAt)) {
        //regex for checking the correct format of release date
        return res.status(400).send({
          status: false,
          msg: `${releasedAt} is an invalid date, formate should be like this YYYY-MM-DD`,
        });
      }
  
      const saved = await bookModel.create(book); //creating the Book details
      res.status(201).send({
        status: true,
        msg: "Book created and saved successfully.",
        data: saved,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err.message });  /// status 500 for internal server error
    }
  };

  module.exports.createBook = createBook 