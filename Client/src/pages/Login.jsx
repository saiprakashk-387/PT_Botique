import React, { useEffect, useState } from "react";
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
import { lightGreen } from "@mui/material/colors";
import { loginApi } from "../API/Api";
import { userLoginSelector } from "../redux/slice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { userLogin, isLoading, error } = useSelector(userLoginSelector);

  useEffect(() => {
    if (userLogin?.response?.status !== 200) {
      setLoading(false);
    }
  }, [userLogin?.response]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "6 characters required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      await dispatch(loginApi(data, navigate));
      // if(userLogin?.response?.status !== 200){
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
            Login
          </Typography>
          <form style={{ marginTop: 3, width: "100%" }}>
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
                Login
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
            <Typography>Not Registered Yet ? </Typography>
            <Link
              to="/register"
              variant="body2"
              style={{
                textDecoration: "none",
                marginLeft: 0.5,
                color: lightGreen,
              }}
            >
              {" Create an account"}
            </Link>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Login;
