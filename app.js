const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./route/userRoute");
const errorHandler = require("./middleware/errorHandler");
const PORT = 5000;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/Authentication_API")
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/",userRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running of port ${PORT}`);
});
