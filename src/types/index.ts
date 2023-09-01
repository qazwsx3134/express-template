export interface CustomError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export const ColorPalette = {
  dark: "#2B2A4C",
  red: "#B31312",
  orange: "#EA906C",
  white: "#EEE2DE",
  gray: "#AAAAAA",
} as const;
