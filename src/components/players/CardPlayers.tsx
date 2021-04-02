import * as React from "react";
import {Search} from "../UIElements/Search";
import {Button} from "../UIElements/Button";
import {SmallCard} from "../UIComponents/smallCard/SmallCard";
import styles from "./stylesCardPlayers.module.css";

export function CardsPlayer(): React.ReactElement {
    return (
        <>
            <div className={styles.searchAdd}>
                <Search/>
                <Button buttonName="Add" buttonType="add"/>
            </div>
            <div><SmallCard cardType="playerCard" itemName="Portland trail blazers"
                            itemDetails="Jaylen Adams" number="#10"/></div>
        </>
    )
}
