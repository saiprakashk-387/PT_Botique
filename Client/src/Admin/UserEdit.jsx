import React from 'react'
import { useLocation } from 'react-router-dom';

const UserEdit = () => {
  const location = useLocation();
  console.log("props:",location?.state);
  return (
    <div>UserEdit</div>
  )
} 

export default UserEdit