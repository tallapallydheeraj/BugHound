import { createSlice } from "@reduxjs/toolkit";

const tablesSlice = createSlice({
    name:"tables",
    initialState:{
        area:null,
        programs:null,
        programTable_Data : null,
        employeeTable_Data:null
    },
    reducers:{
        storeAreaTable:(state,action)=>{
            state.area = action.payload;
        },
        storeProgramNames:(state,action)=>{
            state.programs = action.payload;
        },
        programTableData:(state,action)=>{
            state.programTable_Data = action.payload;
        },
        employeeTableData:(state,action)=>{
            state.employeeTable_Data = action.payload;
        }
    }
})

export default tablesSlice.reducer;

export const {storeAreaTable,storeProgramNames,programTableData,employeeTableData} = tablesSlice.actions;