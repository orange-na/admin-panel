import express, { Express, Request, Response } from "express";
import authorizationRouter from "./routes/authorization";
import groupsRouter from "./routes/groups";
import userRouter from "./routes/users";
import testRouter from "./routes/users";
import cors from "cors";
import cookieparser from "cookie-parser";
import { csvToJson } from "./jobs/csv";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
const PORT = 8800;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());

app.use("/users", userRouter);
app.use("/api", authorizationRouter);
app.use("/api", groupsRouter);
app.use("/test", testRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.post("/test/csv", (req: Request, res: Response) => {
  console.log(req.body);
  // csvToJson({ path: csv });
  return res.json("CSV was converted to JSON successfully.");
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT} !!!`);
});
