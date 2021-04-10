import * as React from "react";
import {useState, useEffect} from "react";
import {Pagination} from "../UIComponents/pagination/Pagination";
import {Search} from "../UIElements/Search";
import {ButtonAdd} from "../UIElements/ButtonAdd";
import {SmallCard} from "../UIComponents/smallCard/SmallCard";
import {NumberOfItemsOnPage} from "../UIComponents/pagination/NumberOfItemsOnPage";
import {TeamsEmpty} from "./TeamsEmpty";
import {useAppSelector, useAppDispatch} from "../../store/Hooks";
import {fetchTeamsCards, teamsSelector} from "../../store/teamsSlice";
import styles from "./stylesCardTeam.module.css";

export function CardsTeams(): React.ReactElement {
    let [currentPage, setCurrentPage] = useState<number>(1);
    let [itemsOnPage, setItemsOnPage] = useState<number>(6);
    let handlePageClick = (selectedItem: { selected: number }): void => {
        setCurrentPage(selectedItem.selected);
    };
    const selectNumberOfItems = (num: number) => {
        setItemsOnPage(num);
    };

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTeamsCards({page: currentPage, pageSize: itemsOnPage, token: localStorage.getItem('token')}))
    }, [])

    const teams = useAppSelector(teamsSelector);

    let pageCount = Math.ceil(teams.count / itemsOnPage);

    const currentPageData = teams.data.map((item) => (
        <SmallCard cardType="teamCard" name={item.name} foundationYear={item.foundationYear} imageUrl={item.imageUrl}
                   key={item.id}/>)
    )

    return (
        <>
            <div className={styles.searchAdd}>
                <Search/>
                <ButtonAdd buttonName="Add" linkTo='/main/teams/addTeam'/>
            </div>
            {teams.count > 0 ?
                <div className={styles.cardsContainer}>
                    {currentPageData}
                </div> :
                <TeamsEmpty/>}
            <div className={styles.pagination}>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick}/>
                <NumberOfItemsOnPage selectNumberOfItems={selectNumberOfItems}/>
            </div>
        </>
    )
}
