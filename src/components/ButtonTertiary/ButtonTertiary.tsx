import type { ButtonHTMLAttributes } from "react";
import checkIcon from "./check.svg";
import "./ButtonTertiary.css";

export type ButtonTertiaryProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Shows the leading check icon. */
  icon?: boolean;
  /** Button text. An empty string hides the label. */
  label?: string;
};

export function ButtonTertiary({
  icon = true,
  label = "Label",
  className,
  type = "button",
  ...rest
}: ButtonTertiaryProps) {
  const classes = ["button-tertiary", className].filter(Boolean).join(" ");
  const accessibleName = label || rest["aria-label"] ? undefined : "Button";

  return (
    <button
      className={classes}
      type={type}
      {...rest}
      {...(accessibleName ? { "aria-label": accessibleName } : {})}
    >
      {icon ? (
        <span className="button-tertiary__icon">
          <img src={checkIcon} alt="" width={12} height={12} />
        </span>
      ) : null}
      {label ? (
        <span className="button-tertiary__label">
          <span className="button-tertiary__text">{label}</span>
        </span>
      ) : null}
    </button>
  );
}
