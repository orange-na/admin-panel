import express, { Express, Request, Response } from "express";
import authorizationRouter from "./routes/authorization";
import groupsRouter from "./routes/groups";
import userRouter from "./routes/users";
import cors from "cors";
import cookieparser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
const PORT = 8800;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());

app.use("/api", userRouter);
app.use("/api", authorizationRouter);
app.use("/api", groupsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT} !!!`);
});
