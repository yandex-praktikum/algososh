import React, {FormEvent, useEffect, useState} from "react";
import styles from './stack-page.module.css';
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "./types/types";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../services/hooks/useForm";
import {nanoid} from "nanoid";
import {makeDelay} from "../../services/utils/makeDelay";
import {swap} from "../../services/utils/swap";

interface Iindexes {
    start: number,
    end: number
}

export const StackPage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<string> | null>(null);
    const [stack, setStack] = useState<Stack<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

    let data: string | '' = values?.data;

    useEffect(() => {
        setStack(new Stack());
        setList([]);
    }, []);

    const pushStack = async (stack: Stack<string>, str: string): Promise<Stack<string>> => {
        setIsLoading(true);
        await makeDelay(1000);
        let regex = /\D/g;
        if (!regex.test(str) && stack.getSize() < 16) {
            stack.push(str);
            if (circlesList) {
                setList(stack.print);
                await makeDelay(1000);
            }
        }

        setIsLoading(false);
        return stack;
    }

    const handlePush = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (data && stack) {
            pushStack(stack, data);
        }
        setValues({...values, data: ''});
    }


    return (
        <SolutionLayout title="Стек">
            <form className={styles.container} onSubmit={handlePush}>
                <Input type={'text'}
                       maxLength={4}
                       isLimitText={true}
                       extraClass={`${styles.input}`}
                       onChange={handleChange}
                       name={'data'}
                       value={data || ""}
                />
                <Button text={'Добавить'}
                        extraClass={`${styles.button}`}
                        type={'submit'}
                        onSubmit={handlePush}
                />
                <Button text={'Удалить'}
                        type={'submit'}/>
                <div className={styles.clearBtnWrapper}>
                    <Button text={'Очистить'}
                            type={'submit'}/>
                </div>
            </form>
            <ul className={styles.circleList}>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle letter={`${char}`}/>
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
