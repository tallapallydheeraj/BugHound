import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { showAdminDashBoard, showBugs, showForm } from '../utils/showOne';
import { storeBugs } from '../utils/bugsSlice';
import { allEmpDetails, removeUser } from '../utils/userSlice';
import { employeeTableData, programTableData, storeProgramNames } from '../utils/tablesSlice';


const Header = () => {


  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = useSelector(store => store.user.loggedinUserDetails.role)
  const loggedInUser = useSelector(store => store.user.loggedinUserDetails.username)
  const thisBugsArray = useSelector(store => store.bugs.bugsArray)
  const dispatch = useDispatch();
  //const countOfBugs = thisBugsArray.reduce((acc, bug) => { if (bug.assignedTo.username === loggedInUser) { acc++ } return acc; }, 0)
  const token = useSelector(store => store.user.loggedinUserDetails.jwt);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + token
    }
  };


  const getForm = () => {
    dispatch(showForm())
  }


  /* const getBugs = async () => {
 
     const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
         
                const data = await fetch("http://localhost:8080/bug", requestOptions);
                const json = await data.json();
                console.log(json);
                // dispatch(storeBugs(json._embedded.bugs))
             dispatch(showBugs());
               dispatch(storeBugs(json))
   }*/
  const getBugs = async () => {
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
    dispatch(showBugs())
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  function logout() {
    dispatch(removeUser())
    navigate("/")
  }
  function showAdminDashBoardHere() {
    dispatch(showAdminDashBoard())
  }
  useEffect(() => {
    const fetchData = async () => {
      const allEmpData = await fetch("http://localhost:8080/employee", requestOptions)
      const empData = await allEmpData.json();
      dispatch(allEmpDetails(empData))
      const response = await fetch("http://localhost:8080/program", requestOptions);
      const json = await response.json();
      dispatch(storeProgramNames(json));


      const program_data = await fetch("http://localhost:8080/program", requestOptions);
      const program_json = await program_data.json();
      console.log(program_json);
      dispatch(programTableData(program_json));


      const employee_data = await fetch("http://localhost:8080/employee", requestOptions);
      const employee_json = await employee_data.json();
      console.log(employee_json);
      dispatch(employeeTableData(employee_json));


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
    };


    fetchData();
  }, []);


  const [mainHeader, setMainHeader] = useState(true);


  return (
    <div>
      <div className='bg-black p-4 w-[100%]'>
        <header className="bg-black px-4 py-2 flex  justify-between w-full text-white">


          <div className="flex items-center">
            <h1 className="mr-2 font-bold text-2xl" >BUGTRACKER</h1>
            <div>
              <button className="px-2 bg-black rounded-lg py-2 mr-2 hover:bg-gray-800 font-bold"
              onClick={() => {
                setMainHeader(!mainHeader);
                getForm();
              }}>
                Report a Bug
              </button>
              <button className="px-2 bg-black rounded-lg py-2 hover:bg-gray-800 font-bold"
              onClick={() => {
                setMainHeader(!mainHeader);
                getBugs();
              }}>
                Search Bugs
              </button>
            </div>
          </div>


          <div className="relative inline-block text-left">
            <button onClick={toggleDropdown} className="px-2 bg-black rounded-lg py-2 hover:bg-gray-800 font-bold relative">
              My Dashboard
              <span className="absolute right-0 top-0 bottom-0 flex items-center px-2">
                <svg className="w-4 h-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
                <div className="py-1">
                  {role === "ROLE_L3" ? <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() => {
                    setMainHeader(!mainHeader);
                    showAdminDashBoardHere();
                  }}>
                    Admin Dashboard
                  </button> : ""}
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() => {
                    setMainHeader(!mainHeader);
                   
                  }}>
                    <span className='flex justify-between'> <span>Assigned Bugs</span></span>
                  </button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() => {
                    setMainHeader(!mainHeader);
                   
                  }}>
                    Reported Bugs
                  </button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>


        </header>


      </div>
      <Outlet />
      {mainHeader && (
        <h1 style={{ fontSize: '40px' }}></h1>
      )}
    </div>
  );
};


export default Header;



