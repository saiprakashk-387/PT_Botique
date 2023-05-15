import * as React from "react";
import Span from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
   import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewProduct(props) {
  const { open, handleClose, productData } = props;
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            p: 2,
            margin: "auto",
            flexGrow: 1,
            backgroundColor:"#e6e8f3" ,
            marginBottom: "15rem",
            marginTop: "1rem",
            width: "50%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
          }}
        > 
          <Box sx={{display:"inline-flex",justifyContent:"space-between",alignItems:"center",width:"100%" ,height:"300px"}}>
          <Box sx={{width:"50%"}}><img src={productData?.product_image} alt=""  style={{ width:"350px",height:"250px",  borderRadius: 10 }} /></Box>
          <Box sx={{width:"40%"}}> 
          <Typography>  <Span>Material Description</Span> <br /> add sourceImg, zoomedImg properties to make it possible to use different images for source and zoomed images </Typography></Box>
          </Box>
          <Divider variant="middle" />
          <Box sx={{display:"inline-flex",justifyContent:"space-evenly",alignItems:"center",width:"85%"}}>
          
            <Box sx={{width:"50%"}}>
            <Typography>  <Span>Material</Span> : {productData?.material_type}</Typography>
            <Typography>  <Span>Cloth</Span> : {productData?.cloth_type}</Typography>
            <Typography>  <Span>Status</Span> : {productData?.status}</Typography>
            </Box>
            <Box sx={{width:"25%"}}>
                <Typography>  <Span>Color</Span> : NA</Typography>
                <Typography>  <Span>Price</Span> : <CurrencyRupeeIcon/> {`${productData?.price}`}</Typography>
            </Box>
          </Box>
        </Box>        
      </Dialog>
    </div>
  );
}
