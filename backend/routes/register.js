const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
router.use(express.json());
dotenv.config();
const User = require("../models/userSchema");

router.post("/register", (req, res) => {
    const { name, email, password, cpassword} = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.sendStatus(201);
    }

    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }
            const user = new User({ name, email, password, cpassword});
            user.save().then(() => {
                res.status(200).json({ msg: "Registration Successful" });
            }).catch((err) => {
                res.status(501).json({ msg: "Failed to Register" })
            })
        }).catch((err) => {
            console.log(err)
        })
})


module.exports =router;