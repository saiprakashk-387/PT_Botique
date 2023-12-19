import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Span from "@mui/material/Button";
import Strong from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../API/Api";
import Loader from "../Components/Loader/Loader";
import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartInfo = (props) => {
  const {
    item,
    increaseQ,
    decreaseQ,
    cartCountTotal,
    cartPriceTotal,
    error,
    isLoading,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [cartItems, setCartItems] = useState();

  const cartUpdate = async (id, value) => {
    setCartItems(item);
    setCartView(true);
  };
  const handleCartView = () => {
    setCartView(false);
  };
  const removeItem = async (id) => {
    await dispatch(removeCartItem(id));
  };
  const redirectDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          marginBottom: "4rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}
      >
        <Strong> My - Cart</Strong> <br />
        {isLoading ? (
          <Loader />
        ) : error ? (
          "something Went Wrong"
        ) : item?.length == 0 ? (
          <Typography sx={{ textAlign: "center" }}>
            No Items Found{" "}
            <Strong
              sx={{ color: "blue", textDecorationLine: "underline" }}
              onClick={() => {
                redirectDashboard();
              }}
            >
              Browse
            </Strong>
          </Typography>
        ) : (
          item?.length >= 1 &&
          item?.map((val, i) => {
            return (
              <>
                <Grid
                  container
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                    padding: 1,
                    marginBottom: 2,
                  }}
                >
                  <Grid sx={{ width: "35%" }}>
                    <ButtonBase>
                      <Img
                        alt="complex"
                        src={val?.product_image}
                        sx={{ width: 300, height: 200 }}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid sm container sx={{ width: "50%", margin: "64px" }}>
                    <Grid xs container direction="column">
                      <Grid xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          Material Type :{val?.material_type}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Cloth Type:{val?.cloth_type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {val?._id}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid xs container direction="column">
                      <Grid xs key={i}>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          <Button onClick={() => increaseQ(i)}>+</Button>
                          {val?.qty}
                          <Button onClick={() => decreaseQ(i)}>-</Button>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle1" component="div">
                        <CurrencyRupeeIcon />
                        {val.qty * val.price}
                      </Typography>
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        <Span
                          onClick={() => {
                            removeItem(val?._id);
                          }}
                          sx={{ color: "red" }}
                        >
                          {" "}
                          Remove
                        </Span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          })
        )}
        <hr />
        {item?.length >= 1 && (
          <>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ paddingRight: "3rem" }}
              >
                Sub-Total
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Items ({cartCountTotal})
                </Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ paddingRight: "10rem" }}
              >
                <CurrencyRupeeIcon />
                {cartPriceTotal}
              </Typography>
              <br />
            </Grid>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10rem",
              }}
            >
              <Button
                variant="contained"
                sx={{ borderRadius: 20, width: "17%" }}
                onClick={cartUpdate}
              >
                Checkout
              </Button>
            </Typography>
          </>
        )}
      </Paper>
      <CartSummary
        cartItems={cartItems}
        cartView={cartView}
        handleCartView={handleCartView}
        cartPriceTotal={cartPriceTotal}
        cartCountTotal={cartCountTotal}
      />
    </>
  );
};

export default CartInfo;
