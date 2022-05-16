import React from "react";
import styles from "./return-button.module.css";
import { ReturnIcon } from "../icons/return-icon";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  extraClass?: string;
}

export const ReturnButton: React.FC<ButtonProps> = ({
  extraClass = "",
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${extraClass}`}
      type="button"
      {...rest}
    >
      <ReturnIcon />
      <p className="text text_type_button text_color_link ml-4">К оглавлению</p>
    </button>
  );
};
