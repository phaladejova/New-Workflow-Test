import type { ButtonHTMLAttributes } from "react";
import checkIcon from "./check.svg";
import "./ButtonPrimary.css";

export type ButtonPrimaryProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Shows the leading check icon. */
  icon?: boolean;
  /** Button text. An empty string hides the label. */
  label?: string;
};

export function ButtonPrimary({
  icon = true,
  label = "Label",
  className,
  type = "button",
  ...rest
}: ButtonPrimaryProps) {
  const classes = ["button-primary", className].filter(Boolean).join(" ");
  const accessibleName =
    label || rest["aria-label"] ? undefined : "Button";

  return (
    <button
      className={classes}
      type={type}
      {...rest}
      {...(accessibleName ? { "aria-label": accessibleName } : {})}
    >
      {icon ? (
        <span className="button-primary__icon">
          <img src={checkIcon} alt="" width={12} height={12} />
        </span>
      ) : null}
      {label ? (
        <span className="button-primary__label">
          <span className="button-primary__text">{label}</span>
        </span>
      ) : null}
    </button>
  );
}
