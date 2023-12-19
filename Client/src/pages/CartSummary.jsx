import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { placeOrderApi } from "../API/Api";
import CartProductInfo from "./CartproductInfo";
import { useNavigate } from "react-router-dom";
import { RazorpayApiKey, baseUrl } from "../Constants";
import useRazorpay from "react-razorpay";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function CartSummary(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const {
    cartView,
    handleCartView,
    cartItems,
    cartCountTotal,
    cartPriceTotal,
  } = props;
  const [addressInfo, setAddressInfo] = useState();
  const [checkAddress, setCheckAddress] = useState();
  const UserDetails = JSON.parse(sessionStorage.getItem("userdetails"));

  const handleOrderAddress = (e) => {
    let value = e.target.value;
    setCheckAddress(value);
    const addres1 = {
      name: UserDetails?.data?.firstname + UserDetails?.data?.lastname,
      email: UserDetails?.data?.email,
      number: UserDetails?.data?.mobile,
      address:
        value === "primary"
          ? UserDetails?.data?.address1
          : UserDetails?.data?.address2,
    };
    setAddressInfo(addres1);
  };

  const createOrder = async (requestBody) => {
    const { data } = await axios.post(baseUrl + `/createOrder`, {
      amount: requestBody.total * 100,
      currency: "INR",
    });
    return data;
  };
  const placeOrder = async () => {
    const requestBody = {
      order_items: { cartItems },
      total: cartPriceTotal,
      userInfo: [addressInfo],
      status: "dipatched",
    };
    const order = await createOrder(requestBody);
    const options = {
      key: RazorpayApiKey,
      amount: requestBody.total * 100,
      currency: "INR",
      name: "Patnam Trends",
      description: "Test Transaction",
      order_id: order.id,
      handler: (res) => {
        fetch(baseUrl + `/verifySignature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transaction: res.razorpay_payment_id,
            orderID: res.razorpay_order_id,
            signature: res.razorpay_signature,
          }),
        })
          .then((verificationResponse) =>
            // console.log("resss", verificationResponse)
            verificationResponse.json()
          )
          .then(async (verificationData) => {
            await dispatch(placeOrderApi(requestBody, navigate));
          })
          .catch((verificationError) => {
            console.error("Error verifying payment:", verificationError);
          });
      },
      prefill: {
        name: "Sai Prakash",
        email: "sai387@yopmail.com",
        contact: "9999999999",
      },
      notes: {
        address: requestBody,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };
  const placeOrderError = () => {
    toast.error(`Select Address`);
  };
  const closeCartSummar = () => {
    setCheckAddress("");
    handleCartView();
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={cartView}
        onClose={handleCartView}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cart Summary
            </Typography>
            <Button autoFocus color="inherit" onClick={() => closeCartSummar()}>
              Cancel {""}
              <IconButton edge="start" color="inherit" aria-label="close">
                <CloseIcon />
              </IconButton>
            </Button>
          </Toolbar>
        </AppBar>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            marginBottom: "1rem",
            width: "80%",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={7}>
              {cartItems && cartItems.length >= 1
                ? cartItems.map((val, i) => {
                    return (
                      <>
                        <Item>
                          <CartProductInfo
                            productImage={val?.product_image}
                            productName={val?.material_type}
                            quantity={val?.qty}
                            price={val?.price}
                            total={val?.qty * val?.price}
                            product_id={val?._id}
                          />
                        </Item>
                        <hr />
                      </>
                    );
                  })
                : "loading"}
            </Grid>
            <Grid item xs={6} md={5}>
              <Item>
                <Typography varient="h1">Order Details</Typography>
                <Box>
                  <Typography varient="h3">
                    Choose Shipping Address *
                  </Typography>
                  <FormControl>
                    <RadioGroup row>
                      <Box sx={{ textAlign: "left" }}>
                        <Box>
                          <FormControlLabel
                            onChange={(e) => {
                              handleOrderAddress(e);
                            }}
                            value={"primary"}
                            control={<Radio />}
                            label="Primary"
                          />
                        </Box>
                        <Box>
                          <Typography varient="h3">
                            {UserDetails?.data?.firstname +
                              UserDetails?.data?.lastname}
                          </Typography>
                          <Typography varient="h3">
                            {UserDetails?.data?.email}
                          </Typography>
                          <Typography varient="h3">
                            {UserDetails?.data?.address1}
                          </Typography>
                          <Typography varient="h3">
                            {UserDetails?.data?.mobile}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "left" }}>
                        <Box>
                          <FormControlLabel
                            onChange={(e) => {
                              handleOrderAddress(e);
                            }}
                            value={"secondary"}
                            control={<Radio />}
                            label="Secondary"
                          />
                        </Box>
                        <Box>
                          <Typography varient="h3">
                            {UserDetails?.data?.firstname +
                              UserDetails?.data?.lastname}
                          </Typography>
                          <Typography varient="h3">
                            {UserDetails?.data?.email}
                          </Typography>
                          <Typography varient="h3">
                            {UserDetails?.data?.address2}
                          </Typography>
                          <Typography varient="h3">
                            {UserDetails?.data?.mobile}
                          </Typography>
                        </Box>
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </Box>
                <hr />
                <Box>
                  <Typography varient="h3">
                    {" "}
                    Total Qty : {cartCountTotal}
                  </Typography>
                  <Typography varient="h3">
                    Total Payable Amount :INR {cartPriceTotal}
                  </Typography>
                </Box>
                {checkAddress ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={placeOrder}
                  >
                    Order Now
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    // disabled
                    onClick={placeOrderError}
                  >
                    Order Now
                  </Button>
                )}
              </Item>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </div>
  );
}
