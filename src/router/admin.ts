import express from "express";
import {
  GetAllTasks,
  addTasks,
  deleteTask,
  getEmployesByBranch,
  // getTaskByAdmin,
  getTaskByEmploy,
  updateTask,
} from "../controller/admin";

import { isAuthenticated } from "../middleware/authentication";

export default (router: express.Router) => {
  router.post("/admin", isAuthenticated, addTasks);
  router.get("/admin", isAuthenticated, GetAllTasks);
  router.patch("/admin/:id", isAuthenticated, updateTask);
  router.delete("/admin/:id", isAuthenticated, deleteTask);
  router.get("/admin/:branch", isAuthenticated, getEmployesByBranch);
  router.get("/admin/employ/:employName", isAuthenticated, getTaskByEmploy);
};
