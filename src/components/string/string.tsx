import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface IArray {
  value: string;
  color: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [data, setData] = useState<IArray[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const maxCount = 11;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const reverseString = async () => {
    const symbols = [...inputValue.split('').map((el) => { return { value: el, color: ElementStates.Default } })];
    let startIndex = 0;
    let lastIndex = symbols.length;
    setData([...symbols]);
    await new Promise((resolve) =>
      setTimeout(resolve, SHORT_DELAY_IN_MS)
    );

    while (startIndex < lastIndex) {
      if (startIndex === lastIndex - 1) {
        symbols[startIndex].color = ElementStates.Modified;
        setData([...symbols]);
        break;
      }
      symbols[startIndex].color = ElementStates.Changing;
      symbols[lastIndex - 1].color = ElementStates.Changing;
      setData([...symbols]);
      let tmp = symbols[startIndex].value;
      symbols[startIndex].value = symbols[lastIndex - 1].value;
      symbols[lastIndex - 1].value = tmp;
      await new Promise((resolve) =>
        setTimeout(resolve, SHORT_DELAY_IN_MS)
      );
      symbols[startIndex].color = ElementStates.Modified;
      symbols[lastIndex - 1].color = ElementStates.Modified;
      setData([...symbols]);
      startIndex++;
      lastIndex--;
    }
  }

  const onClick = async () => {
    setLoading(true);
    setInputValue('');
    await reverseString();
    setLoading(false);
  }

  useEffect(() => {
    return () => setData([]);
  }, [])

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input value={inputValue} onChange={onChange} maxLength={maxCount} isLimitText />
        <Button text="Развернуть" type="button" onClick={onClick} isLoader={loading} disabled={inputValue.length === 0} />
      </div>
      <div className={styles.circles}>
        {data.map(({ value, color }) => <Circle key={uuidv4()} letter={value} state={color} />)}
      </div>
    </SolutionLayout>
  );
};
