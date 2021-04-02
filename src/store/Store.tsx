import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {userSlice} from "./Slice";


const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
});

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
