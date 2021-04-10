import * as React from "react";
import {NavLink} from "react-router-dom";
import styles from "./stylesButton.module.css";

interface ButtonProps {
    buttonName: string;
    linkTo: string;
}

export function SecondaryButton({buttonName, linkTo}: ButtonProps): React.ReactElement {
    return (
        <NavLink to={linkTo} className={styles.addLink}>
            <button className={styles.secondaryButton}><p>{buttonName}</p></button>
        </NavLink>
    )
}