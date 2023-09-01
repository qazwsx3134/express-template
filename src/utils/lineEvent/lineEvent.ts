import {
  WebhookEvent,
  TextMessage,
  MessageAPIResponseBase,
  TextEventMessage,
  EventSource,
  PostbackEvent,
} from "@line/bot-sdk";

import { client } from "../../app.js";
import { LTBITextPostback, LTBITextSwitch } from "./switch/ltbi.js";

const baseURL = process.env.BASE_URL;

/**
 * Line Flow:
 * 1. /callback -> loop the events -> handleEvent -> handleText -> replyText
 */

// simple reply function
export const replyText = (token: string, texts: string | string[]) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: "text", text }))
  );
};

// callback function to handle a single event
export const handleEvent = (event: WebhookEvent) => {
  // Process all variables here.

  if (
    "replyToken" in event &&
    "message" in event &&
    event?.replyToken &&
    event?.replyToken.match(/^(.)\1*$/)
  ) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }

  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        case "image":
        // return handleImage(message, event.replyToken);
        case "video":
        // return handleVideo(message, event.replyToken);
        case "audio":
        // return handleAudio(message, event.replyToken);
        case "location":
        // return handleLocation(message, event.replyToken);
        case "sticker":
        // return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case "follow":
      return replyText(event.replyToken, "Got followed event");

    case "unfollow":
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case "join":
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case "leave":
      return console.log(`Left: ${JSON.stringify(event)}`);

    case "postback":
      return handlePostback(event, event.replyToken, event.source);

    case "beacon":
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
};

function handleText(
  message: TextEventMessage,
  replyToken: string,
  source: EventSource
) {
  LTBITextSwitch(message, replyToken, source);
}

function handlePostback(
  data: PostbackEvent,
  replyToken: string,
  source: EventSource
) {
  LTBITextPostback(data, replyToken, source);
}
