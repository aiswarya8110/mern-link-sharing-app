import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';

export const getPublicProfile = createAsyncThunk("profile/getPublicProfile", async(id, { rejectWithValue })=>{
    try{
        const { data } = await axios.get(BASE_API_URL+`/auth/profile/${id}`);

        return data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err?.response?.data);
    }
})

export const updateProfileInfo = createAsyncThunk("profile/update", async(data, { dispatch, rejectWithValue })=>{
    try{
        const response  = await axios.patch(
            BASE_API_URL+'/auth/profile', 
            data
        );

        setTimeout(()=>{
            dispatch(resetSuccess());
        }, 2000)
        
        return response.data;
    }catch(error){
        return rejectWithValue(error?.response?.data);
    }
})

export const getProfile = createAsyncThunk('profile/get', async(_, { rejectWithValue })=>{
    try{
        const { data } = await axios.get(BASE_API_URL+'/auth/profile');
        return data;

    }catch(error){
        return rejectWithValue(error?.response?.data);
    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileInfo: null,
        isLoading: false,
        isRequestSent: false,
        errorMsg: '',
        success: false,
        publicProfileInfo: null
    },
    reducers: {
        resetSuccess: (state, _)=>{
            state.success = false;
        }
    },
    extraReducers: (builder)=>{
        //  get profile
        builder.addCase("profile/get/pending", (state, _)=>{
            state.isLoading = true;
            state.errorMsg = '';
        }),
        builder.addCase("profile/get/fulfilled", (state, action)=>{
            state.profileInfo = action.payload;
            state.isLoading = false;
            state.errorMsg = '';
        }),
        builder.addCase("profile/get/rejected", (state, action)=>{
            state.errorMsg = action.payload;
            state.isLoading = false;
        }),
        // update profile
        builder.addCase("profile/update/pending", (state, _)=>{
            state.isRequestSent = true;
            state.errorMsg = '';
            state.success = false;
        }),
        builder.addCase("profile/update/fulfilled", (state, action)=>{
            state.isRequestSent = false;
            state.errorMsg = '';
            state.profileInfo = action.payload;
            state.success = true;
        }),
        builder.addCase("profile/update/rejected", (state, action)=>{
            state.errorMsg = action.payload;
            state.success = false;
            state.isRequestSent = false;
        }),
        // get public profile Info
        builder.addCase("profile/getPublicProfile/pending", (state, _)=>{
            state.errorMsg = '';
        }),
        builder.addCase("profile/getPublicProfile/fulfilled", (state, action)=>{
            state.publicProfileInfo = action.payload;
        }),
        builder.addCase("profile/getPublicProfile/rejected", (state, action)=>{
            state.errorMsg = action.payload;
        })
    }
})

const { resetSuccess } = profileSlice.actions;

export default profileSlice.reducer;