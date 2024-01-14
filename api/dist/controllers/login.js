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
exports.logout = exports.login = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        const token = jsonwebtoken_1.default.sign(results[0].id, "secretkey");
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
    })
        .status(200)
        .json("LOGOUT");
};
exports.logout = logout;
