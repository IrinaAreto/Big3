import {createAsyncThunk} from '@reduxjs/toolkit';
import {PagesFetch} from '../../core/redux/types/PagesFetch';
import {baseURL} from '../../api/BaseUrl';

export const fetchPlayersCards = createAsyncThunk(
    'players/fetchPlayers',
    async ({page, pageSize, token}: PagesFetch, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/api/Player/GetPlayers?Page=${page}&PageSize=${pageSize}`,
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
