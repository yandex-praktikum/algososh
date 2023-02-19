import React, {useEffect} from "react";
import styles from './string.module.css';
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../services/hooks/useForm";

export const StringComponent: React.FC = () => {
    const {values, handleChange, setValues} = useForm({});
    let data: string | '' = values?.data;
    const circlesList: string[] | [] = data?.split('');
    console.log(circlesList);

    return (
        <SolutionLayout title="Строка">
            <form className={styles.form}>
                <Input type={'text'}
                       maxLength={11}
                       isLimitText={true}
                       extraClass={`${styles.input}`}
                       onChange={handleChange}
                       name={'data'}
                       value={values.data || ""}/>
                <Button text={'Развернуть'}
                        type={'submit'}
                        isLoader={false}/>
            </form>
            <ul className={styles.circleList}>
                {circlesList?.map((char) => {
                    return (
                        <li className={styles.listItem}>
                            <Circle letter={`${char}`}/>
                        </li>

                    )
                })}
            </ul>
        </SolutionLayout>
    );
};
