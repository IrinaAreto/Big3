import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {IButtonProps} from '../../core/redux/types/IButtonProps';
import styles from './stylesButton.module.css';

export function SecondaryButton({buttonName, linkTo}: IButtonProps): React.ReactElement {
    return (
        <NavLink to={linkTo} className={styles.addLink}>
            <button className={styles.secondaryButton}><p>{buttonName}</p></button>
        </NavLink>
    )
}