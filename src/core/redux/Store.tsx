import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {userSlice} from '../../modules/user/userSlice';
import {teamsSlice} from '../../modules/teams/teamsSlice';
import {teamDetailsSlice} from '../../modules/teamDetails/teamDetailsSlice';

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
});

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        teams: teamsSlice.reducer,
        teamDetails: teamDetailsSlice.reducer,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
