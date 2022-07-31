const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const LIBRARY = require("../models/librarySchema");
const User = require("../models/userSchema");

router.post("/addBookToLibrary", (req, res) => {
  const { bookName, AuthorName, bookCategory, bookclass, BookImage, BookPdf,bookSubject } =
    req.body;
    console.log(req.body);
  if (!bookName||!AuthorName||!bookCategory||!bookclass||!BookImage||!BookPdf||!bookSubject) {
    return res.sendStatus(201);
  }

  const Book = new LIBRARY({
    bookName,
    AuthorName,
    bookCategory,
    bookclass,
    BookImage,
    BookPdf,
    bookSubject
  });

  Book.save()
    .then(() => {
      res.status(200).json({ msg: "Book added Successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ msg: "Failed to Register" });
    });
});

router.get('/librarybooks', (req, res) => {
    LIBRARY.find({}).then((result) => {
        res.send(result)
    });
})

router.post("/addtolibrary", (req, res) => {
  const {
    BookId,
    UserId
  } = req.body;

const bookId = BookId
  User.findByIdAndUpdate(UserId, {
          $push:{MyLibrary:{BookId:bookId}}
      },
      function(err, docs) {
          if (err) {
              console.log("error occured" + err)
          } else {
              res.status(200).json({ msg: "Updated" })
              console.log("Book Added to Library");
          }
      })
})

module.exports = router;
