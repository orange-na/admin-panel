import express from "express";
import { listGroupsByUser } from "../controllers/users";

const router = express.Router();

router.get("/me/groups", listGroupsByUser);

export default router;
