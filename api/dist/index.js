"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("./routes/authorization"));
const groups_1 = __importDefault(require("./routes/groups"));
const users_1 = __importDefault(require("./routes/users"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
const app = (0, express_1.default)();
const PORT = 8800;
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", users_1.default);
app.use("/api", authorization_1.default);
app.use("/api", groups_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!!");
});
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT} !!!`);
});
