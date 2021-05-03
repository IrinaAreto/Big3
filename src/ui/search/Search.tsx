import * as React from 'react';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../core/hooks/Hooks';
import {fetchSearchedTeam} from '../../modules/teams/FetchSearchedTeamThunk';
import {ReactComponent as SearchSvg} from '../../assets/svgs/search_rounded.svg';
import styles from './stylesSearch.module.css';

export function Search(): React.ReactElement {
    const [searchedValue, setSearchedValue] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedValue(event.target.value);
    }

    const dispatch = useAppDispatch();

    useEffect(() => {
        const delayFn = setTimeout(() => {
            console.log('value: ', searchedValue);
            let value = '';
            if (searchedValue) {
                value = searchedValue[0].toUpperCase() + searchedValue.slice(1);
            }
            dispatch(fetchSearchedTeam({name: value, token: localStorage.getItem('token')}));
        }, 3000)
        return () => clearTimeout(delayFn);
    }, [searchedValue])

    return (
        <div className={styles.search}>
            <input className={styles.searchInput} type='text' placeholder='Search...' value={searchedValue}
                   onChange={handleChange}/>
            <SearchSvg className={styles.searchIcon}/>
        </div>
    )
}