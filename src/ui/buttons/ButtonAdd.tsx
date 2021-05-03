import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {IButtonProps} from '../../core/redux/types/IButtonProps';
import styles from './stylesButton.module.css';

export function ButtonAdd({buttonName, linkTo}: IButtonProps): React.ReactElement {
    return (
        <NavLink to={linkTo} className={styles.addLink}>
            <button className={styles.add}><p>{buttonName}</p><p>+</p></button>
        </NavLink>
    )
}
