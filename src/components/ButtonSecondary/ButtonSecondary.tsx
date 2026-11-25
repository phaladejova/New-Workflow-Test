import type { ButtonHTMLAttributes } from "react";
import checkIcon from "./check.svg";
import "./ButtonSecondary.css";

export type ButtonSecondaryProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Shows the leading check icon. */
  icon?: boolean;
  /** Button text. An empty string hides the label. */
  label?: string;
};

export function ButtonSecondary({
  icon = true,
  label = "Label",
  className,
  type = "button",
  ...rest
}: ButtonSecondaryProps) {
  const classes = ["button-secondary", className].filter(Boolean).join(" ");
  const accessibleName = label || rest["aria-label"] ? undefined : "Button";

  return (
    <button
      className={classes}
      type={type}
      {...rest}
      {...(accessibleName ? { "aria-label": accessibleName } : {})}
    >
      {icon ? (
        <span className="button-secondary__icon">
          <img src={checkIcon} alt="" width={12} height={12} />
        </span>
      ) : null}
      {label ? (
        <span className="button-secondary__label">
          <span className="button-secondary__text">{label}</span>
        </span>
      ) : null}
    </button>
  );
}
