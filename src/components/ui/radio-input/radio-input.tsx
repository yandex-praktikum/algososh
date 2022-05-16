import React from "react";
import { nanoid } from "nanoid";
import styles from "./radio-input.module.css";

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  extraClass?: string;
}

export const RadioInput: React.FC<RadioProps> = ({
  label = "Введите текст",
  extraClass = "",
  ...rest
}) => {
  const id = nanoid();

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input className={styles.input} type="radio" id={id} {...rest} />
      <label className={`text text_type_button ${styles.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
