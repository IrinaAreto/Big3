import * as React from "react";
import {NavLink} from "react-router-dom";
import styles from "./stylesButton.module.css";

interface ButtonProps {
    buttonName: string;
    linkTo: string;
}

export function ButtonAdd({buttonName, linkTo}: ButtonProps): React.ReactElement {
    return (
        <NavLink to={linkTo} className={styles.addLink}>
            <button className={styles.add}><p>{buttonName}</p><p>+</p></button>
        </NavLink>
    )
}
