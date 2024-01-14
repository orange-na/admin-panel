"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db_1.default.query(q, [req.body.email], (err, results) => {
        if (err)
            return res.json(err);
        if (!results.length)
            return res.json("EMAIL_NOT_FOUND");
        const comparePassword = bcrypt_1.default.compareSync(req.body.password, results[0].password);
        if (!comparePassword)
            return res.json("PASSWORD_NOT_FOUND");
        const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
        const token = jsonwebtoken_1.default.sign(results[0].id, ACCESS_TOKEN_KEY);
        const _a = results[0], { password } = _a, others = __rest(_a, ["password"]);
        res
            .cookie("accessToken", token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    });
};
exports.login = login;
const logout = (req, res) => {
    res
        .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
        path: "/",
        domain: "localhost",
    })
        .status(200)
        .json("LOGOUT");
};
exports.logout = logout;
