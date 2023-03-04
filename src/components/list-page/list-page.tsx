import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {nanoid} from "nanoid";
import {Circle} from "../ui/circle/circle";
import {defineCircleState} from "./utils/defineCircleState";
import {useForm} from "../../services/hooks/useForm";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {LinkedList} from "./types/types";
import {makeDelay} from "../../services/utils/makeDelay";

export const ListPage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<string> | null>(null);
    const [linkedList, setLinkedList] = useState<LinkedList<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [circleState, setCircleState] = useState<{ changingIndex: number, isDone: boolean, value: number }>({
        changingIndex: -Infinity,
        isDone: false,
        value: -Infinity
    });
    const [isAddHead, setIsAddHead] = useState<boolean | undefined>(false);
    const [isRemoveHead, setIsRemoveHead] = useState<boolean | undefined>(false);
    const [isAddTail, setIsAddTail] = useState<boolean | undefined>(false);
    const [isRemoveTail, setIsRemoveTail] = useState<boolean | undefined>(false);
    const [isAddByIndex, setIsAddByIndex] = useState<boolean | undefined>(false);
    const [isDeleteByIndex, setIsDeleteByIndex] = useState<boolean | undefined>(false);
    const [isSmallCircleTop, setIsSmallCircleTop] = useState<boolean | undefined>(false);
    const [isFromHead, setIsFromHead] = useState<boolean | undefined>(false);
    const [isFromTail, setIsFromTail] = useState<boolean | undefined>(false);
    const [isSmallCircleBottom, setIsSmallCircleBottom] = useState<boolean | undefined>(false);
    const [smallCircle, setSmallCircle] = useState<string>('');
    const [edges, setEdges] = useState<number[]>([0, 0]);

    let data: string | "" = values?.data;
    let index: number = Number(values?.index);
    let regex = /\D/g;
    let array: string[] = ["0", "34", "8", "1"];
    let list = new LinkedList(array);
    let initialCirclesList = list.toArray();

    useEffect(() => {
        setLinkedList(list);
        if (initialCirclesList) {
            setList(initialCirclesList);
            setEdges([0, array.length - 1])
        }
    }, []);

    //console.log(linkedList, circlesList, edges)

    const addHead = async (linkedList: LinkedList<string>, str: string): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsAddHead(true);
        linkedList.prepend(str);
        setSmallCircle(str);
        setIsSmallCircleTop(true);
        setIsFromHead(true);
        setCircleState({changingIndex: 0, isDone: false, value: -Infinity});
        await makeDelay(500);
        setIsSmallCircleTop(false);
        setIsFromHead(false);
        setList(linkedList.toArray());
        setEdges([0, linkedList.getSize() - 1]);
        setCircleState({...circleState, isDone: true, value: 0});
        await makeDelay(500);
        setCircleState({changingIndex: -Infinity, isDone: false, value: -Infinity});
        setIsAddHead(false);
        setIsLoading(false);
        return linkedList;
    };

    const removeHead = async (linkedList: LinkedList<string>): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsRemoveHead(true);
        linkedList.deleteHead();
        setSmallCircle(circlesList![0]);
        setIsSmallCircleBottom(true);
        setIsFromHead(true);
        setCircleState({changingIndex: 0, isDone: false, value: -Infinity});
        await makeDelay(500);
        setIsSmallCircleBottom(false);
        setIsFromHead(false);
        setList(linkedList.toArray());
        setEdges([0, linkedList.getSize() - 1]);
        setCircleState({changingIndex: -Infinity, isDone: false, value: -Infinity});
        setIsRemoveHead(false);
        setIsLoading(false);
        return linkedList;
    };

    const addTail = async (linkedList: LinkedList<string>, str: string): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsAddTail(true);
        linkedList.append(str);
        setSmallCircle(str);
        setIsSmallCircleTop(true);
        setIsFromTail(true);
        setCircleState({changingIndex: circlesList!.length - 1, isDone: false, value: -Infinity});
        await makeDelay(500);
        setIsSmallCircleTop(false);
        setIsFromTail(false);
        setList(linkedList.toArray());
        setEdges([0, linkedList.getSize() - 1]);
        setCircleState({...circleState, isDone: true, value: linkedList.getSize() - 1});
        await makeDelay(500);
        setCircleState({changingIndex: -Infinity, isDone: false, value: -Infinity});
        setIsAddTail(false);
        setIsLoading(false);
        return linkedList;
    };

    const removeTail = async (linkedList: LinkedList<string>): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsRemoveTail(true);
        setSmallCircle(circlesList![circlesList!.length - 1]);
        setIsSmallCircleBottom(true);
        setIsFromTail(true);
        linkedList.deleteTail();
        setCircleState({changingIndex: circlesList!.length - 1, isDone: false, value: -Infinity});
        await makeDelay(500);
        setIsSmallCircleBottom(false);
        setIsFromTail(false);
        setList(linkedList.toArray());
        setEdges([0, linkedList.getSize() - 1]);
        setCircleState({changingIndex: -Infinity, isDone: false, value: -Infinity});
        setIsRemoveTail(false);
        setIsLoading(false);
        return linkedList;
    };

    const addByIndex = async (linkedList: LinkedList<string>, str: string, index: number): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsAddByIndex(true);
        setSmallCircle(str);
        setIsSmallCircleTop(true);
        setIsFromHead(true);
        linkedList.addByIndex(str, index);
        let i = 0;
        while (i <= index) {
            setCircleState({changingIndex: i, isDone: false, value: -Infinity});
            setEdges([i, linkedList.getSize() - 1]);
            i++;
            await makeDelay(500);
        }
        setEdges([0, linkedList.getSize() - 1]);
        setCircleState({...circleState, isDone: true, value: index});
        setSmallCircle('');
        setIsSmallCircleTop(false);
        setIsFromHead(false);
        setList(linkedList.toArray());
        await makeDelay(500);
        setCircleState({changingIndex: -Infinity, isDone: false, value: -Infinity});
        setIsAddByIndex(false);
        setIsLoading(false);
        return linkedList;
    };

    const deleteByIndex = async (linkedList: LinkedList<string>, index: number): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsDeleteByIndex(true);
        setIsSmallCircleBottom(true);
        setIsFromHead(true);
        linkedList.deleteByIndex(index);
        let i = 0;
        while (i <= index) {
            setCircleState({changingIndex: i, isDone: false, value: -Infinity});
            setEdges([i, linkedList.getSize() - 1]);
            setSmallCircle(circlesList![i]);
            i++;
            await makeDelay(500);
        }
        setEdges([0, linkedList.getSize() - 1]);
        setSmallCircle('');
        setIsSmallCircleBottom(false);
        setIsFromHead(false);
        setList(linkedList.toArray());
        setCircleState({changingIndex: -Infinity, isDone: false, value: -Infinity});
        setIsDeleteByIndex(false);
        setIsLoading(false);
        return linkedList;
    };

    const handleAddHead = (): void => {
        if (data && linkedList) {
            addHead(linkedList, data);
        }
        setValues({...values, data: "", index: ""});
    };

    const handleRemoveHead = (): void => {
        if (linkedList) {
            removeHead(linkedList);
        }
    };

    const handleAddTail = (): void => {
        if (data && linkedList) {
            addTail(linkedList, data);
        }
        setValues({...values, data: ""});
    };

    const handleRemoveTail = (): void => {
        if (linkedList) {
            removeTail(linkedList);
        }
    };

    const handleAddByIndex = (): void => {
        if (data && index && linkedList) {
            addByIndex(linkedList, data, index);
        }
        setValues({...values, data: "", index: ""});
    };

    const handleDeleteByIndex = (): void => {
        if (linkedList && index) {
            deleteByIndex(linkedList, index);
        }
    };

    return (
        <SolutionLayout title="Связный список">
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <Input
                        type={"text"}
                        maxLength={4}
                        isLimitText={true}
                        extraClass={`${styles.input}`}
                        placeholder={"Введите значение"}
                        onChange={handleChange}
                        name={"data"}
                        value={data || ""}
                        disabled={isLoading}
                    />
                    <div className={styles.btnWrapperSmall}>
                        <Button
                            text={"Добавить в head"}
                            extraClass={`${styles.button}`}
                            type={"button"}
                            onClick={handleAddHead}
                            isLoader={isAddHead}
                            disabled={
                                (circlesList as string[]) &&
                                (!data || regex.test(data) || circlesList!.length > 8)
                            }
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button
                            text={"Добавить в tail"}
                            type={"button"}
                            onClick={handleAddTail}
                            isLoader={isAddTail}
                            disabled={
                                (circlesList as string[]) &&
                                (!data || regex.test(data) || circlesList!.length > 8)
                            }
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button
                            text={"Удалить из head"}
                            type={"button"}
                            onClick={handleRemoveHead}
                            isLoader={isRemoveHead}
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button
                            text={"Удалить из tail"}
                            type={"button"}
                            onClick={handleRemoveTail}
                            isLoader={isRemoveTail}
                            disabled={isLoading}
                        />
                    </div>
                </form>
                <form className={styles.form}>
                    <Input
                        type={"text"}
                        extraClass={`${styles.input}`}
                        placeholder={"Введите индекс"}
                        onChange={handleChange}
                        name={"index"}
                        value={index || ""}
                        //disabled={isLoading}
                    />
                    <div className={styles.btnWrapperBig}>
                        <Button
                            text={"Добавить по индексу"}
                            extraClass={`${styles.button}`}
                            type={"button"}
                            isLoader={isAddByIndex}
                            onClick={handleAddByIndex}
                            //disabled={!data || regex.test(data) || circlesList[6] !== ''}
                        />
                    </div>
                    <div className={styles.btnWrapperBig}>
                        <Button
                            text={"Удалить по индексу"}
                            type={"button"}
                            onClick={handleDeleteByIndex}
                            isLoader={isDeleteByIndex}
                            //disabled={isLoading || circlesList?.every(el => el === '')}
                        />
                    </div>
                </form>
            </div>

            <ul className={styles.circleList}>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle
                                letter={`${char}`}
                                extraClass={`${styles.circle}`}
                                state={defineCircleState(!isFromTail ? circleState.changingIndex - 1 : -Infinity, idx, circleState.isDone, circleState.value)}
                                head={idx === edges[0] && isSmallCircleTop && isFromHead
                                    ? <Circle letter={`${smallCircle}`}
                                              state={defineCircleState(circleState.changingIndex, idx, circleState.isDone, circleState.value)}
                                              isSmall={true}/>
                                    : idx === edges[1] && isSmallCircleTop && isFromTail
                                        ? <Circle letter={`${smallCircle}`}
                                                  state={defineCircleState(circleState.changingIndex, idx, circleState.isDone, circleState.value)}
                                                  isSmall={true}/>
                                        : idx === edges[0] && !isSmallCircleTop && !isSmallCircleBottom
                                            ? 'head'
                                            : ''}
                                tail={idx === edges[0] && isSmallCircleBottom && isFromHead
                                    ? <Circle letter={`${smallCircle}`}
                                              state={defineCircleState(circleState.changingIndex, idx, circleState.isDone, circleState.value)}
                                              isSmall={true}/>
                                    : idx === edges[1] && isSmallCircleBottom && isFromTail
                                        ? <Circle letter={`${smallCircle}`}
                                                  state={defineCircleState(circleState.changingIndex, idx, circleState.isDone, circleState.value)}
                                                  isSmall={true}/>
                                        : idx === edges[1] && !isSmallCircleBottom
                                            ? 'Tail'
                                            : ''}
                            />

                            {idx < circlesList.length - 1 && <ArrowIcon/>}
                        </li>
                    );
                })}
            </ul>
        </SolutionLayout>
    );
};
