import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    loading: false,
    userConfig: null,
    subDetails: null,
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
        }

    },
});


export const {setLoading,setUser,setUserConfig,setSubDetails } = profileSlice.actions;
export default profileSlice.reducer;