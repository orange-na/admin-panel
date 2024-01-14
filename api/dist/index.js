"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8800;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!!");
});
// app.get("/db", (req: Request, res: Response) => {
//   const q = "SELECT * FROM users";
//   db.query(q, (err, results) => {
//     if (err) return res.json(err);
//     return res.status(200).json(results);
//   });
// });
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT} !!!`);
});
