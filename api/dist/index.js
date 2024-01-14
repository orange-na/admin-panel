"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const users_1 = __importDefault(require("./routes/users"));
const signup_1 = __importDefault(require("./routes/signup"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
const app = (0, express_1.default)();
const PORT = 8800;
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!!");
});
app.use("/api", login_1.default);
app.use("/api", users_1.default);
app.use("/api", signup_1.default);
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT} !!!`);
});
