import * as React from "react";
import {useState} from "react";
import {ReactComponent as OpenedEye} from "../svgs/eye_rounded.svg";
import {ReactComponent as ClosedEye} from "../svgs/close_eye_rounded.svg";
import styles from "./stylesInput.module.css";

interface InputProps {
    name: string,
    inputLineName: string;
    inputType: string;
}

export const Input = React.forwardRef(({name, inputLineName, inputType}: InputProps, ref:any): React.ReactElement => {
    let [showingPassword, setShowingPassword] = useState(false);
    const showPassword = () => {
        setShowingPassword(!showingPassword);
    }

    const setInputType = () => {
        if (inputType === "login") return "text";
        else if (inputType === "pswd") return showingPassword ? "text" : "password";
    }

    return (
        <div className={styles.input}>
            <div className={styles.inputName}>
                <div>{inputLineName}</div>
            </div>
            {
                inputType === "pswd" ? (
                        showingPassword ?
                            <OpenedEye className={styles.displayEye} onClick={showPassword}/> :
                            <ClosedEye className={styles.displayEye} onClick={showPassword}/>
                    ) :
                    null
            }
            <input name={name} ref={ref} className={styles.inputLine} type={setInputType()}/>
        </div>
    )
})
