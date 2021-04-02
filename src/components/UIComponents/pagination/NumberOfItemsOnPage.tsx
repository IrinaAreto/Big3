import * as React from "react";
import Select from "react-select";
import styles from "./stylesNumberOfItems.module.css";

interface NumberOfItemsOnPageProps {
    selectNumberOfItems: (num: number) => void;
}

interface SelectOptions {
    value: string;
    label: string;
}

type OptionsArray = SelectOptions[];

export function NumberOfItemsOnPage({selectNumberOfItems}: NumberOfItemsOnPageProps): React.ReactElement {
    const options: OptionsArray = [
        {value: '6', label: '6'},
        {value: '12', label: '12'},
        {value: '24', label: '24'}
    ]

    return (
        <div className={styles.selectBlock}>
            <Select className={styles.select}
                    options={options}
                    defaultValue={options[0]}
                    menuPlacement={"top"}
                    onChange={value => value !== null ? selectNumberOfItems(+value.value) : ""}
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