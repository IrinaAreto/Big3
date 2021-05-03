import * as React from 'react';
import {useAppSelector} from '../../core/hooks/Hooks';
import {userSelector} from '../../modules/user/UserSelector';
import {ReactComponent as Logo} from '../../assets/svgs/logo.svg';
import {ReactComponent as Profile} from '../../assets/svgs/profile_rounded.svg';
import styles from './styles.module.css';

export function Header(): React.ReactElement {
    const user = useAppSelector(userSelector);

    return (
        <div className={styles.header}>
            <div><Logo className={styles.headerLogo}/></div>
            <div className={styles.userData}>
                <p>{user.username}</p>{(user.avatarUrl !== 'null' && user.avatarUrl !== null) ?
                <img src={user.avatarUrl} className={styles.profilePicture} alt='profile pic'/> :
                <Profile className={styles.profilePicture}/>}</div>
        </div>
    )
}