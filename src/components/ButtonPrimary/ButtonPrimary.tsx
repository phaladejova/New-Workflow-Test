import type { ButtonHTMLAttributes } from "react";
import checkLDisabled from "./icons/check-l-disabled.svg";
import checkL from "./icons/check-l.svg";
import checkMDisabled from "./icons/check-m-disabled.svg";
import checkM from "./icons/check-m.svg";
import checkSDisabled from "./icons/check-s-disabled.svg";
import checkS from "./icons/check-s.svg";
import "./ButtonPrimary.css";

export type ButtonPrimarySize = "S" | "M" | "L";
export type ButtonPrimaryState =
  | "Enabled"
  | "Hovered"
  | "Pressed"
  | "Focused"
  | "Disabled";
export type ButtonPrimaryOrder = "icon first" | "text first";

export type ButtonPrimaryProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Shows the check icon. */
  icon?: boolean;
  /** Button text. An empty string hides the label. */
  label?: string;
  /** Figma size. */
  size?: ButtonPrimarySize;
  /** Figma state. Enabled still reacts to hover, press, and focus. */
  state?: ButtonPrimaryState;
  /** Figma icon order. */
  order?: ButtonPrimaryOrder;
};

const enabledIcon = { S: checkS, M: checkM, L: checkL } as const;
const disabledIcon = {
  S: checkSDisabled,
  M: checkMDisabled,
  L: checkLDisabled,
} as const;

function iconAsset(
  size: ButtonPrimarySize,
  state: ButtonPrimaryState,
  disabled: boolean,
) {
  if (disabled || state === "Disabled") {
    const px = size === "S" ? 12 : size === "M" ? 14 : 16;
    return { src: disabledIcon[size], size: px };
  }
  // The large focused variant uses the 14px check, matching the Figma component.
  if (size === "L" && state === "Focused") return { src: checkM, size: 14 };
  if (size === "M") return { src: enabledIcon.M, size: 14 };
  if (size === "L") return { src: enabledIcon.L, size: 16 };
  return { src: enabledIcon.S, size: 12 };
}

export function ButtonPrimary({
  icon = true,
  label = "Label",
  size = "S",
  state = "Enabled",
  order = "icon first",
  className,
  type = "button",
  disabled,
  ...rest
}: ButtonPrimaryProps) {
  const isDisabled = state === "Disabled" || Boolean(disabled);
  const classes = ["button-primary", className].filter(Boolean).join(" ");
  const accessibleName = label || rest["aria-label"] ? undefined : "Button";
  const glyph = iconAsset(size, state, isDisabled);

  const iconElement = icon ? (
    <span className="button-primary__icon" data-icon-size={glyph.size}>
      <img src={glyph.src} alt="" width={glyph.size} height={glyph.size} />
    </span>
  ) : null;
  const labelElement = label ? (
    <span className="button-primary__label">
      <span className="button-primary__text">{label}</span>
    </span>
  ) : null;

  return (
    <button
      className={classes}
      type={type}
      data-size={size}
      data-state={isDisabled ? "Disabled" : state}
      data-order={order}
      disabled={isDisabled}
      {...rest}
      {...(accessibleName ? { "aria-label": accessibleName } : {})}
    >
      {order === "text first" ? (
        <>
          {labelElement}
          {iconElement}
        </>
      ) : (
        <>
          {iconElement}
          {labelElement}
        </>
      )}
    </button>
  );
}
