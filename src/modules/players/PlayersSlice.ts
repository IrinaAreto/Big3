import {createSlice} from '@reduxjs/toolkit';
import {fetchPlayersCards} from './FetchPlayersCardsThunk';
import {IPlayers} from '../../core/redux/types/IPlayers';

const initialState: IPlayers = {
    data: [],
    count: 0,
    page: 0,
    size: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPlayersCards.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            state.count = payload.count;
            state.page = payload.page;
            state.size = payload.size;
        })
        builder.addCase(fetchPlayersCards.pending, (state, action) => {
            state.isFetching = true;
        })
        builder.addCase(fetchPlayersCards.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const {clearState} = playersSlice.actions;