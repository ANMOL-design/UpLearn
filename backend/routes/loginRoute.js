const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bycrypt = require('bcrypt');
router.use(express.json());
dotenv.config();
const User = require("../models/userSchema");


// router.get('/aboutuser', (req, res) => {
//    const email = "amandeep1219603@jmit.ac.in"
//     const userId = User.findOne({ email: JSON.stringify(email) });
//         console.log(userId);
//         res.send(userId);
// });

router.post('/login', async(req, res) => {
    try {
        const { email, password ,userRole } = req.body;
        const userId = User.findOne({ email: email });
        console.log(userId);
        if (!email || !password || userRole) {
            return res.sendStatus(400);
        }
        
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bycrypt.compare(password, userLogin.password)
            

            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {
                res.status(200).json({ msg: "login Succesfully" })
            }
        } else {
            return res.status(402).json({ msg: "Invalid Credential" });
        }
    } catch (err) {
        res.json({ msg: "error occured" })
    }
})

module.exports = router;