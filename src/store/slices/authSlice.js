import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    loginError:null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload
        }

    }
})



export const  {setLoading,setLoginError } = authSlice.actions
export default authSlice.reducer