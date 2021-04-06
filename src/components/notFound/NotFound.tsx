import * as React from "react";
import {ReactComponent as NotFoundPicture} from "../svgs/notFound.svg";
import styles from "./styles.module.css";

export function NotFound(): React.ReactElement {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.container}>
                <NotFoundPicture className={styles.notFoundPic}/>
                <p className={styles.notFoundText1}>Page not found</p>
                <p className={styles.notFoundText2}>Sorry, we can’t find what you’re looking for</p>
            </div>
        </div>
    )
}