import React from "react";
import styles from "./input-container.module.css";

interface InputContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export const InputContainer: React.FC<InputContainerProps> = ({children}) => {
  return <div className={styles.container}>{children}</div>;
};
