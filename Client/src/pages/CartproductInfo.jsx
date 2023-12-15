import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { removeCartItem } from "../API/Api";
import { useDispatch } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CartProductInfo(props) {
  const dispatch = useDispatch();
  const { productImage, productName, quantity, price, total, product_id } =
    props;
  // const removeItem = async (product_id) => {
  //   console.log("removeItem", product_id);
  //   let id = await product_id;
  //   await dispatch(removeCartItem(id));
  // };
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={productImage} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Product Name : {productName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Qty : {quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price (1 ps) : {`INR ${price}`}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography
                sx={{ cursor: "pointer" }}
                variant="body2"
                onClick={() => removeItem(product_id)}
              >
                Remove
              </Typography>
            </Grid> */}
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {`INR ${total}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
