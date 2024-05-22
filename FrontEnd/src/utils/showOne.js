import { createSlice } from "@reduxjs/toolkit";

const showOne = createSlice({
    name:"showOne",
    initialState:{
        seeForm:false,
        seeBugs:true,
        seeAdminDashBoard:false
    },
    reducers:{
        showForm:(state)=>{
            state.seeForm=!(state.seeForm);
            state.seeBugs=false;
            state.seeAdminDashBoard = false
        },
        showBugs:(state)=>{
            state.seeForm=false;
            state.seeBugs=!(state.seeBugs);
            state.seeAdminDashBoard = false
        },
        showAdminDashBoard:(state)=>{
            state.seeForm=false;
            state.seeBugs=false;
            state.seeAdminDashBoard = !(state.seeAdminDashBoard)
        }
    }
})

export default showOne.reducer;

export const {showForm, showBugs, showAdminDashBoard} = showOne.actions;