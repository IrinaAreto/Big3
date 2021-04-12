import * as React from "react";
import {useAppSelector} from "../../../../store/Hooks";
import {teamDetailsSelector} from "../../../../store/teamDetailsSlice";
import {ReactComponent as Pencil} from "../../../svgs/create_rounded.svg";
import {ReactComponent as Garbage} from "../../../svgs/delete_rounded.svg";
import styles from "./styles.module.css";

export function TeamCardDetails(): React.ReactElement {
    const teamDetails = useAppSelector(teamDetailsSelector);

    return (
        <div className={styles.cardContainer}>
            <div className={styles.upperPart}>
                <p className={styles.namePath}>Teams / {teamDetails.name}</p>
                <div className={styles.addDelete}>
                    <Pencil className={styles.iconPencil}/>
                    <Garbage className={styles.iconGarbage}/>
                </div>
            </div>
            <div className={styles.lowerPart}>
                <div className={styles.teamLogo}>
                    <img className={styles.logoImg} src={teamDetails.imageUrl}/>
                </div>
                <div className={styles.teamInfo}>
                    <div><p className={styles.teamName}>{teamDetails.name}</p></div>
                    <div className={styles.firstLine}>
                        <div><p className={styles.label}>Year of foundation</p>
                            <p className={styles.teamData}>{teamDetails.foundationYear}</p></div>
                        <div><p className={styles.label}>Division</p>
                            <p className={styles.teamData}>{teamDetails.division}</p></div>
                    </div>
                    <div><p className={styles.label}>Conference</p>
                        <p className={styles.teamData}>{teamDetails.conference}</p></div>
                </div>
            </div>
        </div>
    )
}