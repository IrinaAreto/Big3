import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "./Store";
import {SendCard, SendPhoto, IAddTeam} from "./types";

const initialState: IAddTeam = {
    data: {
        name: '',
        foundationYear: 0,
        division: '',
        conference: '',
        imageUrl: '',
        id: 0
    },
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const uploadPhotoTeam = createAsyncThunk(
    'addteam/uploadPhotoTeam',
    async ({uploadingImage, collectedData, token}: SendPhoto, thunkAPI) => {
        if (!uploadingImage)
            return;

        const formData = new FormData();
        formData.append('file', uploadingImage, uploadingImage.name);
        try {
            const response = await fetch(
                'http://dev.trainee.dex-it.ru/api/Image/SaveImage',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    body: formData
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                collectedData.imageUrl = 'http://dev.trainee.dex-it.ru' + data;
                thunkAPI.dispatch(uploadTeamCard({collectedData: collectedData, token: token}));
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
export const uploadTeamCard = createAsyncThunk(
    'addteam/uploadTeamCard',
    async ({collectedData, token}: SendCard, thunkAPI) => {
        try {
            const response = await fetch(
                'http://dev.trainee.dex-it.ru/api/Team/Add',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(collectedData)
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                return {...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const teamsSlice = createSlice({
    name: 'addteam',
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
        builder.addCase(uploadPhotoTeam.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
        })
        builder.addCase((uploadPhotoTeam.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((uploadPhotoTeam.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })

        builder.addCase(uploadTeamCard.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
        })
        builder.addCase((uploadTeamCard.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((uploadTeamCard.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const addTeamSelector = (state: RootState) => state.teams;
export const {clearState} = teamsSlice.actions;
