const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const cors = require('cors')
app.use(helmet());


// middlewares builtin
app.use(express.json())
app.use(cors({ origin: "*" }));
//dbconfig
const connectDB = require("./dbconfig");

//routers importing
const memberRouter = require('./routers/Members.router')


//routers using
app.use('/members',memberRouter);

app.listen(3000, async () => {
  await connectDB();
  console.log("server is listening...");
});

