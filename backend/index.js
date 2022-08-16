const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const { default: fetch } = require("node-fetch");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

///////////////
// This query will help to send upto 50 MB data to backend at a time
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
/////////////////

app.use(require("./routes/register"));
app.use(require("./routes/instructorRegister"));
app.use(require("./routes/verify"));
app.use(require("./routes/loginRoute"));
app.use(require("./routes/logout"));
app.use(require("./routes/imageuploader"));
app.use(require("./routes/Subscribers"));
app.use(require("./routes/contactQuery"));
app.use(require("./routes/aboutUser"));
app.use(require("./routes/updateUserProfile"));
app.use(require("./routes/addCourse"));
app.use(require("./routes/libraryRoute"));
app.use(require("./routes/AssignTask"));
app.use(require("./routes/doubtRoute"));

var uuid4 = require("uuid4");

// Need to generate from app.videosdk.live
const API_KEY = "960fa010-ee89-4c43-afa3-daeb64d9302d";
const SECRET_KEY =
  "a4cd08e71761cf57fbed1ab83cc5462bccfd218077ccdce5d5482e4aeb32adbb";

jwt.sign(
  {
    apikey: API_KEY,
  },
  SECRET_KEY,
  {
    algorithm: "HS256",
    expiresIn: "24h",
    jwtid: uuid4(),
  },
  function (err, token) {}
);

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
app.get("/get-token", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "10m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

//
app.post("/create-meeting/", (req, res) => {
  const { token, region } = req.body;
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});
app.listen(PORT, () => {
  console.log("Server is running port no " + PORT);
});
