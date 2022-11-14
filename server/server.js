const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "Images")));

//upload.single('image')

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/noteRouter"));

// Connect to mongodb
mongoose.connect("mongodb://localhost:27017", (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
