"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = (req, res) => {
    //Check if user exist.
    const q = "SELECT * FROM users WHERE email = ?";
    db_1.default.query(q, req.body.email, (err, results) => {
        if (err)
            return res.json(err);
        if (results.length)
            return res.json("USER_EXIST");
        // Hash the password & Create a user.
        bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
            const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
            const values = [req.body.username, req.body.email, hash];
            db_1.default.query(q, [values], (err, results) => {
                if (err)
                    res.json(err);
                return res
                    .status(200)
                    .json("Your user has been created successfully!!");
            });
        });
    });
};
exports.signUp = signUp;
