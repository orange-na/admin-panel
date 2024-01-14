import express, { Express, Request, Response } from "express";
import loginRouter from "./routes/login";
import userRouter from "./routes/users";
import signUpRouter from "./routes/signup";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
const PORT = 8800;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.use("/api", loginRouter);
app.use("/api", userRouter);
app.use("/api", signUpRouter);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT} !!!`);
});
