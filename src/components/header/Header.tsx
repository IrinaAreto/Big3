import * as React from "react";
import {useAppSelector} from "../../store/Hooks";
import {userSelector} from "../../store/userSlice";
import {ReactComponent as Logo} from "../svgs/logo.svg";
import {ReactComponent as Profile} from "../svgs/profile_rounded.svg";
import styles from "./styles.module.css";

export function Header(): React.ReactElement {
    const user = useAppSelector(userSelector);

    return (
        <div className={styles.header}>
            <div><Logo className={styles.headerLogo}/></div>
            <div className={styles.userData}>
                <p>{user.username}</p>{(user.avatarUrl !== "null" && user.avatarUrl !== null) ?
                <img src={user.avatarUrl} className={styles.profilePicture} alt="profile pic"/> :
                <Profile className={styles.profilePicture}/>}</div>
        </div>
    )
}