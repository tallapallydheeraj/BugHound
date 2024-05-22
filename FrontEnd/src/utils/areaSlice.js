import { createSlice } from "@reduxjs/toolkit";

const areaSlice = createSlice({
    name:"area",
    initialState:{
        areaData:null,
        functionalAreas:null,
    },
    reducers:{
        addArea:(state,action)=>{
            state.areaData = action.payload
        },
        addFunctionalAreaByProgramId:(state,action)=>{
            state.functionalAreas = action.payload;
        }
    }
})

export default areaSlice.reducer;

export const {addArea,addFunctionalAreaByProgramId} = areaSlice.actions;