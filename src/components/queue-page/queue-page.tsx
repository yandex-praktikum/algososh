import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queueStyle from "./queueStyle.module.css";
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { Input } from "../ui/input/input"
import {Queue} from "./utils";
import { ElementStates } from "../../types/element-states";
import {delay} from "../../utils/constDelay";

export type TQueueItem = {
  head?: string;
  value?: string;
  color: ElementStates;
};

//Очередь
export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
  const [input, setInput] = useState('');
  const queueLength = Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default }));
  const [queueArr, setQueueArr] = useState<TQueueItem[]>(queueLength);
  const [color, setColor] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //Добавление
  const handleAdd = async () => {
    if (input) {
      setInput('');
      queue.enqueue({ value: input, color: ElementStates.Default });
      setQueue(queue);
      queueArr[queue.getTail() - 1] = { value: '', color: ElementStates.Changing };
      setQueueArr([...queueArr]);
      await delay(500);
      queueArr[queue.getTail() - 1] = { value: input, color: ElementStates.Changing };
      setQueueArr([...queueArr]);
      queueArr[queue.getTail() - 1] = { value: input, color: ElementStates.Default };
      setQueueArr([...queueArr]);
    }
  };

  //Удаление
  const handleDelete = async () => {
    setColor(true);
    queue.dequeue();
    setQueue(queue);
    queueArr[queue.getHead() - 1] = { value: queueArr[queue.getHead() - 1].value, color: ElementStates.Changing };
    setQueueArr([...queueArr]);
    await delay(500);
    queueArr[queue.getHead() - 1] = { value: '', color: ElementStates.Default };
    setQueueArr([...queueArr]);
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      queueArr[queue.getHead() - 1] = { value: '', color: ElementStates.Default, head: 'head' };
      setQueueArr([...queueArr]);
    }
    setColor(false);
  };

  //Очистить
  const handleClear = () => {
    queue.clear()
    setQueue(queue);
    setQueueArr(Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default })));
  };

  return (
      <SolutionLayout title="Очередь">
        <form className={queueStyle.form}>
          <div className={queueStyle.container}>
            <Input
                maxLength={4}
                isLimitText={true}
                value={input}
                onChange={handleChangeInput}
            />
            <Button
                text="Добавить"
                disabled={input === '' || color}
                onClick={handleAdd}
            />
            <Button
                text="Удалить"
                disabled={queue.isEmpty() || color}
                onClick={handleDelete}
            />
          </div>
          <Button
              text="Очистить"
              disabled={!queue.getHead() && !queue.getTail() || color}
              onClick={handleClear}
          />
        </form>
        <div className={queueStyle.circles}>
          {queueArr && queueArr.slice(0, 7).map((item, index) => {
            return (
                <Circle
                    key={index}
                    letter={item.value}
                    index={index}
                    state={item.color}
                    head={(index === queue.getHead() && !queue.isEmpty()) || item.head ? 'head' : ''}
                    tail={(index === queue.getTail() - 1 && !queue.isEmpty()) ? 'tail' : ''} />
                )
          })}
        </div>
      </SolutionLayout>
  );
};










