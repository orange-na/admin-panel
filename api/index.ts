import express, { Express, Request, Response } from "express";
import db from "./db";

const app: Express = express();
const PORT = 8800;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

// app.get("/db", (req: Request, res: Response) => {
//   const q = "SELECT * FROM users";
//   db.query(q, (err, results) => {
//     if (err) return res.json(err);
//     return res.status(200).json(results);
//   });
// });

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT} !!!`);
});
