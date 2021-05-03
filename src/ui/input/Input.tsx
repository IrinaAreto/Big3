import * as React from 'react';
import {useState} from 'react';
import {ReactComponent as OpenedEye} from '../../assets/svgs/eye_rounded.svg';
import {ReactComponent as ClosedEye} from '../../assets/svgs/close_eye_rounded.svg';
import styles from './stylesInput.module.css';
import classNames from 'classnames';

interface IInputProps {
    name: string,
    inputLineName: string;
    inputType: string;
    err?: boolean;
}

export const Input = React.forwardRef(({
                                           name,
                                           inputLineName,
                                           inputType,
                                           err
                                       }: IInputProps, ref: any): React.ReactElement => {
    let [showingPassword, setShowingPassword] = useState<boolean>(false);
    const showPassword = () => {
        setShowingPassword(!showingPassword);
    }

    const setInputType = () => {
        if (inputType === 'inputTxt') return 'text';
        else if (inputType === 'pswd') return showingPassword ? 'text' : 'password';
        else return;
    }

    return (
        <div className={classNames(styles.input, err ? styles.errHeight : '')}>
            <div className={styles.inputName}>
                <div>{inputLineName}</div>
            </div>
            {
                inputType === 'pswd' ? (
                        showingPassword ?
                            <OpenedEye className={styles.displayEye} onClick={showPassword}/> :
                            <ClosedEye className={styles.displayEye} onClick={showPassword}/>
                    ) :
                    null
            }
            <input name={name} ref={ref} className={styles.inputLine} type={setInputType()}/>
            {err ? <div className={styles.errorMessage}>Wrong password. Please, try again.</div> : ''}
        </div>
    )
})
