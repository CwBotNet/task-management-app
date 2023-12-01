import express from "express";
import tasks from "./tasks";
import admin from "./admin";
import user from "./user";
import authentication from "./authentication";
const router = express.Router();

export default (): express.Router => {
  admin(router);
  tasks(router);
  user(router);
  authentication(router);
  return router;
};
