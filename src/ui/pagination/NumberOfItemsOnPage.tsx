import * as React from 'react';
import Select from 'react-select';
import {options} from '../../core/constants/SelectOptions';
import styles from './stylesNumberOfItems.module.css';

interface INumberOfItemsOnPageProps {
    selectNumberOfItems: (num: number) => void;
}

export function NumberOfItemsOnPage({selectNumberOfItems}: INumberOfItemsOnPageProps): React.ReactElement {
    return (
        <div className={styles.selectBlock}>
            <Select className={styles.select}
                    options={options}
                    defaultValue={options[0]}
                    menuPlacement={'top'}
                    onChange={value => value !== null ? selectNumberOfItems(+value.value) : ''}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: 'none',
                            primary50: 'none',
                            primary: 'none',
                            neutral0: '#9C9C9C',
                        },
                    })}
            />
        </div>
    )
}