const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bycrypt = require('bcrypt')
router.use(express.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());
dotenv.config();
const Authentication = require('../middleware/Authentication')
const User = require("../models/userSchema")
const Instructor = require("../models/instructorregisterSchema")
// router.get('/aboutuser', (req, res) => {
//    const email = "amandeep1219603@jmit.ac.in"
//     const userId = User.findOne({ email: JSON.stringify(email) });
//         console.log(userId);
//         res.send(userId);
// });

router.post('/login', async(req, res) => {
    try {
        const { email, password ,userrole } = req.body;

        if (!email || !password ||!userrole) {
            return res.sendStatus(400);
        }

        const userLogin = await User.findOne({ email: email });
        const instructorlogin = await Instructor.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bycrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken();

            res.cookie("jwtToken", token, {
                expires: new Date(2147483647 * 1000),
                httpOnly: true
            })

            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {
                window.localStorage.setItem("Role","STUDENT")
                res.status(200).json({ msg: "login Succesfully" })
            }
        }
        else if (instructorlogin) {
            const isMatch = await bycrypt.compare(password, userLogin.password)
            const token = await instructorlogin.generateAuthToken();

            res.cookie("jwtToken", token, {
                expires: new Date(2147483647 * 1000),
                httpOnly: true
            })

            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {
                window.localStorage.setItem("Role","Instructor")
                res.status(200).json({ msg: "login Succesfully" })
            }
        }
         else {
            return res.status(402).json({ msg: "Invalid Credential" });
        }
    } catch (err) {
        res.json({ msg: "error occured" +err })
    }
})

module.exports = router;