import React, {FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {useForm} from "../../services/hooks/useForm";
import styles from './fibonacci-page.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {nanoid} from "nanoid";
import {Circle} from "../ui/circle/circle";
import {makeDelay} from "../../services/utils/makeDelay";

export const FibonacciPage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    const [circlesList, setList] = useState<Array<number>>([]);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    let data: string | '' = values?.data;

    const getFibList = async (n: string): Promise<number[]> => {
        let num: number = Number(n);
        let res: number[] = [];
        setIsLoading(true);

        if (num === 1) {
            res = [1];
            await makeDelay(500);
            setList([...res]);
            res.push(1);
            await makeDelay(500);
            setList([...res])
            setIsLoading(false);
            return res;
        }

        res = [1];
        await makeDelay(500);
        setList([...res]);
        res.push(1);
        await makeDelay(500);
        setList([...res]);

        for (let i = 2; i < num + 1; i++) {
            await makeDelay(500);
            res.push(res[i - 2] + res[i - 1]);
            setList([...res]);
        }
        setIsLoading(false);
        return res;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (data) {
            getFibList(data);
        }
        setValues({...values, data: ''});
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input type={'number'}
                       max={19}
                       isLimitText={true}
                       extraClass={`${styles.input}`}
                       onChange={handleChange}
                       name={'data'}
                       value={data || ""}
                       disabled={isLoading}/>
                <Button text={'Рассчитать'}
                        type={'submit'}
                        isLoader={isLoading}
                        disabled={isNaN(parseInt(data)) || Number(data) > 19 || Number(data) < 1}/>
            </form>
            <ul className={
                circlesList.length < 9
                    ? styles.circleList
                    : `${styles.circleList} ${styles.circleListTwoRows}`
            }>
                {circlesList?.map((char, idx) => {
                    return (
                        <li key={nanoid()} className={styles.listItem}>
                            <Circle letter={`${char}`}
                                    index={idx}
                            />
                        </li>
                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
