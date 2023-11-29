// console.table({
//   tsConfig: true,
//   nodemonConfig: true,
//   greet: "Hello typeScript",
// });

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import router from "./router";
import "dotenv/config";

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello server");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.table({
    port: PORT,
    message: "Connected to server",
  });
});

// app.listen(PORT, () => {
//   console.table({
//     port: PORT,
//     message: "Connected to server",
//   });
// });

const mongodbUri = process.env.DATABASEURI;
mongoose.Promise = Promise;
mongoose.connect(mongodbUri!);
const dbConnection = mongoose.connection;
dbConnection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());
