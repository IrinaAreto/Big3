import * as React from "react";
import classNames from 'classnames';
import styles from "./stylesButton.module.css";

interface ButtonProps {
    buttonName: string;
    buttonSize: string;
}

export function ButtonSubmit({buttonName, buttonSize}: ButtonProps): React.ReactElement {
    let buttonClass: string = "";
    if (buttonSize === "short") buttonClass = classNames(styles.button, styles.shortButton);
    else buttonClass = classNames(styles.button, styles.longButton);

    return (
        <div>
            <button type="submit" className={buttonClass}><p>{buttonName}</p></button>
        </div>
    )
}