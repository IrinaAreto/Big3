import {ITeamCard} from './ITeamCard';

export interface ITeams {
    data: ITeamCard[],
    count: number,
    page: number,
    size: number,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage?: string
}
