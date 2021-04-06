import * as React from "react";
import {ReactComponent as NoTeams} from "../svgs/illustration.svg";
import styles from "./stylesTeamEmpty.module.css";

export function TeamsEmpty(): React.ReactElement {
    return (
        <div className={styles.teamEmpty}>
            <div className={styles.container}>
                <NoTeams className={styles.teamsEmptyPic}/>
                <p className={styles.textEmpty}>Empty here</p>
                <p className={styles.textAddNew}>Add new teams to continue</p>
            </div>
        </div>
    )
}