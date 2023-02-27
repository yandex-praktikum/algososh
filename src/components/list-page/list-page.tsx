import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {nanoid} from "nanoid";
import {Circle} from "../ui/circle/circle";
import {defineCircleState} from "../queue-page/utils/defineCircleState";

export const ListPage: React.FC = () => {
    return (
        <SolutionLayout title="Связный список">
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <Input type={'text'}
                           maxLength={4}
                           isLimitText={true}
                           extraClass={`${styles.input}`}
                           placeholder={'Введите значение'}
                        //onChange={handleChange}
                           name={'data'}
                        //value={data || ""}
                        //disabled={isLoading}
                    />
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Добавить в head'}
                                extraClass={`${styles.button}`}
                                type={'button'}
                            //isLoader={isEnqueue}
                            //disabled={!data || regex.test(data) || circlesList[6] !== ''}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Добавить в tail'}
                                type={'button'}
                            //onClick={handleDequeue}
                            //isLoader={isDequeue}
                            //disabled={isLoading || circlesList?.every(el => el === '')}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Удалить из head'}
                                type={'button'}
                            //onClick={handleClear}
                            //isLoader={isClear}
                            //disabled={isLoading}
                        />
                    </div>
                    <div className={styles.btnWrapperSmall}>
                        <Button text={'Удалить из tail'}
                                type={'button'}
                            //onClick={handleClear}
                            //isLoader={isClear}
                            //disabled={isLoading}
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


            {/*<ul className={styles.circleList}>
          {circlesList?.map((char, idx) => {
            return (
                <li key={nanoid()} className={styles.listItem}>
                  <Circle letter={`${char}`}
                          index={idx}
                          state={defineCircleState(index, idx)}
                          head={idx === edges[0] ? 'head' : ''}
                          tail={idx === edges[1] ? 'tail' : ''}
                  />
                </li>
            )
          })}
        </ul>*/}
        </SolutionLayout>
    );
};
