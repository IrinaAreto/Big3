import * as React from 'react';
import {useState, useEffect} from 'react';
import {Search} from '../../../ui/search/Search';
import {ButtonAdd} from '../../../ui/buttons/ButtonAdd';
import {PlayerSmallCard} from './component/PlayerSmallCard';
import {Pagination} from '../../../ui/pagination/Pagination';
import {NumberOfItemsOnPage} from '../../../ui/pagination/NumberOfItemsOnPage';
import {useAppDispatch, useAppSelector} from '../../../core/hooks/Hooks';
import {fetchPlayersCards} from '../../../modules/players/FetchPlayersCardsThunk';
import {playersSelector} from '../../../modules/players/PlayersSelector';
import {TeamsEmpty} from '../../teams/emptyPage/TeamsEmpty';
import styles from './stylesCardPlayers.module.css';

export function CardsPlayer(): React.ReactElement {
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
        dispatch(fetchPlayersCards({page: currentPage, pageSize: itemsOnPage, token: localStorage.getItem('token')}))
    }, [currentPage, itemsOnPage])

    const players = useAppSelector(playersSelector);

    let pageCount = Math.ceil(players.count / itemsOnPage);

    const currentPageData = players.data.map((item) => (
        <PlayerSmallCard name={item.name} number={item.number} team={item.team} avatarUrl={item.avatarUrl}
                         linkTo={`/main/players/PlayerDetails/${item.name}`}
                         onClick={() => (console.log('player'))}
                         key={item.id}/>)
    )

    return (
        <>
            <div className={styles.searchAdd}>
                <div><Search/>
                    <div></div>
                </div>
                <ButtonAdd buttonName='Add' linkTo='/main/players/addPlayer'/>
            </div>
            {players.count > 0 ?
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
