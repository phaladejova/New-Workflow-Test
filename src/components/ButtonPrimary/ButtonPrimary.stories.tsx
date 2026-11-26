import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ButtonPrimary } from "./ButtonPrimary";

const meta = {
  title: "Button/Primary",
  component: ButtonPrimary,
  tags: ["ai-generated"],
  args: {
    size: "S",
    state: "Enabled",
    order: "icon first",
    icon: true,
    label: "Label",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["S", "M", "L"] },
    state: {
      control: "inline-radio",
      options: ["Enabled", "Hovered", "Pressed", "Focused", "Disabled"],
    },
    order: { control: "inline-radio", options: ["icon first", "text first"] },
    icon: { control: "boolean" },
    label: { control: "text" },
  },
  parameters: {
    controls: { sort: "none" },
  },
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

type Story = StoryObj<typeof meta>;

/** One story. Size, state, and order are chosen in Controls. */
export const Primary: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Label" });
    await expect(button).toHaveTextContent("Label");
  },
};

export const CssCheck: Story = {
  tags: ["!dev"],
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Label" });
    // .button-primary background is --color-background-button-primary-enabled (#0066cc).
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(0, 102, 204)");
  },
};
