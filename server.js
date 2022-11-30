// require("./db/connect");

const express = require("express");
const app = express();
const methods = require("./routes/methods");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/expenses", methods);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
