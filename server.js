// require("./db/connect");

const express = require("express");
const app = express();
const methods = require("./routes/methods");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/expenses", methods);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server running on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
