import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeBugs, updateBug } from '../utils/bugsSlice';
import { showForm } from '../utils/showOne';
import { useNavigate } from 'react-router-dom';
import UpdateForm from './UpdateForm';

const ResolveBugs = () => {
    const [getBugs, setBugs] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [empData, setEmpData] = useState([]);
    const getBugs1 = useSelector(store => store.bugs.bugsArray);
    console.log(getBugs1)
    const programs1 = useSelector(store => store.tables.programs);
    const empData1 = useSelector(store => store.user.empDetails);
    const dispatch = useDispatch();

    const bugs = useSelector((state) => state.bugs.bugsArray);
    const navigate = useNavigate(); // Hook for navigation
    const [menuVisible, setMenuVisible] = useState(null); // Track which bug's menu is visible

    // Handler for toggling the dropdown menu visibility for a specific bug
    const toggleMenu = (event, bugId) => {
        // Prevent event bubbling to document-level click listener
        event.stopPropagation();
        setMenuVisible((prev) => (prev === bugId ? null : bugId));
    };

    // Hide the menu when clicking anywhere else on the page
    React.useEffect(() => {
        const hideMenus = () => setMenuVisible(null);
        document.addEventListener('click', hideMenus);
        return () => document.removeEventListener('click', hideMenus);
    }, []);
    // Fetching programs and employee data
    useEffect(() => {
        fetchPrograms();
        fetchEmployeeData();
    }, []);

    const editBug = (bug) => {
        console.log("Bug object:", bug);
        const currentPath = `/edit-bug/${bug.bug_id}`;
        console.log(currentPath);
        if (currentPath === `/edit-bug/${bug.bug_id}`) {
            // Navigate to UpdateForm.js
            //alert(bug);

            // return <UpdateForm />;
            //<UpdateForm existingData={bug}/>
            navigate('/update-form', { state: { existingData: bug } });
        }
        //navigate(`/edit-bug/${bug.bug_id}`, { state: { bug } });


    };

    const deleteBug = (bugId) => {
        // Dispatch action to delete bug
        console.log("Delete bug", bugId);
        // Add dispatch here once it's defined
    };

    // Fetching programs and employee data
    useEffect(() => {
        fetchPrograms();
        fetchEmployeeData();
    }, []);

    // Fetch program data from the backend
    const fetchPrograms = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjMyMzQzOCwiZXhwIjoxNzE2NTgyNjM4fQ.Ztr36J3C50J4gez82B_SHvL10L7-WXgts2lOCn0-028";//replace
            const response = await axios.get('http://localhost:8080/program', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPrograms(response.data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    // Fetch employee data from the backend
    const fetchEmployeeData = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjMyMzQzOCwiZXhwIjoxNzE2NTgyNjM4fQ.Ztr36J3C50J4gez82B_SHvL10L7-WXgts2lOCn0-028";//replace
            const response = await axios.get('http://localhost:8080/employee', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEmpData(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    // Map data to simple strings for filtering options
    const program_names = programs.map(program => `${program.program_name}/${program.program_release}/${program.program_version}`);
    const emp_names = empData.map(emp => emp.employee_name);

    // Define filter categories with their options
    const filters = [
        { name: 'Program', options: program_names },
        { name: 'Severity', options: ['Fatal', 'Serious', 'Minor'] },
        { name: 'Reported By', options: emp_names },
        { name: 'Status', options: ['Open', 'Closed'] },
        { name: 'Report Type', options: ['Coding Error', 'Design Issue', 'Suggestion', 'Documentation', 'Hardware', 'Query'] },
        { name: 'Assigned To', options: emp_names },
        { name: 'Resolved By', options: emp_names },
        { name: 'Priority', options: ['1', '2', '3', '4', '5'] }
    ];

    // State to track selected options for each filter category
    const [selectedFilters, setSelectedFilters] = useState({});

    // Update selections in state when user interacts with checkboxes
    const handleFilterSelection = (filterName, option) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterName]: prev[filterName]
                ? prev[filterName].includes(option)
                    ? prev[filterName].filter(item => item !== option)  // Toggle option off
                    : [...prev[filterName], option]  // Toggle option on
                : [option]  // Initialize with the first selected option
        }));
    };

    // Generate the API payload based on selected filters
    const createApiPayload = async () => {
        const searchRequestDto = [];

        // Iterate over selected filters
        for (const [filterName, selectedValues] of Object.entries(selectedFilters)) {
            if (selectedValues && selectedValues.length > 0) {
                let column, operation, value;

                if (filterName === 'Program') {
                    const programIds = await fetchProgramIds(selectedValues);
                    column = 'program_id';
                    operation = programIds.length > 1 ? 'IN' : 'EQUAL';
                    value = programIds.join(',');
                } else if (filterName === 'Reported By') {
                    const empIds = await fetchEmployeeIds(selectedValues);
                    column = 'reported_by';
                    operation = empIds.length > 1 ? 'IN' : 'EQUAL';
                    value = empIds.join(',');
                } else if (filterName === 'Assigned To') {
                    const empIds = await fetchEmployeeIds(selectedValues);
                    column = 'assigned_to';
                    operation = empIds.length > 1 ? 'IN' : 'EQUAL';
                    value = empIds.join(',');
                } else if (filterName === 'Resolved By') {
                    const empIds = await fetchEmployeeIds(selectedValues);
                    column = 'resolved_by';
                    operation = empIds.length > 1 ? 'IN' : 'EQUAL';
                    value = empIds.join(',');
                } else {
                    // For other filters, determine operation based on the number of selected values
                    column = filterName.toLowerCase().replace(/\s+/g, '_');
                    operation = selectedValues.length > 1 ? 'IN' : 'EQUAL';
                    value = selectedValues.join(',');
                }

                // Push filter details to searchRequestDto
                searchRequestDto.push({ column, value, operation });
            }
        }

        return {
            globalOperator: 'AND',
            searchRequestDto
        };
    };


    // Fetch program IDs for the selected program names
    const fetchProgramIds = async (selectedPrograms) => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjMyMzQzOCwiZXhwIjoxNzE2NTgyNjM4fQ.Ztr36J3C50J4gez82B_SHvL10L7-WXgts2lOCn0-028";//replace
        try {
            // Fetch program IDs for the selected program names
            const response = await axios.get('http://localhost:8080/program', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const programIds = response.data
                .filter(program => selectedPrograms.includes(`${program.program_name}/${program.program_release}/${program.program_version}`))
                .map(program => program.programId);
            return programIds;
        } catch (error) {
            console.error('Error fetching program IDs:', error);
            return [];
        }
    };

    // Fetch employee IDs for the selected employee names
    const fetchEmployeeIds = async (selectedEmployees) => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjMyMzQzOCwiZXhwIjoxNzE2NTgyNjM4fQ.Ztr36J3C50J4gez82B_SHvL10L7-WXgts2lOCn0-028";//replace
        try {
            // Fetch employee IDs for the selected employee names
            const response = await axios.get('http://localhost:8080/employee', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const employeeIds = response.data
                .filter(employee => selectedEmployees.includes(employee.employee_name))
                .map(employee => employee.emp_id);
            return employeeIds;
        } catch (error) {
            console.error('Error fetching employee IDs:', error);
            return [];
        }
    };
    const token = useSelector(store => store.user.loggedinUserDetails.jwt)
    // Example function to handle API submission (e.g., on button click)
    const handleSubmit = async () => {
        const requestOptions1 = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }

        };
        const data1 = await fetch("http://localhost:8080/bug", requestOptions1);
        const json1 = await data1.json();
        //console.log(json1);
        // dispatch(storeBugs(json._embedded.bugs))
        dispatch(storeBugs(json1))
        const payload = await createApiPayload();
        //alert('Filter Payload: ' + JSON.stringify(payload));
        //console.log('Payload for API:', JSON.stringify(payload));
        // Optionally make an API call here
        console.log(payload)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        let apiURL = "http://localhost:8080/specification"
        const response = await fetch(apiURL, requestOptions);
        const data = await response.json();
        console.log(data)
        dispatch(storeBugs(data));
    };

    const handleResetFilters = () => {
        setSelectedFilters({});
    };

    const [filterCollapse, setFilterCollapse] = useState({});

    const toggleFilterCollapse = (filterName) => {
        setFilterCollapse(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const ExpandIcon = () => <span>&#43;</span>; // Plus sign
    const CollapseIcon = () => <span>&#8722;</span>; // Minus sign

    //for downloading attachment for particular bug
    const handleDownloadAttachment = async (bug) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjMyMzQzOCwiZXhwIjoxNzE2NTgyNjM4fQ.Ztr36J3C50J4gez82B_SHvL10L7-WXgts2lOCn0-028";//replace
            const response = await axios.get(`http://localhost:8080/bug/attachment/${bug.bug_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob', // Set the response type to blob
            });

            // Create a blob URL from the attachment data
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', bug.attachmentfilename);
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the temporary link and blob URL
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading attachment:', error);
        }
    };

    /*function updateForm(bug) {

        //<BugForm bugDetails={bug}/>
        //navigate=("/start", {state:{bugDetails:bug}})

        //return <BugForm bugDetails={bug} />;
        dispatch(updateBug(bug))
        dispatch(showForm());
    }*/

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-white p-4 overflow-auto">
                {filters.map(filter => (
                    <div key={filter.name} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg cursor-pointer" onClick={() => toggleFilterCollapse(filter.name)}>
                                {filter.name} {filterCollapse[filter.name] ? ' + ' : ' - '}
                            </h3>
                        </div>
                        {!filterCollapse[filter.name] && (
                            <>
                                {filter.options.map(option => (
                                    <label key={option} className="block cursor-pointer p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters[filter.name]?.includes(option)}
                                            onChange={() => handleFilterSelection(filter.name, option)}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </>
                        )}
                    </div>
                ))}
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
                    Apply Filters
                </button>
                <button onClick={handleResetFilters} className="bg-red-500 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer mt-4 ml-2">
                    Reset Filters
                </button>
            </div>
            <div className="w-3/4 p-4 overflow-auto">
                {getBugs1 && getBugs1.length > 0 ? (
                    <>
                        <div className="text-center mb-4">
                            {getBugs1.length} {getBugs1.length === 1 ? 'bug' : 'bugs'}
                        </div>
                        {getBugs1.map((bug, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <span className="font-semibold">{bug.program.program_name}</span>
                                        <span> / {bug.program.program_release} / {bug.program.program_version}</span>
                                        {bug.program.functional_area && <span> - {bug.program.functional_area}</span>}
                                    </div>
                                    <div>

                                        <span className="border-2xl p-2 "><button onClick={() => { editBug(bug) }}>Edit</button></span>
                                        <span className={`text-xs ${bug.status === "Open" ? "text-green-500" : "text-red-500"}`}>{bug.status === "Open" ? "🟢 Open" : "🔴 Closed"}</span>

                                    </div>
                                </div>
                                <div className="mb-2">{bug.problem}</div>
                                <div className="flex justify-between">
                                    <div>Severity: <span className="font-semibold">{bug.severity}</span></div>
                                    <div>Assigned To: <span className="font-semibold">{bug.assignedTo?.employee_name || '-'}</span></div>
                                </div>
                                <div className="flex justify-between">
                                    <div>Reported By: <span className="font-semibold">{bug.reportedBy.employee_name}</span></div>
                                    <div>Reported On: <span className="font-semibold">{bug.reported_date}</span></div>
                                </div>
                                {bug.attachment && (
                                    <div className="flex justify-end mt-2">
                                        <button onClick={() => handleDownloadAttachment(bug)} className="text-blue-500 hover:underline">Download Attachment</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center">There are no such bugs</div>
                )}
            </div>
        </div>
    );



};

export default ResolveBugs;
