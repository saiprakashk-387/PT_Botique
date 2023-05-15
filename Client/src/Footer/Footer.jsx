import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const drawerWidth = 200;

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#e3d9c4fa",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        left: 0,
        bottom: 0,
        position: "fixed",
      }}
    >
      <Toolbar sx={{ flexGrow: 1 ,display:"flex",justifyContent:"space-between"}}>
        <Typography variant="h6" component="div">
          PT ! 2021-2022 Devc
        </Typography>
        <Typography variant="h6" component="div">
          Crafted With React
        </Typography>
      </Toolbar>
    </Box>
  );
}
