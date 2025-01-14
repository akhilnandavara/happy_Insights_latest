import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    loginError: null,
    signSuccessMsg: null,
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
        },
        setSignUpSuccessMsg: (state, action) => {
            console.log("action.payload", action.payload)
            state.signSuccessMsg = action.payload
        }
    }
})



export const { setLoading, setLoginError, setSignUpSuccessMsg } = authSlice.actions
export default authSlice.reducer