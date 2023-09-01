import {
  WebhookEvent,
  TextMessage,
  MessageAPIResponseBase,
  TextEventMessage,
  EventSource,
  PostbackEvent,
} from "@line/bot-sdk";

import { client } from "../../../app.js";

import { replyText } from "../lineEvent.js";
import { LTBIfirstStep } from "../replyTemplate/ltbi.js";

const baseURL = process.env.BASE_URL;

const buttonsImageURL = `${baseURL}/static/buttons/1040.jpg`;

interface LTBITextPostback {
  type: "LTBITextPostback";
  step: number;
  data: boolean[];
}

// First one is the message, and will call postback to collect the data.

export const LTBITextSwitch = async (
  message: TextEventMessage,
  replyToken: string,
  source: EventSource
) => {
  switch (message.text) {
    case "七分篩檢法":
      return client.replyMessage(replyToken, LTBIfirstStep);
    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      return replyText(replyToken, message.text);
  }
};

export const LTBITextPostback = async (
  message: PostbackEvent,
  replyToken: string,
  source: EventSource
) => {
  const data = JSON.parse(message.postback.data) as LTBITextPostback;
  console.log("data", data);
  switch (data.type) {
    case "LTBITextPostback":
      return client.replyMessage(replyToken, {
        type: "flex",
        altText: "LTBI",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            size: "full",
            aspectRatio: "20:13",
            backgroundColor: "#eeeeee",
            animated: false,
            aspectMode: "cover",
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "咳嗽有痰",
                weight: "bold",
                size: "xxl",
              },
              {
                type: "box",
                layout: "horizontal",
                margin: "md",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "filler",
                          },
                        ],
                        backgroundColor: "#000000",
                        width: "20%",
                        height: "100%",
                        cornerRadius: "lg",
                      },
                    ],
                    width: "70%",
                    height: "8px",
                    backgroundColor: "#eeeeee",
                    cornerRadius: "lg",
                  },
                  {
                    type: "text",
                    text: "(1/5)",
                    offsetTop: "none",
                    offsetEnd: "none",
                    margin: "none",
                    size: "sm",
                    align: "center",
                  },
                ],
                cornerRadius: "none",
                position: "relative",
                alignItems: "center",
                justifyContent: "space-evenly",
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "症狀",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "測試文字",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5,
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "介紹",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "介紹文字",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "link",
                height: "sm",
                action: {
                  type: "postback",
                  label: "有痰",
                  data: "true",
                  displayText: "有痰",
                },
              },
              {
                type: "button",
                style: "link",
                height: "sm",
                action: {
                  type: "postback",
                  label: "沒有痰",
                  data: "false",
                  displayText: "沒有痰",
                },
              },
              {
                type: "box",
                layout: "vertical",
                contents: [],
                margin: "sm",
              },
            ],
            flex: 0,
          },
          styles: {
            header: {
              separator: true,
              separatorColor: "#ffffff",
              backgroundColor: "#eeeeee",
            },
          },
        },
      });
    default:
      return;
  }
};
