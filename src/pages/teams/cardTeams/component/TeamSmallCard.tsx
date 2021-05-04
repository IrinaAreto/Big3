import * as React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../../../../ui/smallCardsStyles/smallCardStyles.module.css';

interface ISmallCardProps {
    name: string;
    foundationYear: number;
    imageUrl: string;
    linkTo: string;
    onClick: () => void;
}

export function TeamSmallCard({
                                  name,
                                  foundationYear,
                                  imageUrl,
                                  linkTo,
                                  onClick
                              }: ISmallCardProps): React.ReactElement {
    return (
        <div className={styles.smallCard}>
            <NavLink to={linkTo} className={styles.linkStyle} onClick={onClick}>
                <div className={styles.upperPart}>
                    <img src={imageUrl} alt='team logo'/>
                </div>
                <div className={styles.lowerPart}>
                    <div>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.details}>Year of foundation: {foundationYear}</p></div>
                </div>
            </NavLink>
        </div>
    )
}