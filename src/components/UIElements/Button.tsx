import * as React from "react";
import styles from "./stylesButton.module.css";

interface ButtonProps {
    buttonName: string;
    buttonType: string;
}

export function Button({buttonName, buttonType}: ButtonProps): React.ReactElement {
    let buttonClass: string = "";
    if (buttonType === "signin") buttonClass = styles.button;
    else if (buttonType === "add") buttonClass = styles.add;
    else if (buttonType === "secondaryButton") buttonClass = styles.secondaryButton;

    return (
        <div>
            <button type="submit" className={buttonClass}><p>{buttonName}</p><p>+</p></button>
        </div>
    )
}