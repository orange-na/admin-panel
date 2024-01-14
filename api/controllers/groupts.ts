import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db";
import { ResultSetHeader } from "mysql2";

const ACCESS_TOKEN_KEY: any = process.env.ACCESS_TOKEN_KEY;

const addGroup = (req: Request, res: Response) => {
  const token = req.cookies.accessToken;

  if (!token) return res.json("NOT_AUTHENTICATION");

  jwt.verify(token, ACCESS_TOKEN_KEY, (err: any, userId: any) => {
    if (err) return res.json("TOKEN_ERROR");

    const q = "INSERT INTO `groups` (`groupname`, `grouphost`) VALUES (?)";
    const parsedUserId = parseInt(userId);
    const values = [req.body.groupname, parsedUserId];

    db.query(q, [values], (err, results: ResultSetHeader) => {
      if (err) return res.json(err);
      const newGroupId = results.insertId;

      const q = "INSERT INTO user_groups (`user_id`, `group_id`) VALUES (?)";
      const values = [parsedUserId, newGroupId];

      db.query(q, [values], (err, results) => {
        if (err) return res.json(err);
        res.status(200).json("New group was created successfully.");
      });
    });
  });
};

export { addGroup };
