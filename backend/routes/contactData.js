const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();

const ContactQueries = require('../models/contactJSchema');

router.get("/contactResult", (req, res) => {

    ContactQueries.find({}).then((result) => {

        res.send(result)
    })
})

module.exports = router;