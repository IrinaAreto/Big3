import * as React from "react";
import styles from "./styles.module.css";
/*import {ReactComponent as TeamLogo} from "../../svgs/tempSvg/POR 1.svg";*/
import {ReactComponent as PlayerLogo} from "../../svgs/tempSvg/photo.svg";
import classNames from 'classnames';

interface SmallCardProps {
    cardType?: string;
    itemName: string;
    itemDetails: string;
    number?: string;
}

export function SmallCard({cardType, itemName, itemDetails, number}: SmallCardProps): React.ReactElement {
    let photoPosition: string = classNames(styles.upperPart, cardType === "playerCard" ? styles.upperPartPlayer : "");
    let numberStyle: string = classNames(styles.playerNumber, styles.name);

    return (
        <div className={styles.smallCard}>
            <div className={photoPosition}><PlayerLogo/></div>
            <div className={styles.lowerPart}>
                <div>{cardType === "playerCard" ?
                    <div className={styles.nameNumber}><p className={styles.name}>{itemName}</p><p
                        className={numberStyle}>{number}</p></div> :
                    <p className={styles.name}>{itemName}</p>}
                    <p className={styles.details}>{itemDetails}</p></div>
            </div>
        </div>
    )
}