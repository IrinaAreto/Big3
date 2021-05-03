export interface ITeamDetails {
    name: string,
    foundationYear: number,
    division: string,
    conference: string,
    imageUrl: string,
    id: number,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage?: string
}
