import {createAsyncThunk} from '@reduxjs/toolkit';
import {SendPhoto} from '../../core/redux/types/SendPhoto';
import {baseURL} from '../../api/BaseUrl';

export const uploadPhotoTeam = createAsyncThunk(
    'teamDetails/uploadPhotoTeam',
    async ({uploadingImage, token}: SendPhoto, thunkAPI) => {
        if (!uploadingImage)
            return;

        const formData = new FormData();
        formData.append('file', uploadingImage, uploadingImage.name);
        try {
            const response = await fetch(
                `${baseURL}/api/Image/SaveImage`,
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
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
