import express from "express";
import {
  GetAllTasks,
  addTasks,
  deleteTask,
  getEmployesByBranch,
  getTaskByEmploy,
  updateTask,
} from "../controller/admin";
export default (router: express.Router) => {
  router.post("/admin", addTasks);
  router.get("/admin", GetAllTasks);
  router.patch("/admin/:id", updateTask);
  router.delete("/admin/:id", deleteTask);
  router.get("/admin/:branch", getEmployesByBranch);
  router.get("/admin/:employName", getTaskByEmploy);
};
