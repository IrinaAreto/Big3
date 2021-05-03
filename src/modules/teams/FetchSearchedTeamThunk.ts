import {createAsyncThunk} from '@reduxjs/toolkit';
import {SearchedItem} from '../../core/redux/types/SearchedItem';
import {baseURL} from '../../api/BaseUrl';

export const fetchSearchedTeam = createAsyncThunk(
    'teams/fetchSearchedTeam',
    async ({name, token}: SearchedItem, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/Team/GetTeams?Name=${name}`,
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
