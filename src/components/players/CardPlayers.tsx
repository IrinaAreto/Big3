import * as React from "react";
import {useState} from "react";
import {Search} from "../UIElements/Search";
import {Button} from "../UIElements/Button";
import {SmallCard} from "../UIComponents/smallCard/SmallCard";
import styles from "./stylesCardPlayers.module.css";
import {teamCardsArray} from "../teamCardsArray";
import {Pagination} from "../UIComponents/pagination/Pagination";
import {NumberOfItemsOnPage} from "../UIComponents/pagination/NumberOfItemsOnPage";

export function CardsPlayer(): React.ReactElement {
    let [currentPage, setCurrentPage] = useState<number>(0);
    let [itemsOnPage, setItemsOnPage] = useState<number>(6);
    let handlePageClick = (selectedItem: { selected: number }): void => {
        setCurrentPage(selectedItem.selected);
    };
    const selectNumberOfItems = (num: number) => {
        setItemsOnPage(num);
    };

    const offset = currentPage * itemsOnPage;
    let pageCount = Math.ceil(teamCardsArray.length / itemsOnPage);

    const currentPageData = teamCardsArray.slice(offset, offset + itemsOnPage).map((item) => (
        <SmallCard cardType="playerCard" name={item.itemName} foundationYear={item.foundationYear} imageUrl={item.itemName} number="#10"
                   key={item.itemName}/>)
    )

    return (
        <>
            <div className={styles.searchAdd}>
                <div><Search/><div></div></div>
                <Button buttonName="Add" buttonType="add"/>
            </div>
            <div className={styles.cardsContainer}>
                {currentPageData}
            </div>
            <div className={styles.pagination}>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick}/>
                <NumberOfItemsOnPage selectNumberOfItems={selectNumberOfItems}/>
            </div>
        </>
    )
}
