import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "./Store";
import {SendCard, SendPhoto, ITeamDetails, TeamDetails} from "./types";

const initialState: ITeamDetails = {
    name: '',
    foundationYear: 0,
    division: '',
    conference: '',
    imageUrl: '',
    id: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const uploadPhotoTeam = createAsyncThunk(
    'teamDetails/uploadPhotoTeam',
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
    'teamDetails/uploadTeamCard',
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

export const fetchTeamDetails = createAsyncThunk(
    'teamDetails/fetchTeamDetails',
    async ({id, token}: TeamDetails, thunkAPI) => {
        try {
            const response = await fetch(
                `http://dev.trainee.dex-it.ru/api/Team/Get?id=${id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
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

export const teamDetailsSlice = createSlice({
    name: 'teamDetails',
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
            state.name = payload.name;
            state.foundationYear = payload.foundationYear;
            state.division = payload.division;
            state.conference = payload.conference;
            state.imageUrl = payload.imageUrl;
            state.id = payload.id;
        })
        builder.addCase((uploadTeamCard.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((uploadTeamCard.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })

        builder.addCase(fetchTeamDetails.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.name = payload.name;
            state.foundationYear = payload.foundationYear;
            state.division = payload.division;
            state.conference = payload.conference;
            state.imageUrl = payload.imageUrl;
            state.id = payload.id;
        })
        builder.addCase((fetchTeamDetails.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((fetchTeamDetails.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const teamDetailsSelector = (state: RootState) => state.teamDetails;
export const {clearState} = teamDetailsSlice.actions;
