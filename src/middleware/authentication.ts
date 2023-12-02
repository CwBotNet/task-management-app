import express from "express";
import Jwt from "jsonwebtoken";

// authirization function
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionJwt = req.cookies?.jwt;
    // console.log(sessionJwt);
    const secretKey = process.env.SECRETKEY!;
    // token validation
    if (!sessionJwt) throw new Error("Unauthorized");
    // verify token
    // check if the user assoiciated with the jwtToken exidts
    const decodedToken = Jwt.verify(sessionJwt, secretKey);
    // console.log(decodedToken);
    if (decodedToken) {
      res.status(201);
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "somthing went wrong" });
  }
};

// isOwner function
export const isOwner = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

// isAdmin function for admin routes security
export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};
