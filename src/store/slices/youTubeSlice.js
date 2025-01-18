import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    videoList: [],
    commentsList: [],
    showStats: false,
};

const youTubeSlice = createSlice({
    name: "youtube",
    initialState: initialState,

    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setVideoList(state, action) {
            state.videoList = action.payload;
        },
        setCommentsList(state, action) {
            state.commentsList = action.payload;
        },
        setShowStats(state, action) {
            state.showStats = action.payload;
        }
    },
});


export const { setLoading, setVideoList, setCommentsList,setShowStats } = youTubeSlice.actions;
export default youTubeSlice.reducer;