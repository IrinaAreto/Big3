import {createSlice} from '@reduxjs/toolkit';
import {uploadPhotoTeam} from './UploadPhotoTeamThunk';
import {uploadTeamCard} from './UploadTeamCardThunk';
import {fetchTeamDetails} from './FetchTeamDetailsThunk';
import {deleteTeamDetails} from './DeleteTeamDetailsThunk';
import {deletePhotoTeam} from './DeletePhotoTeamThunk';
import {editTeamCard} from './EditTeamCardThunk';
import {ITeamDetails} from '../../core/redux/types/ITeamDetails';

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

        builder.addCase(deleteTeamDetails.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.name = '';
            state.foundationYear = 0;
            state.division = '';
            state.conference = '';
            state.imageUrl = '';
            state.id = 0;
        })
        builder.addCase((deleteTeamDetails.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((deleteTeamDetails.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })

        builder.addCase(deletePhotoTeam.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
        })
        builder.addCase((deletePhotoTeam.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((deletePhotoTeam.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })

        builder.addCase(editTeamCard.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.name = payload.name;
            state.foundationYear = payload.foundationYear;
            state.division = payload.division;
            state.conference = payload.conference;
            state.imageUrl = payload.imageUrl;
            state.id = payload.id;
        })
        builder.addCase((editTeamCard.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((editTeamCard.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const {clearState} = teamDetailsSlice.actions;
