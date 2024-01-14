import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signUp = (req: Request, res: Response) => {
  //Check if user exist.
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, req.body.email, (err, results: any) => {
    if (err) return res.json(err);
    if (results.length) return res.json("USER_EXIST");

    // Hash the password & Create a user.
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const q =
        "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, results) => {
        if (err) res.json(err);
        return res
          .status(200)
          .json("Your user has been created successfully!!");
      });
    });
  });
};

const login = (req: Request, res: Response) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, results: any) => {
    if (err) return res.json(err);
    if (!results.length) return res.json("EMAIL_NOT_FOUND");

    const comparePassword = bcrypt.compareSync(
      req.body.password,
      results[0].password
    );

    if (!comparePassword) return res.json("PASSWORD_NOT_FOUND");

    const ACCESS_TOKEN_KEY: any = process.env.ACCESS_TOKEN_KEY;

    const token = jwt.sign(results[0].id, ACCESS_TOKEN_KEY);
    const { password, ...others } = results[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

const logout = (req: Request, res: Response) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
      path: "/",
      domain: "localhost",
    })
    .status(200)
    .json("LOGOUT");
};

export { signUp, login, logout };
