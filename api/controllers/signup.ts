import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export { signUp };
