import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        loggedinUserDetails:null,
        empDetails:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.loggedinUserDetails=action.payload;
        },
        removeUser:(state)=>{
            state.loggedinUserDetails=null;
        },
        allEmpDetails:(state,action)=>{
            state.empDetails=action.payload;
        }
    }
})

export default userSlice.reducer;

export const {addUser,removeUser,allEmpDetails} = userSlice.actions;