import React from 'react'
import { useSelector } from 'react-redux'
import BugForm from "./BugForm"
import ResolveBugs from './ResolveBugs';
import ShowAdminDashBoard from './ShowAdminDashBoard';

const Body = () => {
  const toggleForm = useSelector(store=> store.showOne.seeForm);
  const toggleBugs = useSelector(store => store.showOne.seeBugs);
  const toggleAdminBoard = useSelector(store=> store.showOne.seeAdminDashBoard)
  return (
    <div>
      {toggleForm && <BugForm/>}
      {toggleBugs && <ResolveBugs/> }
      {toggleAdminBoard && <ShowAdminDashBoard/> }
    </div>
  )
}

export default Body
