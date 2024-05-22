import { createSlice } from "@reduxjs/toolkit";

const bugsSlice = createSlice({
    name:"bugs",
    initialState:{
        bugsArray:null,
        setBugIndex:null,
        needUpdateBug:null,
        isUpdateForm:false
    },
    reducers:{
        storeBugs:(state,action)=>{
            state.bugsArray = action.payload;
        },
        storeBugIndex:(state,action)=>{
            state.setBugIndex = action.payload;
        },
        updateBug:(state,action)=>{
            state.needUpdateBug=action.payload;
            state.isUpdateForm=!(state.isUpdateForm);
        }
    }
})

export default bugsSlice.reducer;
export const {storeBugs, storeBugIndex,updateBug} = bugsSlice.actions;