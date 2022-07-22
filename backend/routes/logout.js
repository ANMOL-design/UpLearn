const express = require("express");
const router = express.Router();
router.use(express.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(express.json());

router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken')
    res.status(200).send('user logout');
   
    console.log("logout")
    

});
module.exports = router;