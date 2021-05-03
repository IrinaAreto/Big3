import {createAsyncThunk} from '@reduxjs/toolkit';
import {PhotoDetails} from '../../core/redux/types/PhotoDetails';
import {baseURL} from '../../api/BaseUrl';

export const deletePhotoTeam = createAsyncThunk(
    'teamDetails/deletePhotoTeam',
    async ({imageURL, token}: PhotoDetails, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/Image/DeleteImage?fileName=${imageURL}`,
                {
                    method: 'DELETE',
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
