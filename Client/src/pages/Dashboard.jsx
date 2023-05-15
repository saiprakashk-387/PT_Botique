import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Span from "@mui/material/Button";
import Button from "@mui/material/Button";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { productSelector } from "../redux/slice";
import { getStockList, addCart } from "../API/Api";
import ViewProduct from "./ViewProduct";
import Loader from "../Components/Loader/Loader";

export default function Dashboard() {
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { product, isLoading, error } = useSelector(productSelector);
  const [view, setView] = useState(false);
  const [productData, setProductData] = useState("");
  const [id, setid] = useState();

  useEffect(() => {
    dispatch(getStockList());
  }, []);

  const addToCart = (val) => {
    setid(val._id);
    dispatch(addCart(val));
  };
  const addToWishList = (val) => {
    console.log("list", val);
  };
  const viewProduct = (val) => {
    setView(true);
    setProductData(val);
  };
  const handleCloseViewModel = () => {
    setView(false);
  };
   return (
    <Box sx={{ flexGrow: 1, marginBottom: "4rem" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {isLoading ? (
          <Grid item xs={2} sm={4} md={4}>
            <Loader />
          </Grid>
        ) : error ? (
          "Something went wrong "
        ) : product?.data?.length >= 1 ? (
          product?.data?.map((val, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <Card >
                <CardMedia
                   component="img"
                  height="250"
                  // image={`${val.product_image}?w=248&fit=crop&auto=format`}
                  image={val.product_image}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{ padding: 0, marginBottom: "1rem" }}
                >
                  <Span>
                    <CurrencyRupeeIcon />
                    {`${val?.price}.00`}
                  </Span>
                  {id === val._id ? (
                    <Button disabled color="success">
                      Added To cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        addToCart(val);
                      }}
                    >
                      Add to cart
                    </Button>
                  )}

                  <Checkbox
                    onClick={() => {
                      addToWishList(val);
                    }}
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                  <Button
                    onClick={() => {
                      viewProduct(val);
                    }}
                  >
                    <VisibilityIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Loader />
        )}
      </Grid>
      <ViewProduct
        open={view}
        handleClose={handleCloseViewModel}
        productData={productData}
      />
    </Box>
  );
}
