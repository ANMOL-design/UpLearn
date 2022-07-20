const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();


app.use(require("./routes/register"))
// mongodbconnection
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
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