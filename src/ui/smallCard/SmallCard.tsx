import * as React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './styles.module.css';
import classNames from 'classnames';

interface ISmallCardProps {
    playerCard: boolean;
    name: string;
    foundationYear: number;
    imageUrl: string;
    number?: string;
    linkTo: string;
    onClick: () => void;
}

export function SmallCard({
                              playerCard,
                              name,
                              foundationYear,
                              imageUrl,
                              number,
                              linkTo,
                              onClick
                          }: ISmallCardProps): React.ReactElement {
    return (
        <div className={styles.smallCard}>
            <NavLink to={linkTo} className={styles.linkStyle} onClick={onClick}>
                <div className={classNames(styles.upperPart, playerCard ? styles.upperPartPlayer : '')}>
                    <img src={imageUrl} alt='team logo'/>
                </div>
                <div className={styles.lowerPart}>
                    <div>{playerCard ?
                        <div className={styles.nameNumber}><p className={styles.name}>{name}</p><p
                            className={classNames(styles.playerNumber, styles.name)}>{number}</p></div> :
                        <p className={styles.name}>{name}</p>}
                        <p className={styles.details}>Year of foundation: {foundationYear}</p></div>
                </div>
            </NavLink>
        </div>
    )
}