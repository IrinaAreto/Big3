import {IPlayerCard} from './IPlayerCard';

export interface IPlayers {
    data: IPlayerCard[],
    count: number,
    page: number,
    size: number,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage?: string
}