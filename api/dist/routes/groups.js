"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupts_1 = require("../controllers/groupts");
const router = express_1.default.Router();
router.post("/addgroup", groupts_1.addGroup);
exports.default = router;
