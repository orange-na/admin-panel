import express from "express";
import { addGroup, getGroup } from "../controllers/groupts";

const router = express.Router();

router.get("/getGroups", getGroup);

router.post("/addgroup", addGroup);

export default router;
