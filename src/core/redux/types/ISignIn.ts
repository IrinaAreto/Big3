export interface ISignIn {
    username: string,
    avatarUrl: string | null,
    token: string,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage?: string
}
