import express from "express";

import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

express().use(bodyParser);

export const authentication = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header(process.env.TOKEN!);
  const secretKey = process.env.SECRETKEY!;
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.body.username = user;
    next();
  });
};
