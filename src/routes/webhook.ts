import {
  ClientConfig,
  Client,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
  TextMessage,
  MessageAPIResponseBase,
} from "@line/bot-sdk";
import express, { Request, Response, NextFunction } from "express";

import { handleEvent } from "../utils/lineEvent/lineEvent.js";

const router = express.Router();

// This route is used for the Webhook.
router.post("/", async (req: Request, res: Response): Promise<Response> => {
  const events: WebhookEvent[] = req.body.events;

  console.log("events", events);

  // Process all of the received events asynchronously.
  /**
   * events [
      {
        type: 'message',
        message: { type: 'text', id: '470821698204336662', text: '介紹' },
        webhookEventId: '01H9542GG5M3T0SWSYPT82TZCT',
        deliveryContext: { isRedelivery: false },
        timestamp: 1693462904842,
        source: { type: 'user', userId: '**********************' },
        replyToken: **********************,
        mode: 'active'
      }
    ]
   */
  const results = await Promise.all(
    events.map(async (event: WebhookEvent) => {
      try {
        await handleEvent(event);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
        }

        // Return an error message.
        return res.status(500).json({
          status: "error",
        });
      }
    })
  );

  // Return a successfull message.
  return res.status(200).json({
    status: "success",
    results: "",
  });
});

export default router;
