import {createAsyncThunk} from '@reduxjs/toolkit';
import {PagesFetch} from '../../core/redux/types/PagesFetch';
import {baseURL} from '../../api/BaseUrl';

export const fetchTeamsCards = createAsyncThunk(
    'teams/fetchTeams',
    async ({page, pageSize, token}: PagesFetch, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/api/Team/GetTeams?Name=%20&Page=${page}&PageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                return {...data};
            } else {
                console.log('data', data);
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
