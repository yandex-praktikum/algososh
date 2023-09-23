import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

//длина контейнера для очереди - 7
const queueLength = 7
//очередь
const queue = new Queue<string>(queueLength);

type propsType = {
  queueArr: (string | undefined)[]
}

type queueType = {
  input: boolean,
  addBtn: boolean,
  removeBtn: boolean,
  clearBtn: boolean,
}

export const QueuePage: React.FC = () => {

  
  const [input, setValue] = useState('')
  const [queueContent, setQueueContent] = useState([...queue.printQueue()]);
  const [current, setCurrent] = useState<number | null>(null);
  const [head, setHead] = useState<number>(queue.queueHead());
  const [tail, setTail] = useState<number>(queue.queueTail());
  const [disable, setDisable] = useState<queueType>({
    input: false,
    addBtn: false,
    removeBtn: false,
    clearBtn: false,
  });

  const onInputChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setValue(value.trim());
  }

  async function dequeue() {
    setDisable({ ...disable, removeBtn: true, input: true });
    
    if (!queue.isEmpty()) {
      setCurrent((head && queue.queueHead()));
      await timeOut();
      queue.dequeue();
      setQueueContent([...queue.printQueue()]);
      
      setHead(queue.queueHead());
      setCurrent(-1);
      await timeOut();
    }
    setDisable({ ...disable, removeBtn: false, input: false });
  }

  async function enqueue(item: string) {
    setDisable({ ...disable, addBtn: true, input: true });
    setValue('')
    setCurrent(tail % queue.getSize());

    await timeOut();
    queue.enqueue(item);
    setQueueContent([...queue.printQueue()]);
    setTail(queue.queueTail());
    setCurrent(null);
    await timeOut();

    setDisable({ ...disable, addBtn: false, input: false });
  }

  const timeOut = () => new Promise<void>(
    resolve => setTimeout(resolve, 200)
);

  function clear() {
    setDisable({ ...disable, clearBtn: true, input: true });

    setValue('');
    queue.clear()
    setQueueContent(queue.printQueue());
    setCurrent(null);
    setHead(queue.queueHead());
    setTail(queue.queueTail());

    setDisable({ ...disable, clearBtn: false, input: false});
  }

function NewQueue({ queueArr }: propsType): any{
    return queueArr.map((item, index: number) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={(index === head && !queue.isEmpty()) ? "head" : ""}
              tail={(index === tail - 1 && !queue.isEmpty()) ? "tail" : ""}
              state={index === current ? ElementStates.Changing : ElementStates.Default}
            />)
        })
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.context}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.conditions}>
            <Input name={'queue'} type="text" maxLength={4} onChange={onInputChange}
              value={input} 
              extraClass="mr-6" 
              disabled={disable.input || tail === queueLength} />
            <Button text="Добавить"
              onClick={() => enqueue(input)}
              disabled={!input || disable.input}
              isLoader={disable.addBtn}></Button>
            <Button text="Удалить"
              disabled={queue.isEmpty() 
              || disable.input 
              || head === queueLength}
              onClick={dequeue} isLoader={disable.removeBtn} 
              />
          </div>
          <Button
            text="Очистить"
            type="button"
            onClick={clear}
            disabled={queue.isEmpty() || disable.input }
            isLoader={disable.clearBtn} />

        </form>
        <p className={styles.limit}> Максимум - 4 символа</p>
      </div>
      <ul className={styles.queue}>
        <NewQueue queueArr={queueContent} />
      </ul >
    </SolutionLayout>
  );
};
