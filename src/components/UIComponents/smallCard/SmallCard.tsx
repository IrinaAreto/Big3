import * as React from "react";
import styles from "./styles.module.css";
import classNames from 'classnames';

interface SmallCardProps {
    cardType?: string;
    name: string;
    foundationYear: number;
    imageUrl: string;
    number?: string;
}

export function SmallCard({cardType, name, foundationYear, imageUrl, number}: SmallCardProps): React.ReactElement {
    let photoPosition: string = classNames(styles.upperPart, cardType === "playerCard" ? styles.upperPartPlayer : "");
    let numberStyle: string = classNames(styles.playerNumber, styles.name);

    return (
        <div className={styles.smallCard}>
            <div className={photoPosition}><img src={imageUrl} alt="team logo"/></div>
            <div className={styles.lowerPart}>
                <div>{cardType === "playerCard" ?
                    <div className={styles.nameNumber}><p className={styles.name}>{name}</p><p
                        className={numberStyle}>{number}</p></div> :
                    <p className={styles.name}>{name}</p>}
                    <p className={styles.details}>Year of foundation: {foundationYear}</p></div>
            </div>
        </div>
    )
}