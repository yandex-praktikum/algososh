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
import {defineCircleState} from "./utils/defineCircleState";

interface Iindexes {
    start: number,
}

export const StackPage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<string> | null>(null);
    const [stack, setStack] = useState<Stack<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [indexes, setIndexes] = useState<Iindexes>({start: -Infinity});
    const [isPush, setIsPush] = useState<boolean | undefined>(false);
    const [isPop, setIsPop] = useState<boolean | undefined>(false);
    const [isClear, setIsClear] = useState<boolean | undefined>(false);

    let data: string | '' = values?.data;
    let regex = /\D/g;

    useEffect(() => {
        setStack(new Stack());
        setList([]);
    }, []);

    const pushStack = async (stack: Stack<string>, str: string): Promise<Stack<string>> => {
        setIsLoading(true);
        setIsPush(true);

        if (stack.getSize() < 16) {
            stack.push(str);
            if (circlesList) {
                setList(stack.print);
                setIndexes({start: circlesList.length});
                await makeDelay(500);
            }
        }
        setIndexes({start: -Infinity});
        setIsPush(false);
        setIsLoading(false);
        return stack;
    }

    const popStack = async (stack: Stack<string>): Promise<Stack<string>> => {
        setIsLoading(true);
        setIsPop(true);
        stack.pop();
        if (circlesList) {
            setIndexes({start: circlesList.length - 1});
            await makeDelay(500);
            setList(stack.print);
        }

        setIndexes({start: -Infinity});
        setIsPop(false);
        setIsLoading(false);
        return stack;
    }

    const clearStack = async (stack: Stack<string>): Promise<Stack<string>> => {
        setIsLoading(true);
        setIsClear(true);
        while (stack.peak()) {
            stack.pop();
        }
        if (circlesList) {
            await makeDelay(500);
            setList(stack.print);
        }

        setIsClear(false);
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

    const handlePop = (): void => {
        if (stack) {
            popStack(stack);
        }
    }

    const handleClear = (): void => {
        if (stack) {
            clearStack(stack);
        }
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
                       disabled={isLoading}
                />
                <Button text={'Добавить'}
                        extraClass={`${styles.button}`}
                        type={'submit'}
                        isLoader={isPush}
                        disabled={!data || regex.test(data)}
                />
                <Button text={'Удалить'}
                        type={'button'}
                        onClick={handlePop}
                        isLoader={isPop}
                        disabled={isLoading || !circlesList?.length}
                />
                <div className={styles.clearBtnWrapper}>
                    <Button text={'Очистить'}
                            type={'button'}
                            onClick={handleClear}
                            isLoader={isClear}
                            disabled={isLoading || !circlesList?.length}
                    />
                </div>
            </form>
            <ul className={styles.circleList}>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle letter={`${char}`}
                                    index={idx}
                                    head={idx === circlesList?.length - 1 ? 'top' : ''}
                                    state={defineCircleState(indexes.start, idx)}
                            />
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
