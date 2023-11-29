import express from "express";
import tasks from "./tasks";
import admin from "./admin";
const router = express.Router();

export default (): express.Router => {
  admin(router);
  tasks(router);
  return router;
};
