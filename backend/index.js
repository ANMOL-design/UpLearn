const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const dotenv = require("dotenv");
dotenv.config();

///////////////
// This query will help to send upto 50 MB data to backend at a time
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
/////////////////

app.use(require("./routes/register"))
app.use(require("./routes/instructorRegister"))
app.use(require("./routes/verify"))
app.use(require("./routes/loginRoute"))
app.use(require("./routes/logout"))
app.use(require("./routes/imageuploader"));
app.use(require("./routes/Subscribers"));
app.use(require("./routes/contactQuery"));
app.use(require("./routes/aboutUser"));
app.use(require("./routes/updateUserProfile"));
app.use(require("./routes/addCourse"));
app.use(require("./routes/libraryRoute"));
app.use(require("./routes/AssignTask"));

// mongodbconnection
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

app.listen(PORT, () => {
    console.log("Server is running port no " + PORT);
});