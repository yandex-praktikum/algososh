import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyle from './listStyle.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";


export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={listStyle.container}>
      <div className={listStyle.form}>
        <Input
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}

        />
          <Button
              text="Добавить в head"

          />
          <Button
              text="Добавить в tail"

          />
          <Button
              text="Удалить из head"

          />
          <Button
              text="Удалить из tail"

          />
      </div>
      <div className={listStyle.form}>
        <Input
            type="number"
            placeholder="Введите индекс"

        />
          <Button
              text="Добавить по индексу"
          />
          <Button
              text="Удалить по индексу"
          />

      </div>
      <ul className={listStyle.list}>

              <li className={listStyle.item} >

                    <Circle
                        isSmall
                    />

                <Circle

                />

                <ArrowIcon />
              </li>

      </ul>
      </div>
    </SolutionLayout>
  );
};
