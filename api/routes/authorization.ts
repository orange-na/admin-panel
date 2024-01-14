import express from "express";
import { login, logout, signUp } from "../controllers/authorization";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.delete("/logout", logout);

export default router;
