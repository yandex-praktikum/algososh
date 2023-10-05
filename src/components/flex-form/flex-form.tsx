import React, {FormEventHandler} from "react";
import styles from './flex-form.module.css'

interface IFlexForm {
  onSubmit: FormEventHandler<HTMLFormElement>,
  onReset?: FormEventHandler<HTMLFormElement>
  extraClass?: string,
}

export const FlexForm: React.FC<IFlexForm> = ({children, onSubmit, onReset, extraClass=''}) => {

  return (
      <form name='inputForm' onSubmit={onSubmit} onReset={onReset} className={`${styles.form} ${extraClass}`}>
        {children}
      </form>
  );
};
