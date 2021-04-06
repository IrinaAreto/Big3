import * as React from "react";
import {Header} from "../header/Header";
import {RouterSwitchForAuthorized} from "../routerSwitch/RouterSwitchForAuthotized";
import {Sidebar} from "../sidebar/Sidebar";
import styles from "./styles.module.css";

export function Main(): React.ReactElement {
    return (
        <div className={styles.layoutForAuth}>
            <Header/>
            <Sidebar/>
            <main className={styles.mainPart}>
                <RouterSwitchForAuthorized/>
            </main>
        </div>
    )
}