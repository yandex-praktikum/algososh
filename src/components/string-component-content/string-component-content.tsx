import React, {ChangeEvent, useState} from "react";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string-component-content.module.css';
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";

type TArray = {
    value: string;
    color: ElementStates;
};

export const swap = (arr: TArray[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
};

export const StringComponentContent: React.FC = () => {
    const [loader, setLoader] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [strArr, setStrArr] = useState<Array<TArray>>([]);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputVal(event.target.value);
    }

    const reverse = async (string: string) => {
        const arr = string.split('').map(word => {
            return {
                value: word,
                color: ElementStates.Default,
            }
        });
        const mid = Math.ceil(arr.length / 2);

        for (let i = 0; i < mid; i++) {
            let j = arr.length - 1 - i;

            if (i !== j) {
                arr[i].color = ElementStates.Changing;
                arr[j].color = ElementStates.Changing;
                setStrArr([...arr]);
                await delay(700);
            };

            swap(arr, i, j);

            arr[i].color = ElementStates.Modified;
            arr[j].color = ElementStates.Modified;

            setStrArr([...arr]);
        }
    }

    const onButtonClick = () => {
        setLoader(true);
        reverse(inputVal);
        setLoader(false);
        console.log(strArr);
    }

    return (
        <>
            <div className={styles.inputContainer}>
                <Input
                    extraClass={styles.inputContainer__input}
                    maxLength={11}
                    isLimitText={true}
                    value={inputVal}
                    onChange={onChange}
                />
                <Button
                    text="Развернуть"
                    onClick={onButtonClick}
                    disabled={!inputVal}
                    isLoader={loader}
                />
            </div>
            <div>
                <ul className={styles.circlesBox}>
                    {strArr && strArr.map((item, index) =>
                        <li key={index}>
                            <Circle letter={item.value} state={item.color} />
                        </li>)}
                </ul>
            </div>


        </>
        );
};
