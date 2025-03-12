import { configureStore } from "@reduxjs/toolkit";
import VideoSlice from '../redux-slicer/video-slice.jsx'


export default configureStore(
    {
        reducer: { VideoNav: VideoSlice }
    }
)