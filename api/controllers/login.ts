import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(results[0].id, "secretkey");
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

export { login, logout };
