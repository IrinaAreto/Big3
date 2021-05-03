import {createAsyncThunk} from '@reduxjs/toolkit';
import {TeamDetails} from '../../core/redux/types/TeamDetails';
import {baseURL} from '../../api/BaseUrl';

export const fetchTeamDetails = createAsyncThunk(
    'teamDetails/fetchTeamDetails',
    async ({id, token}: TeamDetails, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/Team/Get?id=${id}`,
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
