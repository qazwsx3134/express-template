/**
 * 注意 如果要import其他file
 * 需要遵守這樣的格式 import { xx } from "./xx.js"
 */

import {
  ClientConfig,
  Client,
  MiddlewareConfig,
  middleware,
} from "@line/bot-sdk";

/* init basic express app */
import express, { Request, Response, NextFunction } from "express";

/* Routes */
import { routerList } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static and downloaded files
app.use("/static", express.static("static"));

/* require config */
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

/* Line */

// Setup all LINE client and Express configurations.

export const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || "",
};

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET,
};

export const client = new Client(clientConfig);

routerList(app);

/* Error Handling */
import {
  initUncaughtException,
  initUnhandledRejection,
} from "./utils/process.js";
import { appError, errorHandlerMainProcess } from "./utils/mixinTools.js";

initUncaughtException();
initUnhandledRejection();

app.use(middleware(middlewareConfig));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(appError(404, "40401", "No Routes"));
});

app.use(errorHandlerMainProcess);

/* Display Port to assure all services are on. */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
