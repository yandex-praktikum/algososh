import { useState, ChangeEvent } from 'react';

interface IInputValues {
  [key: string]: string | number;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearValue = (name: string) => {
    const isString = typeof inputValues[name] === 'string';
    setValues((prevState) => ({ ...prevState, [name]: isString ? '' : -1 }));
  };

  return { values, handleChange, setValues, clearValue };
}
