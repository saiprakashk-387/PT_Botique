import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../../index.css";

import { DiamondCard, LiquidCard, RingProgressCard } from "./CardView";

export default function FooterCards() {
  const style = {
    height: 300,
    width: 250,
    backgroundColor: "#white",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding: "10px",
  };
  return (
    <Grid sx={{ flexGrow: 1, marginBottom: "4rem"}} container spacing={0}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" spacing={10}>
          <Grid item>
            <Paper
              sx={style}
            >
              <strong style={{ margin: "10px" }}> Shipped Order 1</strong>
              <div class="circle blue">
                <LiquidCard />
              </div>
              <Typography sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{ color: "white", backgroundColor: "#F4664A" }}
                >
                  View All Data
                </Button>
              </Typography>{" "}
              <br />
              <Typography sx={{ textAlign: "center", display: "flex" }}>
                <span style={{ width: "50%" }}>
                  1,266 <br /> Stock
                </span>
                <span style={{ width: "50%" }}>
                  1,254 <br /> Sold
                </span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={style}
            >
              <strong style={{ margin: "10px" }}> Shipped Order 2</strong>
              <br />
              <div class="circle blue">
                <DiamondCard />
              </div>
              <Typography sx={{ textAlign: "center" }}>
                <Button variant="contained" sx={{ color: "white" }}>
                  View All Data
                </Button>
              </Typography>{" "}
              <br />
              <Typography sx={{ textAlign: "center", display: "flex" }}>
                <span style={{ width: "50%" }}>
                  1,266 <br /> Stock
                </span>
                <span style={{ width: "50%" }}>
                  1,254 <br /> Sold
                </span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={style}
            >
              <strong style={{ margin: "10px" }}> Shipped Order 3</strong>{" "}
              <br />
              <div class="circle blue">
                <LiquidCard />
              </div>
              <Typography sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{ color: "white", backgroundColor: "#F4664A" }}
                >
                  View All Data
                </Button>
              </Typography>{" "}
              <br />
              <Typography sx={{ textAlign: "center", display: "flex" }}>
                <span style={{ width: "50%" }}>
                  1,266 <br /> Stock
                </span>
                <span style={{ width: "50%" }}>
                  1,254 <br /> Sold
                </span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={style}
            >
              <strong style={{ margin: "10px" }}> Shipped Order 4</strong>{" "}
              <br />
              <div class="circle blue">
                <RingProgressCard />
              </div>
              <Typography sx={{ textAlign: "center" }}>
                <Button variant="contained" sx={{ color: "white" }}>
                  View All Data
                </Button>
              </Typography>{" "}
              <br />
              <Typography sx={{ textAlign: "center", display: "flex" }}>
                <span style={{ width: "50%" }}>
                  1,266 <br /> Stock
                </span>
                <span style={{ width: "50%" }}>
                  1,254 <br /> Sold
                </span>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
