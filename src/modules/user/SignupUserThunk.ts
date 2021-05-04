import {createAsyncThunk} from '@reduxjs/toolkit';
import {SignUpType} from '../../core/redux/types/SignUpType';
import {baseURL} from '../../api/BaseUrl';

export const signupUser = createAsyncThunk(
    'user/signupUser',
    async (signUpData: SignUpType, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/api/Auth/SignUp`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signUpData)
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.name);
                if (data.avatarUrl !== 'null') {
                    localStorage.setItem('avatarUrl', data.avatarUrl);
                }
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
