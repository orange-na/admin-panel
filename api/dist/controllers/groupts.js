"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGroup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const addGroup = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.json("NOT_AUTHENTICATION");
    jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_KEY, (err, userId) => {
        if (err)
            return res.json("TOKEN_ERROR");
        const q = "INSERT INTO `groups` (`groupname`, `grouphost`) VALUES (?)";
        const parsedUserId = parseInt(userId);
        const values = [req.body.groupname, parsedUserId];
        db_1.default.query(q, [values], (err, results) => {
            if (err)
                return res.json(err);
            const newGroupId = results.insertId;
            const q = "INSERT INTO user_groups (`user_id`, `group_id`) VALUES (?)";
            const values = [parsedUserId, newGroupId];
            db_1.default.query(q, [values], (err, results) => {
                if (err)
                    return res.json(err);
                res.status(200).json("New group was created successfully.");
            });
        });
    });
};
exports.addGroup = addGroup;
