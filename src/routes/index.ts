import express, { Express, Request, Response } from "express";
import demoRouter from "./demo.js";
import webhookRouter from "./webhook.js";

const router = express.Router();

// Register the LINE middleware.
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
// app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
router.get("/", async (_: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

export const routerList = (app: Express) => {
  app.use("/", router);
  app.use("/webhook", webhookRouter);
};
