import express from "express";
import { GetAllTasks } from "../controller/admin";
import { isAuthenticated } from "../middleware/authentication";

export default (router: express.Router) => {
  router.get("/tasks", isAuthenticated, GetAllTasks);
  router.patch("/tasks/:id", isAuthenticated);
  router.delete("/tasks/:id", isAuthenticated);
};
