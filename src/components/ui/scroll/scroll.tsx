import { FC } from "react";
import styles from "./scroll.module.css";

export const Scroll: FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
