import { log } from "console";
import { useState } from "react";

export function useForm<T>(inputValues: T) {
    const [values, setValues] = useState(inputValues);
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}