/**
 * 注意 如果要import其他file
 * 需要遵守這樣的格式 import { xx } from "./xx.js"
 */
import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map