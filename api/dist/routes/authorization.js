"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../controllers/authorization");
const router = express_1.default.Router();
router.post("/signup", authorization_1.signUp);
router.post("/login", authorization_1.login);
router.delete("/logout", authorization_1.logout);
exports.default = router;
