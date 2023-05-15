import React ,{useState} from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Strong from "@mui/material/Button";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../API/Api";

const StockEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
   const [image, setImage] = useState("");
   const [url, setUrl] = useState("");

  const sample = location?.state;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cloth_type: sample?.cloth_type,
      material_type: sample?.material_type,
      price: sample?.price,
      status: sample?.status,
      product_image: url,
    },

    onSubmit: async (Data) => {
      dispatch(updateStock(Data ,sample?._id ,(Data.product_image = url?url:sample.product_image)))
      setTimeout(() => {
        navigate("/viewstock");
      }, 500);
    },
  });
  
  const uploadImage = () => {
    // setStatus(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "lisuczwe");
    data.append("cloud_name", "dignfufky");
    fetch("https://api.cloudinary.com/v1_1/dignfufky/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        // setStatus(false);
      })
      .catch((err) => console.log(err));
  };
  
  const Input = styled("input")({
    display: "none",
  });

  return (
    <div style={{marginBottom:"4rem"}}>
      <Strong>Stock Details - Edit</Strong>
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
            label="Product Name"
            margin="dense"
            color="secondary"
            name="cloth_type"
            value={formik?.values?.cloth_type}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Material Type"
            margin="dense"
            color="secondary"
            name="material_type"
            value={formik.values?.material_type}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Price"
            margin="dense"
            color="secondary"
            name="price"
            value={formik.values?.price}
            onChange={formik.handleChange}
            focused
          />
          <TextField
            label="Status"
            margin="dense"
            color="secondary"
            name="status"
            value={formik.values?.status}
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
                    onChange={(e) => setImage(e.target.files[0])}
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
             {url ? (
              <Avatar alt="Travis Howard" src={`${url}`} sx={{ width: 200, height: 200 }} />
            ) : (
              <Avatar alt="Travis Howard" src={`${sample?.product_image}`} sx={{ width: 200, height: 200 }} />
            )}             
            </Badge>
          </Stack>   <br />
          {image && (
          <span onClick={uploadImage}>
            {url ? (
              <Button color="success">Photo Uploaded</Button>
            ) : (
              <Button variant="outlined">Upload Photo</Button>
            )}
          </span>
        )}      
        </Box>
      </Box>
      <Button  onClick={formik.handleSubmit} sx={{ m:4 }} variant="outlined">Update </Button>
    </div>
  );
};

export default StockEdit;
