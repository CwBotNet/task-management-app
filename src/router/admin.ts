import express from "express";
import { GetAllTasks, addTasks } from "../controller/admin";
export default (router: express.Router) => {
  router.post("/admin", addTasks);
  router.get("/admin", GetAllTasks);
};
