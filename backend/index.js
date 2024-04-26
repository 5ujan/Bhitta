require("dotenv").config();
const express = require("express");
const app = express();

const { blogsRouter } = require("./routes/blogs");

const connectDB = require("./db/connect");

app.use(express.json())

app.get("/hello", async (req, res, next) => res.send("hi!"));

app.use("/", blogsRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  } catch (errr) {
    console.log(errr);
  }
};
start();
