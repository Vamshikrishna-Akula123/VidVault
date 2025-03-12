import { createSlice } from "@reduxjs/toolkit";


const VideoSlice = createSlice({
    name: 'VideoNav',
    initialState:{
        Videos: [],
        VideosCount: 0
    },
    reducers: {
        addToViewLater: (state, action)=>{
            state.Videos.push(action.payload);
            state.VideosCount = state.Videos.length;
        }
    }
}) 

export const {addToViewLater} = VideoSlice.actions;
export default VideoSlice.reducer; 