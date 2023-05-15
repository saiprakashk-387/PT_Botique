import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
 import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import { allOrderListSelector } from "../redux/slice";
import { cancelOrderItemApi, orderListApi } from "../API/Api";
import Loader from "../Components/Loader/Loader";
import { Button } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Order() {
  const dispatch = useDispatch();
  const { Orderlist, isLoading, error } = useSelector(allOrderListSelector);

  useEffect(() => {
    dispatch(orderListApi());
  }, []);

  const cancelOrderedItem = async(id) => {
    let data ={
      "status" : "cancelled"
    }
    await dispatch(cancelOrderItemApi(id,data))
  };
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Typography
        varient="h1"
        margin={"auto"}
        variant="subtitle1"
        textAlign="center"
        fontWeight={500}
      >
        Order Summary
      </Typography>
      {isLoading ? (
        <Loader />
      ) : Orderlist?.length >= 1 ? (
        Orderlist.map((val, i) => {
          return (
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={val?.product_image} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Material Type : {val?.material_type}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Qty : {val?.qty}
                    </Typography>
                    <Typography variant="subtitle1">
                      Price: {val?.price}
                    </Typography>
                    <Button sx={{ color: "red" }} onClick={()=>{cancelOrderedItem(val?._id)}}>
                      Cancel Item
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })
      ) :error? (
        "Something Went Wrong"
      ) : (
        <Loader />
      )}
    </Paper>
  );
}
