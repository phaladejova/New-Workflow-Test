import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonPrimary } from "./ButtonPrimary";

const meta = {
  title: "Button/Primary",
  component: ButtonPrimary,
  args: {
    icon: true,
    label: "Label",
  },
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextSmallEnabledIconFirst: Story = {
  name: "Type=Text, Size=S, State=Enabled, Order=icon first",
};
