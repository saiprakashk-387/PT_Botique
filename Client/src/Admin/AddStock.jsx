import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { addstock } from "../API/Api";
import { addproductSelector } from "../redux/slice";

const AddStockForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [material, setMaterial] = React.useState("");
  const [cloth, setCloth] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [file, setfile] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [images] = React.useState([]);
  const { addProduct, isLoading, error } = useSelector(addproductSelector);

  // const handleImage = (e) => {
  //   // setfile(e.target.files);
  //   setImage(e.target.files);
  // };
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
   const deleteImage = (indexval) => {
    let allUsers = [...file];
    setfile(allUsers.filter((user, index) => index !== indexval));
  };
  const Input = styled("input")({
    display: "none",
  });
  // const uploadImage = () => {
  //   setLoading(true);
  //   const data = new FormData();
  //   for (let i = 0; i < image.length; i++) {
  //     data.append("file", image[i]);
  //   }
  //   data.append("upload_preset", "lisuczwe");
  //   data.append("cloud_name", "dignfufky");
  //   fetch("https://api.cloudinary.com/v1_1/dignfufky/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setUrl(data.url);
  //       setLoading(false);
  //     });
  // };
  const uploadStock = async () => {
    let data = {
      material_type: material,
      cloth_type: cloth,
      price: `${price}`,
      status: status,
      product_image: images[0]?.list,
    };
    dispatch(addstock(data, navigate));
    if (addProduct?.status === 200) {
      setMaterial("");
      setCloth("");
      setPrice("");
      setStatus("");
      setUrl("");
    }
  };
  const closeModel = () => {
    navigate("/admindashboard");
  };
  return (
    <div style={{ marginBottom: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 0, width: "100%" },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            "& > :not(style)": { m: 2, width: "25ch" },
          }}
        >
          <h4>Add Products</h4>
          <FormControl>
            <InputLabel id="demo-select-small">Material Type</InputLabel>
            <Select
              value={material}
              label="Material Type"
              onChange={(e) => {
                setMaterial(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={"dress"}>Dress</MenuItem>
              <MenuItem value={"saree"}>Saree</MenuItem>
              <MenuItem value={"hs"}>HS</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-select-small">Cloth Type</InputLabel>
            <Select
              value={cloth}
              label="Cloth Type"
              onChange={(e) => {
                setCloth(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={"cotton"}>Cotton</MenuItem>
              <MenuItem value={"nylon"}>Nylon</MenuItem>
              <MenuItem value={"polyster"}>Polyster</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-select-small">Price</InputLabel>
            <Select
              value={price}
              label="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={550}>550</MenuItem>
              <MenuItem value={600}>600</MenuItem>
              <MenuItem value={650}>650</MenuItem>
              <MenuItem value={700}>700</MenuItem>
              <MenuItem value={750}>750</MenuItem>
              <MenuItem value={800}>800</MenuItem>
              <MenuItem value={8500}>850</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={"available"}>Available</MenuItem>
              <MenuItem value={"very_soon"}>Very Soon</MenuItem>
              <MenuItem value={"not_available"}>Not Available</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              multiple
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
          {
            // <span onClick={uploadImage}>
            <span>
              {loading ? (
                <Button>
                  <LoadingButton
                    color="primary"
                    loading
                    size="large"
                    loadingPosition="center"
                    style={{
                      marginTop: 4,
                      color: "blue",
                      minHeight: 40,
                      minWidth: 150,
                    }}
                    variant="contained"
                  >{``}</LoadingButton>
                </Button>
              ) : images[0]?.list ? (
                <Button color="success">Photo Uploaded</Button>
              ) : (
                <Button variant="outlined" disabled>
                  Upload Photo
                </Button>
              )}
            </span>
          }
        </Box>
      </Box>
      {images && (
        <div style={{ width: "100%" }}>
          <Avatar
            alt="Travis Howard"
            src={`${images[0]?.list}`}
            sx={{ width: 200, height: 200 }}
          />
        </div>
      )}

      {material && cloth && price && status && images && (
        <>
          {isLoading ? (
            <Button sx={{ m: 4 }}>
              <LoadingButton
                color="primary"
                loading
                size="large"
                loadingPosition="center"
                style={{
                  marginTop: 4,
                  color: "blue",
                  minHeight: 40,
                  minWidth: 150,
                }}
                variant="contained"
              >{``}</LoadingButton>
            </Button>
          ) : (
            <Button
              sx={{ m: 4 }}
              variant="outlined"
              color="success"
              onClick={uploadStock}
            >
              Upload Stock
            </Button>
          )}
        </>
      )}
      <Button
        sx={{ m: 4 }}
        variant="outlined"
        color="success"
        onClick={closeModel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default AddStockForm;
