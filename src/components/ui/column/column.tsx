import React from "react";
import styles from "./column.module.css";
import { ElementStates } from "../../../types/element-states";

interface ColumnProps {
  index: number;
  state?: ElementStates;
  extraClass?: string;
}

export const Column: React.FC<ColumnProps> = ({
  index,
  state = ElementStates.Default,
  extraClass = "",
}) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`${styles.column} ${styles[state]}`}
      style={{ height: (320 * index) / 100 || 1 }}
    />
    <p className={`text text_type_column text_color_input mt-3`}>{index}</p>
  </div>
);
