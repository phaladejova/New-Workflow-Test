import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ButtonSecondary } from "./ButtonSecondary";

const meta = {
  title: "Button/Secondary",
  component: ButtonSecondary,
  tags: ["ai-generated"],
  args: {
    icon: true,
    label: "Label",
  },
} satisfies Meta<typeof ButtonSecondary>;

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
