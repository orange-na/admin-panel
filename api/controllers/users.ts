import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db";

const ACCESS_TOKEN_KEY: any = process.env.ACCESS_TOKEN_KEY;

const listGroupsByUser = (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json("NOT_AUTHENTICATION");

  jwt.verify(token, ACCESS_TOKEN_KEY, (err: any, userId: any) => {
    if (err) return res.json("TOKEN_ERROR");

    const q =
      "SELECT * from user_groups JOIN `groups` ON user_groups.group_id = groups.id JOIN users ON user_groups.user_id = users.id WHERE user_groups.user_id = ?";

    db.query(q, userId, (err, results) => {
      if (err) return res.json(err);

      res.status(200).json(results ? results : []);
    });
  });
};

// jwt.verify(token, ACCESS_TOKEN_KEY, (err: any, userId: any) => {
//   if (err) return res.json("TOKEN_ERROR");

//   const q = "INSERT INTO `groups` (`groupname`, `grouphost`) VALUES (?)";
//   const parsedUserId = parseInt(userId);
//   const values = [req.body.groupname, parsedUserId];

//   db.query(q, [values], (err, results: ResultSetHeader) => {
//     if (err) return res.json(err);
//     const newGroupId = results.insertId;

//     const q =
//       "INSERT INTO user_groups (`user_id`, `group_id`, `create_at`) VALUES (?)";
//     const currentData = new Date();
//     const values = [parsedUserId, newGroupId, currentData];

//     db.query(q, [values], (err, results) => {
//       if (err) return res.json(err);
//       res.status(200).json("New group was created successfully.");
//     });
//   });
// });

export { listGroupsByUser };
