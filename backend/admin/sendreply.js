const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const sendReplyMsg = require("../utils/sendReplyMsg")
dotenv.config();

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);
router.post("/sendReply", (req, res) => {
    try {
        const { name, mail, subject, body } = req.body;
        sendReplyMsg(mail, name, subject, body).then(() => {
            res.status(201).json({ msg: "mail sent Succesfully" })
        }).catch((err) => {
            res.status(400).json({ msg: "error occured" })
        })

    } catch (error) {
        console.log(error);
    }
})