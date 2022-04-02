const express = require("express");

const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());

// const issueController = require("./controller/issue.controller");

// app.use("/api/issue", issueController);

module.exports = app;
