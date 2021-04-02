import * as React from "react";
import {ReactComponent as SearchSvg} from "../svgs/search_rounded.svg";
import styles from "./stylesSearch.module.css";

export function Search(): React.ReactElement {
    return (
        <div className={styles.search}>
            <input className={styles.searchInput} type="text" defaultValue="Search..."/>
            <SearchSvg className={styles.searchIcon}/>
        </div>
    )
}