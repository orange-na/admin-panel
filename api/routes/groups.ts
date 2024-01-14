import express from "express";
import { addGroup } from "../controllers/groupts";

const router = express.Router();

router.post("/addgroup", addGroup);

export default router;
