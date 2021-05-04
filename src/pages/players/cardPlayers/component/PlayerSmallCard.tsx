import * as React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../../../../ui/smallCardsStyles/smallCardStyles.module.css';
import classNames from 'classnames';

interface IPlayerSmallCardProps {
    name: string;
    number: number;
    team: number;
    avatarUrl: string;
    linkTo: string;
    onClick: () => void;
}

export function PlayerSmallCard({
                                    name,
                                    number,
                                    team,
                                    avatarUrl,
                                    linkTo,
                                    onClick
                                }: IPlayerSmallCardProps): React.ReactElement {
    return (
        <div className={styles.smallCard}>
            <NavLink to={linkTo} className={styles.linkStyle} onClick={onClick}>
                <div className={classNames(styles.upperPart, styles.upperPartPlayer)}>
                    <img src={avatarUrl} alt='player logo'/>
                </div>
                <div className={styles.lowerPart}>
                    <div>
                        <div className={styles.nameNumber}><p className={styles.name}>{name}</p><p
                            className={classNames(styles.playerNumber, styles.name)}>{number}</p></div>
                        <p className={styles.details}>{team}</p></div>
                </div>
            </NavLink>
        </div>
    )
}