import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { editProfile, updateProfile } from "../../API/Api";
import Loader from "../Loader/Loader";

const ProfileForm = (props) => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sample } = props;
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [images] = React.useState([]);
   const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: sample?.data?.email,
      mobile: sample.data?.mobile,
      firstname: sample?.data?.firstname,
      lastname: sample?.data?.lastname,
      address2: sample?.data?.address2,
      address1: sample?.data?.address1,
      // photoUrl: url,
      photoUrl: images[0]?.list,
    },

    onSubmit: async (Data, reset) => {
       dispatch(
        updateProfile(
          Data,
          sample.data._id,
          // (Data.photoUrl = url ? url : sample.data.photoUrl)
        )
      );
      setTimeout(() => {
        if (sample?.data?.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/dashboard");
        }
        dispatch(editProfile());
      }, 500);
    },
  });

  const handleImage = (e) => {
    let files = e.target.files;
    Object.values(files).map((val, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(val);
      reader.onload = () => {
        const imageslist = reader.result;
        images.push({ list: imageslist });
        setImage(val);
      };
    });
  };
   // const uploadImage = () => {
  //   setStatus(true);
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "lisuczwe");
  //   data.append("cloud_name", "dignfufky");
  //   fetch("https://api.cloudinary.com/v1_1/dignfufky/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setUrl(data.url);
  //       setStatus(false);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const Input = styled("input")({
    display: "none",
  });
  const canclePrfileForm = () => {
    if (sample?.data?.role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 0, width: "60ch" },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            "& > :not(style)": { m: 2, width: "25ch" },
          }}
        >
          <TextField
            label="First Name"
            margin="dense"
            color="secondary"
            name="firstname"
            value={formik?.values?.firstname}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Last Name"
            margin="dense"
            color="secondary"
            name="lastname"
            value={formik.values?.lastname}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Email"
            margin="dense"
            color="secondary"
            name="email"
            value={formik.values?.email}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Mobile"
            margin="dense"
            color="secondary"
            name="mobile"
            value={formik.values?.mobile}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Address 1"
            margin="dense"
            color="secondary"
            name="address1"
            value={formik.values?.address1}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Address 2 "
            margin="dense"
            color="secondary"
            name="address2"
            value={formik.values?.address2}
            onChange={formik.handleChange}
            focused
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            "& > :not(style)": { m: 8, width: "60ch" },
          }}
        >
          <Stack direction="row" spacing={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    // onChange={(e) => setImage(e.target.files[0])}
                    onChange={(e) => handleImage(e)}
                  />
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera sx={{ width: 50, height: 50 }} />
                  </IconButton>
                </label>
              }
            >
              {images[0]?.list ? (
                <Avatar
                  alt="Travis Howard"
                  src={`${images[0]?.list}`}
                  sx={{ width: 200, height: 200 }}
                />
              ) : (
                <Avatar
                  alt="Travis Howard"
                  src={`${sample?.data?.photoUrl}`}
                  sx={{ width: 200, height: 200 }}
                />
              )}
              {/* {url ? (
                <Avatar
                  alt="Travis Howard"
                  src={`${url}`}
                  sx={{ width: 200, height: 200 }}
                />
              ) : (
                <Avatar
                  alt="Travis Howard"
                  src={`${sample?.data?.photoUrl}`}
                  sx={{ width: 200, height: 200 }}
                />
              )} */}
            </Badge>
          </Stack>{" "}
          <br />
          {/* {image && ( */}
            {/* <span onClick={uploadImage}> */}
            <span >
              {image ? (
                <Button color="success">Photo Uploaded</Button>
              ) : (
                <Button variant="outlined">Upload Photo</Button>
              )}
            </span>
          {/* )} */}
        </Box>
      </Box>
      {status ? (
        <Loader />
      ) : (
        <Button onClick={formik.handleSubmit} sx={{ m: 2 }} variant="outlined">
          Update{" "}
        </Button>
      )}
      <Button onClick={canclePrfileForm} sx={{ m: 2 }} variant="outlined">
        Cancel{" "}
      </Button>
    </div>
  );
};

export default ProfileForm;
