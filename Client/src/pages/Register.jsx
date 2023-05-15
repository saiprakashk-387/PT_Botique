import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { registerApi } from "../API/Api";
import { createUserAccountSelector } from "../redux/slice";
 
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
   const { createAccount, isLoading, error } = useSelector(createUserAccountSelector);

useEffect(() => {
  if(createAccount?.response?.status !== 200){
    setLoading(false)
  }
}, [createAccount?.response])

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      address1: "",
      address2: "",
      password: "",
      // confirmPassword: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Firstname is required"),
      lastname: yup.string().required("Lastname is required"),
      email: yup.string().email().required("Email is required"),
      mobile: yup.string().max(10, "Must be 10 digits"),
      address1: yup.string().required("Address 1 is required"),
      address2: yup.string().required("Address 2 is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "6 characters required"),
    }),
    onSubmit: async (data) => {
      setLoading(true)
      await dispatch(registerApi(data, navigate));
      // if(createAccount?.response?.status !== 200){
      //   setLoading(false)
      // }
    },
  });
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <div>
      <Box
        fixed        
        sx={{
          overflow: "hidden",
          width: "100%",
          display: "flex",
          // backgroundImage: `url(${"https://assets.hongkiat.com/uploads/100-absolutely-beautiful-nature-wallpapers-for-your-desktop/blue-sea-sunset.jpg"})`,
          backgroundSize: "auto",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
         
        }}
      >
        <Paper
          elevation={4}
          style={{
            borderRadius: 0,
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 360,
            margin: "100px auto",
            padding: 20,
          }}
        >
          {" "}
          <Avatar
            src={"/Patnamtrends_2.png"}
            style={{
              marginTop: -8,
              backgroundColor: "lightgray",
              width: 75,
              height: 75,
            }}
          />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form style={{ marginTop: 3, width: "100%" }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="text"
              name="firstname"
              id="firstname"
              label="FirstName"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              helperText={
                formik.touched.firstname ? formik.errors.firstname : null
              }
              error={formik.touched.firstname ? formik.errors.firstname : null}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              required
              fullWidth
              type="text"
              name="lastname"
              id="lastname"
              label="LastName"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              helperText={
                formik.touched.lastname ? formik.errors.lastname : null
              }
              error={formik.touched.lastname ? formik.errors.lastname : null}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              required
              fullWidth
              type="email"
              name="email"
              id="email"
              label="Email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email ? formik.errors.email : null}
              error={formik.touched.email ? formik.errors.email : null}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              required
              fullWidth
              type="text"
              name="mobile"
              id="mobile"
              label="Mobile"
              autoComplete="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              helperText={formik.touched.mobile ? formik.errors.mobile : null}
              error={formik.touched.mobile ? formik.errors.mobile : null}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              type="text"
              name="address1"
              id="address1"
              label="Address 1"
              autoComplete="address1"
              value={formik.values.address1}
              onChange={formik.handleChange}
              helperText={
                formik.touched.address1 ? formik.errors.address1 : null
              }
              error={formik.touched.address1 ? formik.errors.address1 : null}
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              type="text"
              name="address2"
              id="address2"
              label="Address 2"
              autoComplete="address2"
              value={formik.values.address2}
              onChange={formik.handleChange}
              helperText={
                formik.touched.address2 ? formik.errors.address2 : null
              }
              error={formik.touched.address2 ? formik.errors.address2 : null}
            />
            <FormControl required fullWidth sx={{ mt: 3 }} variant="outlined">
              <InputLabel
                required
                error={formik.touched.password ? formik.errors.password : null}
              >
                Password
              </InputLabel>

              <OutlinedInput
                id="password"
                name="password"
                type={secureTextEntry ? "password" : "text"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password ? formik.errors.password : null}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleSecureEntry}
                      edge="end"
                    >
                      {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText error>
                {formik.touched.password ? formik.errors.password : null}
              </FormHelperText>
            </FormControl>

            {loading ? (
              <LoadingButton
                color="primary"
                loading
                fullWidth
                size="large"
                loadingPosition="start"
                style={{ marginTop: 4, color: "blue" }}
                variant="contained"
              >{``}</LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                style={{ marginTop: 4 }}
                onClick={formik.handleSubmit}
              >
                Register
              </Button>
            )}
          </form>
          <Grid
            item
            container
            style={{
              marginTop: 3,
              marginLeft: 15,
              color: "blue",
            }}
          >
            <Typography>Already have an account?</Typography>
            <Link
              to="/"
              variant="body2"
              style={{
                textDecoration: "none",
                marginLeft: 0.5,
                color: "orange",
              }}
            >
              {"Sign In"}
            </Link>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Register;
