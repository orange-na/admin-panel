import express from "express";
import { convertCSVtoJSON } from "../controllers/test";

const router = express.Router();

router.post("/csv", convertCSVtoJSON);

export default router;
