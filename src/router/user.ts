import express from "express";
import { getTaskByEmploy } from "../controller/users";
import { isAuthenticated } from "../middleware/authentication";
export default (router: express.Router) => {
  router.get("/user/:employName", isAuthenticated, getTaskByEmploy);
};
