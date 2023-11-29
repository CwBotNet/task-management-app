import express from "express";
import { GetAllTasks } from "../controller/admin";

export default (router: express.Router) => {
  router.get("/tasks", GetAllTasks);
  router.patch("/tasks/:id");
  router.delete("/tasks/:id");
};
