import * as React from "react";
import {NavLink} from "react-router-dom";
import {useRouteMatch} from "react-router-dom";
import {useAppDispatch} from "../../store/Hooks";
import {signOut} from "../../store/userSlice";
import {ReactComponent as GroupPerson} from "../svgs/group_person_rounded.svg";
import {ReactComponent as Person} from "../svgs/person_rounded.svg";
import {ReactComponent as SignOut} from "../svgs/input_rounded.svg";
import styles from "./styles.module.css";

export function Sidebar(): React.ReactElement {
    const dispatch = useAppDispatch();
    let {url} = useRouteMatch();

    const onSignOut = async () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("avatarUrl");
        await dispatch(signOut());
    }

    return (
        <div className={styles.sidebar}>
            <ul className={styles.sidebarMenu}>
                <li><NavLink to={`${url}/teams`} activeClassName={styles.activeLink} className={styles.menuItem}>
                    <GroupPerson className={styles.menuIcon}/>Teams</NavLink></li>
                <li><NavLink to={`${url}/players`} activeClassName={styles.activeLink} className={styles.menuItem}>
                    <Person className={styles.menuIcon}/>Players</NavLink></li>
            </ul>
            <div className={styles.signout} onClick={onSignOut}><SignOut
                className={styles.signoutIcon}/><p
                className={styles.signOutName}>Sign out</p></div>
        </div>
    )
}