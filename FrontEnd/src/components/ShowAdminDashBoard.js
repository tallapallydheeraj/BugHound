// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { storeAreaTable } from '../utils/tablesSlice';
// import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

// const ShowAdminDashBoard = () => {
//     const dispatch = useDispatch();
//     const [areaTable, setAreaTable] = useState(false);
//     const [programTable, setProgramTable] = useState(false);
//     const [employeeTable, setEmployeeTable] = useState(false);
//     const token = useSelector(store => store.user.loggedinUserDetails.jwt)

//     const [editRowIndex, setEditRowIndex] = useState(null);
//     // State to store the current editing value
//     const [editingValue, setEditingValue] = useState('');

//     const handleEdit = (areaObj, index) => {
//       setEditRowIndex(index); // Set the index of the row being edited
//       setEditingValue(areaObj.program.program_name); // Initialize the editing value with the current program name
//     };

//     const handleCancel = () => {
//       setEditRowIndex(null); // Reset edit mode
//     };

//     const handleChange = (e) => {
//       setEditingValue(e.target.value); // Update the editing value as the user selects a new option
//     };

//     const handleSave = (index) => {
//       console.log("Saving", editingValue, "for row index", index); // You'd handle saving to the backend or state here
//       setEditRowIndex(null); // Exit edit mode
//     };

//     async function showAreaTable(){
//         setAreaTable(!areaTable);
//         setProgramTable(false)
//         setEmployeeTable(false)

//         const requestOptions = {
//             method: 'GET',
//             headers: {
//                 'Authorization': "Bearer " + token
//             }
//         };

//         const data = await fetch("http://localhost:8080/area", requestOptions);
//         const json = await data.json();
//         console.log(json);
//         dispatch(storeAreaTable(json))


//     }
//     function showEmployeeTable(){
//         setAreaTable(false);
//         setProgramTable(false)
//         setEmployeeTable(!employeeTable)
//     }
//     function showProgramTable(){
//         setAreaTable(false);
//         setProgramTable(!programTable);
//         setEmployeeTable(false);
//     }
//     const aTable = useSelector(store=> store.tables.area)
//   return (
//     <div className='bg-gray-300'>
//       <div className=' p-2 m-2 '>
//         <button className='p-2 m-2 bg-yellow-400 font-semibold hover:font-bold' onClick={showAreaTable}>Area</button>
//         <button className='p-2 m-2 bg-yellow-400 font-semibold hover:font-bold' onClick={showEmployeeTable}>Employee</button>
//         <button className='p-2 m-2 bg-yellow-400 font-semibold hover:font-bold' onClick={showProgramTable}>Program</button>
//       </div>
//       <div>

//         {areaTable && <div> <table className="min-w-full divide-y divide-gray-200">
//     <thead className="bg-gray-50">
//         <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Area Id
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Program ID
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Program Name
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Program Release
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Program Version
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Area
//             </th>
//         </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//         {aTable.map((areaObj, index) => (
//             <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {areaObj.area_id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {areaObj.program.programId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {areaObj.program.program_name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {areaObj.program.program_release}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {areaObj.program.program_version}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {areaObj.area}
//                 </td>
//             </tr>
//         ))}
//     </tbody>
// </table>

//             </div>}
//         {programTable && <div>This is program Table</div>}
//         {employeeTable && <div>This is Employee Table</div>}

//       </div>
//     </div>
//   )
// }

// export default ShowAdminDashBoard
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { storeAreaTable } from '../utils/tablesSlice';

// const ShowAdminDashBoard = () => {
//     const dispatch = useDispatch();
//     const token = useSelector(store => store.user.loggedinUserDetails.jwt);
//     const aTable = useSelector(store => store.tables.area || []);

//     // States to control the visibility of tables
//     const [areaTable, setAreaTable] = useState(false);
//     const [programTable, setProgramTable] = useState(false);
//     const [employeeTable, setEmployeeTable] = useState(false);

//     // States for editing entries
//     const [editRowIndex, setEditRowIndex] = useState(null);
//     const [editData, setEditData] = useState({ program_name: '', area: '' });

//     async function showAreaTable() {
//         setAreaTable(!areaTable);
//         setProgramTable(false);
//         setEmployeeTable(false);

//         const requestOptions = {
//             method: 'GET',
//             headers: {
//                 'Authorization': "Bearer " + token
//             }
//         };

//         try {
//             const response = await fetch("http://localhost:8080/area", requestOptions);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const json = await response.json();
//             dispatch(storeAreaTable(json));
//         } catch (error) {
//             console.error("Fetching area data failed", error);
//         }
//     }

//     const handleEdit = (areaObj, index) => {
//         setEditRowIndex(index);
//         setEditData({
//             program_name: areaObj.program.program_name,
//             area: areaObj.area
//         });
//     };

//     const handleDelete = async (areaId) => {
//         // Placeholder for delete logic
//         console.log("Delete area with ID:", areaId);
//         // After deletion, you should fetch the updated data or remove the item from local state
//     };

//     const handleSave = (index) => {
//         // Placeholder for save logic
//         console.log("Save new data for row", index, editData);
//         // After saving, you should fetch the updated data or update the item in the local state
//     };

//     const handleChange = (e) => {
//         setEditData({ ...editData, [e.target.name]: e.target.value });
//     };

//     const handleCancel = () => {
//         setEditRowIndex(null);
//     };

//     return (
//         <div className='bg-gray-300'>
//             <div className='p-2 m-2'>
//                 <button className='p-2 m-2 bg-yellow-400 font-semibold hover:font-bold' onClick={showAreaTable}>Area</button>
//                 <button className='p-2 m-2 bg-yellow-400 font-semibold hover:font-bold' onClick={() => setProgramTable(!programTable)}>Program</button>
//                 <button className='p-2 m-2 bg-yellow-400 font-semibold hover:font-bold' onClick={() => setEmployeeTable(!employeeTable)}>Employee</button>
//             </div>
//             {areaTable && (
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th>Area ID</th>
//                             <th>Program ID</th>
//                             <th>Program Name</th>
//                             <th>Program Release</th>
//                             <th>Program Version</th>
//                             <th>Area</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {aTable.map((areaObj, index) => (
//                             <tr key={areaObj.area_id}>
//                                 <td>{areaObj.area_id}</td>
//                                 <td>{areaObj.program.programId}</td>
//                                 <td>
//                                     {editRowIndex === index ? (
//                                         <input 
//                                             type="text" 
//                                             value={editData.program_name} 
//                                             onChange={handleChange} 
//                                             name="program_name" 
//                                         />
//                                     ) : (
//                                         areaObj.program.program_name
//                                     )}
//                                 </td>
//                                 <td>{areaObj.program.program_release}</td>
//                                 <td>{areaObj.program.program_version}</td>
//                                 <td>
//                                     {editRowIndex === index ? (
//                                         <input 
//                                             type="text" 
//                                             value={editData.area} 
//                                             onChange={handleChange} 
//                                             name="area" 
//                                         />
//                                     ) : (
//                                         areaObj.area
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editRowIndex === index ? (
//                                         <>
//                                             <button onClick={() => handleSave(index)}>Save</button>
//                                             <button onClick={handleCancel}>Cancel</button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button onClick={() => handleEdit(areaObj, index)}>Edit</button>
//                                             <button onClick={() => handleDelete(areaObj.area_id)}>Delete</button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//             {/* Implement similar conditional renders for Program and Employee tables if needed */}
//         </div>
//     );
// };

// export default ShowAdminDashBoard;

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeAreaTable, storeProgramNames, programTableData, employeeTableData } from '../utils/tablesSlice';
import { addArea } from '../utils/areaSlice';

const ShowAdminDashBoard = () => {
    const updateString = useRef();
    const updateProgramId = useRef();
    const dispatch = useDispatch();
    const token = useSelector(store => store.user.loggedinUserDetails.jwt);
    const aTable = useSelector(store => store.tables.area || []);

    // States to control the visibility of tables
    const [areaTable, setAreaTable] = useState(false);
    const [programTable, setProgramTable] = useState(false);
    const [employeeTable, setEmployeeTable] = useState(false);

    // States for editing entries
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editData, setEditData] = useState({ program_name: '', area: '' });
    let flag = 0;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + token
        }
    };



    async function showAreaTable() {
        setAreaTable(true);
        setProgramTable(false);
        setEmployeeTable(false);

        try {
            const response = await fetch("http://localhost:8080/area", requestOptions);
            try {
                const response = await fetch("http://localhost:8080/program", requestOptions);
                const json = await response.json();
                console.log("Programs  ==" + json)
                dispatch(storeProgramNames(json));
            } catch (error) {
                console.error("Fetching area data failed", error);
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            dispatch(storeAreaTable(json));
        } catch (error) {
            console.error("Fetching area data failed", error);
        }
    }



    const handleEdit = async (areaObj, index) => {

        setEditRowIndex(index);
        setEditData({
            program_name: areaObj.program.program_name,
            area: areaObj.area
        });
    };

    const handleDelete = async (areaId) => {
        // Placeholder for your delete logic
        console.log("Delete area with ID:", areaId);
        // After deletion, you should fetch the updated data or remove the item from local state
    };

    const handleSave = async (index) => {
        // Placeholder for your save logic
        //console.log("Save new data for row", index, editData);
        console.log("Area_id", index);
        // After saving, you should fetch the updated data or update the item in the local state

        const dataObject = {

            "program": {
                "programId": updateProgramId.current.value
            },
            "area": updateString.current.value

        }
        // console.log(dataObject)
        const putOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify(dataObject)
        };

        const areaURL = "http://localhost:8080/area/" + index
        const response = await fetch(areaURL, putOptions);
        const json = await response.json();
        console.log(json)
        if (!response.ok) {
            alert("Check your Inputs")
        }
        else {
            setEditRowIndex(null)
            alert("updated Successfully")
            const response = await fetch("http://localhost:8080/area", requestOptions);
            const json = await response.json();
            dispatch(storeAreaTable(json));
        }


    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setEditRowIndex(null);
    };

    // Style for the buttons to add some spacing
    const actionButtonStyle = "mx-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700";

    //Progra table start here
    const program_names = useSelector(store => store.tables.programs)


    const [addRow, setAddRow] = useState(false);
    const updateAdditionalProgramId = useRef();
    const updateAreaField = useRef();
    const filterTable = useRef();

    async function handleAddRow() {
        const response_1 = await fetch("http://localhost:8080/program", requestOptions);
        const json_1 = await response_1.json();
        if (json_1.length != 0) { setAddRow(!addRow) }
        else
        {
            alert("No programs created yet!");
        }
    }

    async function updateAreaRow() {


        const rowdetails = {
            "program": {
                "programId": updateAdditionalProgramId.current.value
            },
            "area": updateAreaField.current.value
        }

        console.log(rowdetails)

        const requestOptions3 = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowdetails)
        };

        const apiUrl1 = 'http://localhost:8080/area';

        try {

            const response = await fetch(apiUrl1, requestOptions3);
            if (response.ok) {
                const data = await response.json();
                console.log('Update Successful:', data);
                const response_1 = await fetch("http://localhost:8080/area", requestOptions);
                const json_1 = await response_1.json();
                dispatch(storeAreaTable(json_1));
                setAddRow(!addRow)
                alert("area added")
            }
            else {
                alert("check your input");
            }

        } catch (error) {
            alert("something went wrong");
        }



    }

    ///////////////////////////////////////////////////////////////////////////////

    const p_pn_ref = useRef();
    const p_pr_ref = useRef();
    const p_pv_ref = useRef();

    const p_b_ref = useRef();
    const e_b_ref = useRef();

    async function updateProgramRow() {

        if (p_pn_ref.current.value.trim() === "" || p_pr_ref.current.value.trim() === "" || p_pv_ref.current.value.trim() === "") {
            alert("empty fields");
            return;
        }

        const rowdetails = {
            "program_name": p_pn_ref.current.value,
            "program_release": p_pr_ref.current.value,
            "program_version": p_pv_ref.current.value,
        }

        console.log(rowdetails)

        const requestOptions3 = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowdetails)
        };

        const apiUrl1 = 'http://localhost:8080/program';
        try {

            const response = await fetch(apiUrl1, requestOptions3);
            if (response.ok) {
                const data = await response.json();
                console.log('Update Successful:', data);
                const response_1 = await fetch("http://localhost:8080/program", requestOptions);
                const json_1 = await response_1.json();
                dispatch(storeProgramNames(json_1));
                setAddRowForProgram(!addRowForProgram);

                setTimeout(() => {
                    p_b_ref.current.click();

                }, 100); // Delay of 1000 milliseconds (1 second)
                setTimeout(() => {
                    p_b_ref.current.click();

                }, 100); // Delay of 1000 milliseconds (1 second)
                alert("program added");
            }
            else {
                alert("check your input");
            }

        } catch (error) {
            alert("something went wrong");
        }

    }



    const e_en_ref = useRef();
    const e_ul_ref = useRef();
    const e_un_ref = useRef();


    async function updateEmployeeRow() {

        if (e_en_ref.current.value.trim() === "" || e_ul_ref.current.value.trim() === "" || e_un_ref.current.value.trim() === "") {
            alert("empty fields");
            return;
        }

        const rowdetails = {
            "employee_name": e_en_ref.current.value,
            "username": e_un_ref.current.value,
            "userlevel": e_ul_ref.current.value,
        }

        console.log(rowdetails)

        const requestOptions3 = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowdetails)
        };

        const apiUrl1 = 'http://localhost:8080/addEmployee';
        try {

            const response = await fetch(apiUrl1, requestOptions3);
            if (response.ok) {
                //const data = await response.json();
                //console.log('Update Successful:', data);
                const response_1 = await fetch("http://localhost:8080/employee", requestOptions);
                const json_1 = await response_1.json();
                dispatch(employeeTableData(json_1));
                setAddRowForEmp(!addRowForEmp);

                setTimeout(() => {
                    e_b_ref.current.click();

                }, 100); // Delay of 1000 milliseconds (1 second)
                setTimeout(() => {
                    e_b_ref.current.click();

                }, 100); // Delay of 1000 milliseconds (1 second)
                alert("employee added");
            }
            else {
                alert("check your input");
            }

        } catch (error) {
            alert(error);//"something went wrong"
        }




    }


    async function programEditUpdateRedux() {
        const response_1 = await fetch("http://localhost:8080/program", requestOptions);
        const json_1 = await response_1.json();
        dispatch(storeProgramNames(json_1));
    }

    async function empEditUpdateRedux() {
        const response_1 = await fetch("http://localhost:8080/employee", requestOptions);
        const json_1 = await response_1.json();
        dispatch(employeeTableData(json_1));
    }

    async function filterTableRows() {
        if (filterTable.current.value == "a") {
            let API_URL = "http://localhost:8080/area"
            const response5 = await fetch(API_URL, requestOptions);
            const json5 = await response5.json();
            dispatch(storeAreaTable(json5));
        }
        else {

            let API_URL = "http://localhost:8080/area/program/" + filterTable.current.value
            const response4 = await fetch(API_URL, requestOptions);
            const json4 = await response4.json();
            dispatch(storeAreaTable(json4));
        }
    }


    // XML and ASCII files functions
    async function exportArea(format) {
        console.log(token);
        const requestOptions2 = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token
            }
        };

        const data2 = await fetch("http://localhost:8080/area", requestOptions2);
        const json2 = await data2.json();
        dispatch(addArea(json2));

        let fileContent, fileName, contentType;

        if (format === 'xml') {
            fileContent = generateXMLFile(json2);
            fileName = 'area.xml';
            contentType = 'text/xml';
            downloadFile(fileContent, fileName, contentType);
        }
        else if (format === 'ascii') {
            fileContent = generateASCIIFile(json2);
            fileName = 'area.txt';
            contentType = 'text/plain';
            downloadFile(fileContent, fileName, contentType);
        }


    }

    function generateXMLFile(areaData) {
        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
        const rootElement = '<areas>';

        const areaElements = areaData.map(area => {
            const programElement = `<program>
            <programId>${area.program.programId}</programId>
            <program_name>${area.program.program_name}</program_name>
            <program_release>${area.program.program_release}</program_release>
            <program_version>${area.program.program_version}</program_version>
          </program>`;

            return `<area>
            <area_id>${area.area_id}</area_id>
            ${programElement}
            <area_name>${area.area}</area_name>
          </area>`;
        });

        const xmlFooter = '</areas>';

        const xmlContent = `${xmlHeader}\n${rootElement}\n${areaElements.join('\n')}\n${xmlFooter}`;
        return xmlContent;
    }

    function generateASCIIFile(areaData) {
        const header = '--- Area Data ---\n';
        const lines = areaData.flatMap(area => {
            const programLines = [
                `Program ID: ${area.program.programId}`,
                `Program Name: ${area.program.program_name}`,
                `Program Release: ${area.program.program_release}`,
                `Program Version: ${area.program.program_version}`
            ];

            return [
                `Area ID: ${area.area_id}`,
                ...programLines,
                `Area Name: ${area.area}`,
                ''
            ];
        });

        const asciiContent = `${header}${lines.join('\n')}`;
        return asciiContent;
    }

    function downloadFile(content, fileName, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    /*-------------------------------------------------------------------------------------------------------------------------------*/

    const allProgramRows = useSelector(store => store.tables.programTable_Data)
    const [allProgramRows_program, setAllProgramRows_program] = useState(allProgramRows);
    const [editProgramId_program, setEditProgramId_program] = useState(null);
    const [editEmpId, setEditEmpId] = useState(null);
    const [draftProgram_program, setDraftProgram_program] = useState({});
    const [draftEmployee, setDraftEmployee] = useState({});
    async function getProgramTable() {
        setProgramTable(!programTable);
        setAreaTable(false);
        setEmployeeTable(false);

        const program_data = await fetch("http://localhost:8080/program", requestOptions)
        const program_json = await program_data.json();
        console.log("Updated One" + program_json);
        dispatch(programTableData(program_json))
        setAllProgramRows_program(program_json)
    }


    async function getEmployeeTable() {
        setProgramTable(false);
        setAreaTable(false);
        setEmployeeTable(!employeeTable);

        const employee_data = await fetch("http://localhost:8080/employee", requestOptions)
        const employee_json = await employee_data.json();
        console.log(employee_json);
        dispatch(employeeTableData(employee_json))
    }

    const allEmployeeRows = useSelector(store => store.tables.employeeTable_Data)

    const [addRowForProgram, setAddRowForProgram] = useState(false);
    const [addRowForEmp, setAddRowForEmp] = useState(false);

    function addInputForProgram() {
        setAddRowForProgram(!addRowForProgram)
        setEditProgramId_program(null)

    }

    function addInputForEmployee() {
        setAddRowForEmp(!addRowForEmp)
        setEditEmpId(null)

    }



    const handleEditClick_program = (program) => {
        setEditProgramId_program(program.programId);
        console.log(program.programId)
        setDraftProgram_program({ ...program });
        programEditUpdateRedux();
    };

    const handleEditClick_emp = (emp) => {
        setEditEmpId(emp.emp_id);
        console.log(emp.emp_id)
        setDraftEmployee({ ...emp });
        empEditUpdateRedux();
    };

    const handleCancel_program = () => {
        setEditProgramId_program(null);
        setDraftProgram_program({});
    };

    const handleCancel_emp = () => {
        setEditEmpId(null);
        setDraftEmployee({});
    };


    const handleInputChange_program = (e) => {
        setDraftProgram_program({ ...draftProgram_program, [e.target.name]: e.target.value });
    };

    const handleInputChange_emp = (e) => {
        setDraftEmployee({ ...draftEmployee, [e.target.name]: e.target.value });
    };

    const actionButtonStyle_program = "mx-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700";

    const field1 = useRef();
    const field2 = useRef();
    const field3 = useRef();

    async function saveForProgram(id) {
        const programJson = {
            "program_name": field1.current.value,
            "program_release": field2.current.value,
            "program_version": field3.current.value
        }
        const requestOptionsForProgram = {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(programJson)
        };
        let API_URL = "http://localhost:8080/program/" + id
        const data = await fetch(API_URL, requestOptionsForProgram);
        const json = await data.json();
        console.log(json)
        if (json.ok) {
            alert("Check your Inputs for program")
        }
        else {
            setEditProgramId_program(999)
            alert("updated Successfully")
        }
        const program_data = await fetch("http://localhost:8080/program", requestOptions)
        const program_json = await program_data.json();
        dispatch(programTableData(program_json))
        setTimeout(() => {
            p_b_ref.current.click();

        }, 100); // Delay of 1000 milliseconds (1 second)
        setTimeout(() => {
            p_b_ref.current.click();

        }, 100); // Delay of 1000 milliseconds (1 second)
    }


    const e_field1 = useRef();
    const e_field2 = useRef();
    const e_field3 = useRef();

    async function saveForEmp(id) {
        const empJson =
        {
            "employee_name": e_field1.current.value,
            "username": e_field3.current.value,
            "userlevel": e_field2.current.value,
        }
        const requestOptionsForEmp = {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empJson)
        };
        let API_URL = "http://localhost:8080/employee/" + id
        const data = await fetch(API_URL, requestOptionsForEmp);
        const json = await data.json();
        console.log(json)
        if (json.ok) {
            alert("Check your Inputs for employee")
        }
        else {
            setEditEmpId(999)
            alert("updated Successfully")
        }
        const emp_data = await fetch("http://localhost:8080/employee", requestOptions)
        const emp_json = await emp_data.json();
        dispatch(programTableData(emp_json))
        setTimeout(() => {
            e_b_ref.current.click();

        }, 100); // Delay of 1000 milliseconds (1 second)
        setTimeout(() => {
            e_b_ref.current.click();

        }, 100); // Delay of 1000 milliseconds (1 second)
    }

    if (aTable === null) {
        return <div>No Records for the Area Table</div>
    }
    if (allEmployeeRows === null) {
        return <div>No Records for the Employee Table</div>
    }
    if (allProgramRows_program === null) {
        return <div>No Records for the Program Table</div>
    }


    return (
        <div className=''>
            <div className=' flex justify-between space-x-2 bg-slate-300'>
                <div className='p-2 m-2 flex justify-start space-x-2 bg-slate-300'>
                    <button className='p-2 bg-yellow-400 font-semibold hover:font-bold rounded' onClick={showAreaTable}>Area</button>
                    <button className='p-2 bg-yellow-400 font-semibold hover:font-bold rounded' onClick={getProgramTable} ref={p_b_ref}>Program</button>
                    <button className='p-2 bg-yellow-400 font-semibold hover:font-bold rounded' onClick={getEmployeeTable} ref={e_b_ref}>Employee</button>
                </div>
                <div>
                    <select className='p-2 m-4 bg-white font-semibold rounded' ref={filterTable} onChange={filterTableRows} ><option value="a" >All</option>{program_names.map(name => <option value={name.programId}>{name.program_name}</option>)}</select>
                </div>
            </div>
            {areaTable && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {aTable.map((areaObj, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{areaObj.area_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{areaObj.program.programId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editRowIndex === index ? (
                                        <select
                                            ref={updateProgramId}
                                            onChange={handleChange}
                                            name="program_name"
                                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        >
                                            {program_names.map(program => <option value={program.programId}> {program.program_name} / {program.program_release} / {program.program_version} </option>)}
                                        </select>
                                    ) :
                                        areaObj.program.program_name + "/" + areaObj.program.program_release + "/" + areaObj.program.program_version
                                    }
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editRowIndex === index ? (
                                        <input
                                            ref={updateString}
                                            type="text"
                                            name="area"
                                            value={editData.area}
                                            onChange={handleChange}
                                            required
                                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                    ) : (
                                        areaObj.area
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editRowIndex === index ? (
                                        <>
                                            <button onClick={() => handleSave(areaObj.area_id)} className={actionButtonStyle}>Save</button>
                                            <button onClick={handleCancel} className={actionButtonStyle}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(areaObj, index)} className={actionButtonStyle}>Edit</button>
                                            <button onClick={() => handleDelete(areaObj.area_id)} className={actionButtonStyle}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>


                        ))}

                        {
                            addRow &&

                            <tr >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <input type="text" placeholder='' disabled={true} /> </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" placeholder='' disabled={true} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                                    <select ref={updateAdditionalProgramId} className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        {program_names.map(areaObj => <option value={areaObj.programId} > {areaObj.program_name}  /  {areaObj.program_release} / {areaObj.program_version} </option>)} </select>
                                </td>

                                <td>
                                    <input type="text" placeholder='Area' ref={updateAreaField} className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">


                                    <button className="mx-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={updateAreaRow}>Save</button>

                                </td>
                            </tr>
                        }

                    </tbody>
                    <div className="flex justify-end p-2 bg-white">
                        <button onClick={handleAddRow}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded relative left-[130%]"
                        >
                            {!addRow ? "Add Area" : "Cancel"}
                        </button>

                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={function () { exportArea('xml'); }}
                            >
                                Export XML
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={function () { exportArea('ascii'); }}
                            >
                                Export ASCII
                            </button>
                        </div>


                    </div>
                </table>

            )}




            {programTable && <div> <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Program Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Program Release
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Program Version
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allProgramRows_program.map((row) => (
                        <tr key={row.programId_program}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {editProgramId_program === row.programId ? (


                                    <input
                                        ref={field1}
                                        type="text"
                                        name="program_name_program"
                                        defaultValue={
                                            row.program_name
                                        }
                                        required=""
                                        onChange={handleInputChange_program}
                                        class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    ></input>
                                ) : (
                                    row.program_name
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editProgramId_program === row.programId ? (

                                    <input ref={field2}
                                        type="text"
                                        name="program_release_program"
                                        defaultValue={
                                            row.program_release
                                        }
                                        required=""
                                        onChange={handleInputChange_program}
                                        class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    ></input>
                                ) : (
                                    row.program_release
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editProgramId_program === row.programId ? (

                                    <input ref={field3}
                                        type="text"
                                        name="program_version_program"
                                        defaultValue={
                                            row.program_version
                                        }
                                        required=""
                                        onChange={handleInputChange_program}
                                        class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    ></input>
                                ) : (
                                    row.program_version
                                )}
                            </td>
                            <td>
                                {editProgramId_program === row.programId ? (
                                    <>
                                        <button className={actionButtonStyle_program} onClick={() => { saveForProgram(row.programId) }} >Save</button>
                                        <button className={actionButtonStyle_program} onClick={handleCancel_program}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className={actionButtonStyle_program} onClick={() => handleEditClick_program(row)}>Edit</button>
                                        <button className={actionButtonStyle_program} onClick={handleCancel_program}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {
                        addRowForProgram &&

                        <tr >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                                <input type="text" ref={p_pn_ref} placeholder="Program Name" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input type="text" ref={p_pr_ref} placeholder="Program Release" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input type="text" ref={p_pv_ref} placeholder="Program Version" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">


                                <button className="mx-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={updateProgramRow}>Save</button>

                            </td>
                        </tr>
                    }
                </tbody>
                <div>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded relative left-[130%]" onClick={addInputForProgram}>{addRowForProgram ? "Cancel" : "Add Program"}</button>
                </div>
            </table></div>}


            {employeeTable && <div><table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Use Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allEmployeeRows.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {editEmpId === row.emp_id ? (


                                    <input
                                        ref={e_field1}
                                        type="text"
                                        name="employee_name_employee"
                                        defaultValue={
                                            row.employee_name
                                        }
                                        required=""
                                        onChange={handleInputChange_emp}
                                        class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    ></input>
                                ) : (
                                    row.employee_name
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editEmpId === row.emp_id ? (

                                    <select
                                        ref={e_field2}
                                        name="employee_userlevel_employee"
                                        defaultValue={row.userlevel}
                                        required=""
                                        onChange={handleInputChange_emp}
                                        class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                        <option value="ROLE_L1">ROLE_L1</option>
                                        <option value="ROLE_L2">ROLE_L2</option>
                                        <option value="ROLE_L3">ROLE_L3</option>
                                    </select>
                                ) : (
                                    row.userlevel
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editEmpId === row.emp_id ? (

                                    <input ref={e_field3}
                                        type="text"
                                        name="employee_username_employee"
                                        defaultValue={
                                            row.username
                                        }
                                        required=""
                                        onChange={handleInputChange_emp}
                                        class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    ></input>
                                ) : (
                                    row.username
                                )}
                            </td>
                            <td>
                                {editEmpId === row.emp_id ? (
                                    <>
                                        <button className={actionButtonStyle_program} onClick={() => { saveForEmp(row.emp_id) }} >Save</button>
                                        <button className={actionButtonStyle_program} onClick={handleCancel_emp}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className={actionButtonStyle_program} onClick={() => handleEditClick_emp(row)}>Edit</button>
                                        <button className={actionButtonStyle_program} onClick={handleCancel_emp}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {
                        addRowForEmp &&

                        <tr >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                                <input type="text" ref={e_en_ref} placeholder="Employee Name" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <select
                                    ref={e_ul_ref}
                                    placeholder="Employee User Level"
                                    class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option value="ROLE_L1">ROLE_L1</option>
                                    <option value="ROLE_L2">ROLE_L2</option>
                                    <option value="ROLE_L3">ROLE_L3</option>
                                </select></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input type="text" ref={e_un_ref} placeholder="Employee Username" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">


                                <button className="mx-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={updateEmployeeRow}>Save</button>

                            </td>
                        </tr>
                    }
                </tbody>
                <div>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded relative left-[130%]" onClick={addInputForEmployee}>{addRowForEmp ? "Cancel" : "Add Employee"}</button>
                </div>
            </table></div>}
        </div>
    );
};

export default ShowAdminDashBoard;
