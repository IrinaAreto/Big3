import * as React from 'react';
import styles from './styles.module.css';

export function Loader(): React.ReactElement {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loadingCircle}/>
        </div>
    )
}