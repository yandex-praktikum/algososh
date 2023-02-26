import React, {FormEvent, useEffect, useState} from "react";
import styles from './QueuePage.module.css';
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Queue} from "./types/types";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../services/hooks/useForm";
import {nanoid} from "nanoid";
import {makeDelay} from "../../services/utils/makeDelay";
import {defineCircleState} from "./utils/defineCircleState";

interface Iindexes {
    start: number,
}

export const QueuePage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<string | null>>([]);
    const [queue, setQueue] = useState<Queue<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [indexes, setIndexes] = useState<Iindexes>({start: -Infinity});
    const [isEnqueue, setIsEnqueue] = useState<boolean | undefined>(false);
    const [isDequeue, setIsDequeue] = useState<boolean | undefined>(false);
    const [isClear, setIsClear] = useState<boolean | undefined>(false);

    let data: string | '' = values?.data;
    let regex = /\D/g;

    useEffect(() => {
        setQueue(new Queue(7));
    }, []);

    useEffect(() => {
        if (queue) {
            setList(queue.print);
        }
    }, [queue]);


    const enqueueQueue = async (queue: Queue<string>, str: string): Promise<Queue<string>> => {
        setIsLoading(true);
        setIsEnqueue(true);
        queue.enqueue(str);
        setList(queue.print);
        //setIndexes({start: circlesList.length});
        await makeDelay(500);


        //setIndexes({start: -Infinity});
        setIsEnqueue(false);
        setIsLoading(false);
        return queue;
    }

    const dequeueQueue = async (queue: Queue<string>): Promise<Queue<string>> => {
        setIsLoading(true);
        setIsDequeue(true);
        queue.dequeue();
        if (queue.isEmpty()) {
            queue.reset(7)
        }
        //setIndexes({start: circlesList.length - 1});
        await makeDelay(500);
        setList(queue.print);
        //setIndexes({start: -Infinity});
        setIsDequeue(false);
        setIsLoading(false);
        return queue;
    }

    const clearQueue = async (queue: Queue<string>): Promise<Queue<string>> => {
        setIsLoading(true);
        setIsClear(true);
        queue.clear(7);
        await makeDelay(500);
        setList(queue.print);
        setIsClear(false);
        setIsLoading(false);
        return queue;
    }

    const handleEnqueue = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (data && queue) {
            enqueueQueue(queue, data);
        }
        setValues({...values, data: ''});
    }

    const handleDequeue = (): void => {
        if (queue) {
            dequeueQueue(queue);
        }
    }

    const handleClear = (): void => {
        if (queue) {
            clearQueue(queue);
        }
    }

    return (
        <SolutionLayout title="Очередь">
            <form className={styles.container} onSubmit={handleEnqueue}>
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
                        isLoader={isEnqueue}
                        disabled={!data || regex.test(data) || circlesList[6] !== ''}
                />
                <Button text={'Удалить'}
                        type={'button'}
                        onClick={handleDequeue}
                        isLoader={isDequeue}
                        disabled={isLoading || !circlesList?.some(el => el !== '')}
                />
                <div className={styles.clearBtnWrapper}>
                    <Button text={'Очистить'}
                            type={'button'}
                            onClick={handleClear}
                            isLoader={isClear}
                            disabled={isLoading || !circlesList?.some(el => el !== '')}
                    />
                </div>
            </form>
            <ul className={styles.circleList}>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle letter={`${char}`}
                                    index={idx}
                                    state={defineCircleState(indexes.start, idx)}
                            />
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
