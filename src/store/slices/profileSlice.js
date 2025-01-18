import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    loading: false,
    userConfig: null,
    subDetails: null,
    showIntroModal: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload;
          },
        setUser(state, value) {
            state.user = value.payload;
        },
        setUserConfig(state, value) {
            state.userConfig = value.payload;
        },
        setSubDetails(state, value) {
            state.subDetails = value.payload;
        },
        setShowIntroModal(state, value) {
            state.showIntroModal = value.payload;
        }
        

    },
});


export const {setLoading,setUser,setUserConfig,setSubDetails ,setShowIntroModal} = profileSlice.actions;
export default profileSlice.reducer;