import * as React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Header} from "../header/Header";
import {RouterSwitch} from "../routerSwitch/RouterSwitch";
import {useAppDispatch, useAppSelector} from "../../store/Hooks";
import {userSelector, signOut} from "../../store/Slice";
import {ReactComponent as GroupPerson} from "../svgs/group_person_rounded.svg";
import {ReactComponent as Person} from "../svgs/person_rounded.svg";
import {ReactComponent as SignOut} from "../svgs/input_rounded.svg";
import styles from "./styles.module.css";

export function Sidebar(): React.ReactElement {
    const {token} = useAppSelector(userSelector);
    const dispatch = useAppDispatch();

    const onSignOut = async () => {
        window.localStorage.removeItem("token");
        await dispatch(signOut());
    }

    return (
        <div className={styles.layoutForAuth}>
            {token ?
                <>
                    <Header/>
                    <div className={styles.sidebar}>
                        <ul className={styles.sidebarMenu}>
                            <li><NavLink to="/teams" activeClassName={styles.activeLink}
                                         className={styles.menuItem}><GroupPerson
                                className={styles.menuIcon}/>Teams</NavLink></li>
                            <li><NavLink to="/players" activeClassName={styles.activeLink}
                                         className={styles.menuItem}><Person
                                className={styles.menuIcon}/>Players</NavLink></li>
                        </ul>
                        <div className={styles.signout} onClick={onSignOut}><SignOut
                            className={styles.signoutIcon}/><p
                            className={styles.signOutName}>Sign out</p></div>
                    </div>
                </> : <Redirect to="/auth"/>}
            <main className={token ? styles.mainPart : styles.notAuthMainPart}>
                <RouterSwitch isAuthorized={!!token}/>
            </main>
        </div>
    )
}