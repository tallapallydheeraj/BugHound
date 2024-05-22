import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({children}) => {
    const isLoggedIn = useSelector(store=> store.user.loggedinUserDetails)
    return isLoggedIn!==null ? children : <Navigate to="/" replace />;
  return (
    <div>
    </div>
  )
}

export default AuthGuard
