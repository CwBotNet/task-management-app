import express from "express";
import jwt from "jsonwebtoken";
import { decryptPassword, encryptPassword } from "../helpers/encreption";
import {
  createUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUserByEmail,
} from "../db/users";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, Branch, password } = await req.body;

    if (!username || !email || !Branch || !password) {
      return res.status(401).send({ message: "All fields are required" });
    }

    // check user function
    const exiestingUser = await getUserByEmail(email);

    if (exiestingUser) {
      return res.status(400).json({ message: "user allready exiests" });
    }

    const user = await createUser({
      username,
      email,
      Branch,
      authentication: {
        password: await encryptPassword(password),
      },
    });
    return res
      .status(200)
      .json({
        message: "user created sucessfully",
        id: user._id,
        email: user.email,
        username: user.username,
        Branch: user.Branch,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "somthing went wrong!" });
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const secretKey = process.env.SECRETKEY!;
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("this email is not registered !");
    }

    const hash = user.authentication?.password;

    const isPasswordValid = await decryptPassword(hash!, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        Branch: user.Branch,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "login successful", accessToken }).end();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "validation error" });
  }
};
