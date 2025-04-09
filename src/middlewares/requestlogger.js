import fs from "fs";
import path from "path";
import morgan from "morgan";

const logStream = fs.createWriteStream(path.join("logs", "gateway.log"), { flags: "a" });
const requestLogger = morgan("combined", { stream: logStream });

export default requestLogger;
