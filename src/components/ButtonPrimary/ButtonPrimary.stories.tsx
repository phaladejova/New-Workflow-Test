import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  ButtonPrimary,
  type ButtonPrimaryOrder,
  type ButtonPrimarySize,
  type ButtonPrimaryState,
} from "./ButtonPrimary";

const meta = {
  title: "Button/Primary",
  component: ButtonPrimary,
  tags: ["ai-generated"],
  args: {
    icon: true,
    label: "Label",
    size: "S",
    state: "Enabled",
    order: "icon first",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["S", "M", "L"] },
    state: {
      control: "select",
      options: ["Enabled", "Hovered", "Pressed", "Focused", "Disabled"],
    },
    order: { control: "inline-radio", options: ["icon first", "text first"] },
  },
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

type Story = StoryObj<typeof meta>;

function variant(
  size: ButtonPrimarySize,
  state: ButtonPrimaryState,
  order: ButtonPrimaryOrder,
): Story {
  return {
    name: `Type=Text, Size=${size}, State=${state}, Order=${order}`,
    args: { size, state, order, icon: true, label: "Label" },
  };
}

export const TextSmallEnabledIconFirst: Story = {
  ...variant("S", "Enabled", "icon first"),
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Label" });
    await expect(button).toHaveTextContent("Label");
  },
};
export const TextSmallEnabledTextFirst = variant("S", "Enabled", "text first");
export const TextMediumEnabledIconFirst = variant("M", "Enabled", "icon first");
export const TextMediumEnabledTextFirst = variant("M", "Enabled", "text first");
export const TextLargeEnabledIconFirst = variant("L", "Enabled", "icon first");
export const TextLargeEnabledTextFirst = variant("L", "Enabled", "text first");

export const TextSmallHoveredIconFirst = variant("S", "Hovered", "icon first");
export const TextSmallHoveredTextFirst = variant("S", "Hovered", "text first");
export const TextMediumHoveredIconFirst = variant("M", "Hovered", "icon first");
export const TextMediumHoveredTextFirst = variant("M", "Hovered", "text first");
export const TextLargeHoveredIconFirst = variant("L", "Hovered", "icon first");
export const TextLargeHoveredTextFirst = variant("L", "Hovered", "text first");

export const TextSmallFocusedIconFirst = variant("S", "Focused", "icon first");
export const TextSmallFocusedTextFirst = variant("S", "Focused", "text first");
export const TextMediumFocusedIconFirst = variant("M", "Focused", "icon first");
export const TextMediumFocusedTextFirst = variant("M", "Focused", "text first");
export const TextLargeFocusedIconFirst = variant("L", "Focused", "icon first");
export const TextLargeFocusedTextFirst = variant("L", "Focused", "text first");

export const TextSmallPressedIconFirst = variant("S", "Pressed", "icon first");
export const TextSmallPressedTextFirst = variant("S", "Pressed", "text first");
export const TextMediumPressedIconFirst = variant("M", "Pressed", "icon first");
export const TextMediumPressedTextFirst = variant("M", "Pressed", "text first");
export const TextLargePressedIconFirst = variant("L", "Pressed", "icon first");
export const TextLargePressedTextFirst = variant("L", "Pressed", "text first");

export const TextSmallDisabledIconFirst = variant("S", "Disabled", "icon first");
export const TextSmallDisabledTextFirst = variant("S", "Disabled", "text first");
export const TextMediumDisabledIconFirst = variant("M", "Disabled", "icon first");
export const TextMediumDisabledTextFirst = variant("M", "Disabled", "text first");
export const TextLargeDisabledIconFirst = variant("L", "Disabled", "icon first");
export const TextLargeDisabledTextFirst = variant("L", "Disabled", "text first");

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Label" });
    // .button-primary background is --color-background-button-primary-enabled (#0066cc).
    await expect(getComputedStyle(button).backgroundColor).toBe("rgb(0, 102, 204)");
  },
};
