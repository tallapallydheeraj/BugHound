import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ResolveBugs = () => {
    const getBugs = useSelector(store => store.bugs.bugsArray);
    const programs = useSelector(store => store.tables.programs);
    const empData = useSelector(store => store.user.empDetails);

    // Map data to simple strings for filtering options
    const program_names = programs.map(program => `${program.program_name}/${program.program_release}/${program.program_version}`);
    const emp_names = empData.map(emp => emp.employee_name);

    // Define filter categories with their options
    const filters = [
        { name: 'Program', options: program_names },
        { name: 'Severity', options: ['Fatal', 'Serious', 'Minor'] },
        { name: 'Reported By', options: emp_names },
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
    const createApiPayload = () => {
        let searchRequestDto = Object.keys(selectedFilters).map(key => {
            const values = selectedFilters[key];
            const operation = values.length > 1 ? "AND" : "IN";
            const formattedValues = values.length > 1 ? values.join(", ") : values[0];
            return {
                column: key,
                value: formattedValues,
                operation: operation
            };
        });

        return {
            globalOperator: "AND",
            searchRequestDto
        };
    };

    // Example function to handle API submission (e.g., on button click)
    const handleSubmit = () => {
        const payload = createApiPayload();
        console.log('Payload for API:', JSON.stringify(payload));
        // Optionally make an API call here
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-white p-4 overflow-auto">
                {filters.map(filter => (
                    <div key={filter.name} className="mb-4">
                        <h3 className="font-bold text-lg">{filter.name}</h3>
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
                    </div>
                ))}
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
                    Apply Filters
                </button>
            </div>
            <div className="w-3/4 p-4 overflow-auto">
                {getBugs && getBugs.map((bug, index) => (
                    <div key={index} className="bg-slate-200 m-2 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Id: {bug.program.program_name}{bug.program.functional_area ? ` - ${bug.functional_area}` : ''}</span>
                            <span className="text-xs">{bug.status === "open" ? "🟢 Open" : "🔴 Closed"}</span>
                        </div>
                        <div className="mb-2">{bug.problem}</div>
                        <div className="flex justify-between">
                            <span>Reported By: {bug.reportedBy.employee_name}</span>
                            <span>Reported On: {bug.reported_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResolveBugs;
