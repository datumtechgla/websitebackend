const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
app.use(helmet());

//dbconfig
const connectDB = require("./dbConfig");

//routers importing
const memberRouter = require('./routers/Members.router')


//routers using
app.use('/members',memberRouter);

app.listen(3000, () => {
//   connectDB();
  console.log("server is listening...");
});

