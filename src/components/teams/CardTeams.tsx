import * as React from "react";
import {useState} from "react";
import {Pagination} from "../UIComponents/pagination/Pagination";
import {Search} from "../UIElements/Search";
import {Button} from "../UIElements/Button";
import {SmallCard} from "../UIComponents/smallCard/SmallCard";
import {NumberOfItemsOnPage} from "../UIComponents/pagination/NumberOfItemsOnPage";
import styles from "./stylesCardTeam.module.css";
import {teamCardsArray} from "../teamCardsArray";

export function CardsTeams(): React.ReactElement {
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
        <SmallCard itemName={item.itemName} itemDetails={item.itemDetails} key={item.itemName}/>)
    )

    return (
        <>
            <div className={styles.searchAdd}>
                <Search/>
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
