import { configureStore } from '@reduxjs/toolkit';
import linksSliceReducer from '../features/linksSlice';
import profileSliceReducer from '../features/profileSlice';
const store = configureStore({
    reducer: {
        links: linksSliceReducer,
        profile: profileSliceReducer
    }
})

export default store;