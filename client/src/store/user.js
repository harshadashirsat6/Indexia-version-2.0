import { createSlice } from '@reduxjs/toolkit'


const initialState={
    userBasicDetails:null
}

const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUserBasicDetails:(state,{payload})=>{
            state.userBasicDetails=payload
        }
    }
})


export default userSlice.reducer
export const {setUserBasicDetails}=userSlice.actions