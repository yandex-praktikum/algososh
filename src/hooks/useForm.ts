import React, { ChangeEvent } from "react";

export function useForm<T extends object> (initialState: T) {
    const [formValues, setFormValues] = React.useState(initialState);

    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        const name = evt.target.name;
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        setFormValues({...formValues, [name]: value});
    }
    return {formValues, setFormValues, onChangeHandler};
}
