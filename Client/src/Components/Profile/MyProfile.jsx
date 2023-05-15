import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  userEditProfileSelector } from "../../redux/slice/index";
import ProfileForm from "./ProfileForm";
import  Loader  from "../Loader/Loader";

const MyProfile = () => {
   const { userEditProfile, isLoading, error } = useSelector(userEditProfileSelector);

  return (
    <div>
      {isLoading ? (
        <span>
          <Loader />
        </span>
      ) : null}
      <ProfileForm sample={userEditProfile} />
    </div>
  );
};

export default MyProfile;
