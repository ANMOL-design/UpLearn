const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const dotenv = require("dotenv");
dotenv.config();


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