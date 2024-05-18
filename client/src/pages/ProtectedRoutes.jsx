import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {


    const userInfo = useSelector((state)=>state.auth.userInfo)


    useEffect(() => {
      if (!userInfo) {
        console.log("User not authenticated");
      }
    }, [userInfo]);
  
    if (!userInfo) {
      return <Navigate to="/sign-in" />;
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoutes