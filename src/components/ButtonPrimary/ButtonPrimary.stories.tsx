import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ButtonPrimary } from "./ButtonPrimary";

const meta = {
  title: "Button/Primary",
  component: ButtonPrimary,
  tags: ["ai-generated"],
  args: {
    icon: true,
    label: "Label",
  },
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextSmallEnabledIconFirst: Story = {
  name: "Type=Text, Size=S, State=Enabled, Order=icon first",
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Label" });
    await expect(button).toHaveTextContent("Label");
  },
};

export const LabelOnly: Story = {
  args: {
    icon: false,
    label: "Label",
  },
};

export const IconOnly: Story = {
  args: {
    icon: true,
    label: "",
    "aria-label": "Confirm",
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Label" });
    // .button-primary background is --color-background-button-primary-enabled (#0066cc).
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(0, 102, 204)");
  },
};
