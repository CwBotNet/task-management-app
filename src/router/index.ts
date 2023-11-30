import express from "express";
import tasks from "./tasks";
import admin from "./admin";
import user from "./user";
const router = express.Router();

export default (): express.Router => {
  admin(router);
  tasks(router);
  user(router);
  return router;
};
