import { FlexBox, FlexImage, Message } from "@line/bot-sdk";
import { ColorPalette } from "../../../types/index.js";

export const LTBI = {
  first: "咳嗽有痰",
  second: "咳嗽兩週以上",
  third: "體重減輕",
  fourth: "沒有食慾",
  fifth: "胸痛",
} as const;

// Components

const heroImageBox = (url: string): FlexImage => ({
  type: "image",
  url,
  size: "full",
  aspectRatio: "20:13",
  backgroundColor: "#eeeeee",
  animated: false,
  aspectMode: "cover",
});

const processBarBox = (step: number): FlexBox => ({
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
          backgroundColor: ColorPalette.red,
          width: `${step * 20}%`,
          height: "100%",
          cornerRadius: "lg",
        },
      ],
      width: "70%",
      height: "8px",
      backgroundColor: ColorPalette.white,
      cornerRadius: "lg",
    },
    {
      type: "text",
      text: `${step}/5`,
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
});

const symptomBox = ({
  symptom = "咳嗽有痰",
  description = "咳嗽有痰",
}): FlexBox => ({
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
          text: symptom,
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
          text: description,
          wrap: true,
          color: "#666666",
          size: "sm",
          flex: 5,
        },
      ],
    },
  ],
});

// Reply Template

export const LTBIfirstStep: Message = {
  type: "flex",
  altText: "七分篩檢法",
  contents: {
    type: "bubble",
    hero: heroImageBox(
      "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png"
    ),
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: LTBI.first,
          weight: "bold",
          size: "xxl",
        },
        processBarBox(1),
        symptomBox({
          symptom: "咳嗽有痰",
          description: "咳嗽有痰",
        }),
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "primary",
          height: "sm",
          color: ColorPalette.orange,
          action: {
            type: "postback",
            label: "有痰",
            data: JSON.stringify({
              type: "LTBITextPostback",
              step: 1,
              data: [true],
            }),
            displayText: "有痰",
          },
        },
        {
          type: "button",
          style: "primary",
          height: "sm",
          color: ColorPalette.orange,
          action: {
            type: "postback",
            label: "沒有痰",
            data: JSON.stringify({
              type: "LTBITextPostback",
              step: 1,
              data: [false],
            }),
            displayText: "沒有痰",
          },
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
};
