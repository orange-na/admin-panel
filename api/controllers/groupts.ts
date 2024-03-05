import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db";
import { promisify } from "util";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const dbQuery: any = promisify(db.query).bind(db);

const addGroup = (req: Request, res: Response) => {
  const token = req.cookies.accessToken;

  if (!token) return res.json("NOT_AUTHENTICATION");

  db.beginTransaction(async (err) => {
    if (err) return res.json("TRANSACTION_ERROR");

    try {
      const promisifiedToken: any = promisify(jwt.verify);
      const verifyToken = await promisifiedToken(token, ACCESS_TOKEN_KEY);
      const parsedUserId = parseInt(verifyToken as any);

      const insertGroupQuery =
        "INSERT INTO `groups` (`groupname`, `grouphost`) VALUES (?)";
      const groupValues: any = [req.body.groupname, parsedUserId];
      const groupResult: any = await dbQuery(insertGroupQuery, [groupValues]);

      const newGroupId = groupResult.insertId;

      const insertUserGroupQuery =
        "INSERT INTO user_groups (`user_id`, `group_id`, `create_at`) VALUES (?, ?, ?)";
      const currentData = new Date();
      const userGroupValues = [parsedUserId, newGroupId, currentData];
      await dbQuery(insertUserGroupQuery, userGroupValues);

      db.commit((commitError) => {
        if (commitError) {
          return db.rollback(() => {
            res.json("TRANSACTION_COMMIT_ERROR");
          });
        }
        res.status(200).json("New group was created successfully.");
      });
    } catch (error) {
      db.rollback(() => {
        res.json("TRANSACTION_ROLLBACK_ERROR");
      });
    }
  });

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
};

const getGroup = (req: Request, res: Response) => {};
export { addGroup, getGroup };
