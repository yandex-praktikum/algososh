import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {nanoid} from "nanoid";
import {Circle} from "../ui/circle/circle";
import {defineCircleState} from "../queue-page/utils/defineCircleState";
import {useForm} from "../../services/hooks/useForm";
import {Queue} from "../queue-page/types/types";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {LinkedList} from "./types/types";
import {makeDelay} from "../../services/utils/makeDelay";


export const ListPage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<string> | null>(null);
    const [linkedList, setLinkedList] = useState<LinkedList<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    // const [index, setIndex] = useState<number>(-Infinity);
    const [isAddHead, setIsAddHead] = useState<boolean | undefined>(false);
    const [isRemoveHead, setIsRemoveHead] = useState<boolean | undefined>(false);
    const [isAddTail, setIsAddTail] = useState<boolean | undefined>(false);
    const [isRemoveTail, setIsRemoveTail] = useState<boolean | undefined>(false);
    // const [isClear, setIsClear] = useState<boolean | undefined>(false);
    // const [edges, setEdges] = useState<number[]>([-Infinity, -Infinity]);

    let data: string | '' = values?.data;
    let regex = /\D/g;
    let array: string[] = ['0', '34', '8', '1'];
    let list = new LinkedList(array);
    let initialCirclesList = list.toArray();

    useEffect(() => {
        setLinkedList(list);
        if (initialCirclesList) {
            setList(initialCirclesList);
        }
    }, []);

    //console.log(linkedList, circlesList)


    const addHead = async (linkedList: LinkedList<string>, str: string): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsAddHead(true);
        //let [head, tail] = queue.showEdges();
        //setEdges([head, tail]);
        linkedList.prepend(str);
        //setIndex(tail);
        await makeDelay(500);
        setList(linkedList.toArray());
        //setIndex(-Infinity);
        setIsAddHead(false);
        setIsLoading(false);
        return linkedList;
    }

    const removeHead = async (linkedList: LinkedList<string>): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsRemoveHead(true);
        //let [head, tail] = queue.showEdges();
        //setIndex(head);
        linkedList.deleteHead();
        await makeDelay(500);
        //let [head1, tail1] = queue.showEdges();
        //setEdges([head1 <= tail - 1 ? head1 : tail - 1, tail - 1]);
        setList(linkedList.toArray());
        //setIndex(-Infinity);
        setIsRemoveHead(false);
        setIsLoading(false);
        return linkedList;
    }

    const addTail = async (linkedList: LinkedList<string>, str: string): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsAddTail(true);
        //let [head, tail] = queue.showEdges();
        //setEdges([head, tail]);
        linkedList.append(str);
        //setIndex(tail);
        await makeDelay(500);
        setList(linkedList.toArray());
        //setIndex(-Infinity);
        setIsAddTail(false);
        setIsLoading(false);
        return linkedList;
    }

    const removeTail = async (linkedList: LinkedList<string>): Promise<LinkedList<string>> => {
        setIsLoading(true);
        setIsRemoveTail(true);
        //let [head, tail] = queue.showEdges();
        //setIndex(head);
        linkedList.deleteTail();
        await makeDelay(500);
        //let [head1, tail1] = queue.showEdges();
        //setEdges([head1 <= tail - 1 ? head1 : tail - 1, tail - 1]);
        setList(linkedList.toArray());
        //setIndex(-Infinity);
        setIsRemoveTail(false);
        setIsLoading(false);
        return linkedList;
    }


    const handleAddHead = (): void => {
        if (data && linkedList) {
            addHead(linkedList, data);
        }
        setValues({...values, data: ''});
    }

    const handleRemoveHead = (): void => {
        if (linkedList) {
            removeHead(linkedList);
        }
    }

    const handleAddTail = (): void => {
        if (data && linkedList) {
            addTail(linkedList, data);
        }
        setValues({...values, data: ''});
    }

    const handleRemoveTail = (): void => {
        if (linkedList) {
            removeTail(linkedList);
        }
    }


    return (
        <SolutionLayout title="Связный список">
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <Input type={'text'}
                           maxLength={4}
                           isLimitText={true}
                           extraClass={`${styles.input}`}
                           placeholder={'Введите значение'}
                           onChange={handleChange}
                           name={'data'}
                           value={data || ""}
                           disabled={isLoading}
                    />
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Добавить в head'}
                                extraClass={`${styles.button}`}
                                type={'button'}
                                onClick={handleAddHead}
                                isLoader={isAddHead}
                                disabled={circlesList as string[] && (!data || regex.test(data) || circlesList!.length > 8)}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Добавить в tail'}
                                type={'button'}
                                onClick={handleAddTail}
                                isLoader={isAddTail}
                                disabled={circlesList as string[] && (!data || regex.test(data) || circlesList!.length > 8)}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Удалить из head'}
                                type={'button'}
                                onClick={handleRemoveHead}
                                isLoader={isRemoveHead}
                                disabled={isLoading}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Удалить из tail'}
                                type={'button'}
                                onClick={handleRemoveTail}
                                isLoader={isRemoveTail}
                                disabled={isLoading}
                        />
                    </div>
                </form>
                <form className={styles.form}>
                    <Input type={'text'}
                           extraClass={`${styles.input}`}
                           placeholder={'Введите индекс'}
                        //onChange={handleChange}
                           name={'index'}
                        //value={data || ""}
                        //disabled={isLoading}
                    />
                    <div className={styles.btnWrapperBig}>
                        <Button text={'Добавить по индексу'}
                                extraClass={`${styles.button}`}
                                type={'submit'}
                            //isLoader={isEnqueue}
                            //disabled={!data || regex.test(data) || circlesList[6] !== ''}
                        />
                    </div>
                    <div className={styles.btnWrapperBig}>
                        <Button text={'Удалить по индексу'}
                                type={'button'}
                            //onClick={handleDequeue}
                            //isLoader={isDequeue}
                            //disabled={isLoading || circlesList?.every(el => el === '')}
                        />
                    </div>
                </form>
            </div>


            <ul className={styles.circleList}>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle letter={`${char}`}
                                    extraClass={`${styles.circle}`}
                                //index={idx}
                                //state={defineCircleState(index, idx)}
                                //head={idx === edges[0] ? 'head' : ''}
                                //tail={idx === edges[1] ? 'tail' : ''}
                            />
                            {/*<Circle letter={`${char}`}
                                    index={idx}
                                //state={defineCircleState(index, idx)}
                                //head={idx === edges[0] ? 'head' : ''}
                                //tail={idx === edges[1] ? 'tail' : ''}
                            />*/}
                            {idx < circlesList.length - 1 &&
                                <ArrowIcon/>}
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
