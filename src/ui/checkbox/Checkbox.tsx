import * as React from 'react';
import styles from './stylesCheckbox.module.css';

interface ICheckboxProps {
    name: string,
    checkboxText: string,
    id: string
}

export const Checkbox = React.forwardRef(({name, checkboxText, id}: ICheckboxProps, ref: any): React.ReactElement => {
    return (
        <div className={styles.checkboxContainer}>
            <input className={styles.customCheckbox} name={name} type='checkbox' ref={ref} id={id}/>
            <label htmlFor={id}>{checkboxText}</label>
        </div>
    )
})