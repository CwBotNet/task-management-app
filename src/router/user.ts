import express from "express";
import { getTaskByEmploy } from "../controller/users";
export default (router: express.Router) => {
  router.get("/user/:employName", getTaskByEmploy);
};
