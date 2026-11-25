import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#ffffff" }],
    },
  },
};

export default preview;
