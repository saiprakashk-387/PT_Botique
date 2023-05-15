import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MovingIcon from "@mui/icons-material/Moving";
import SettingsIcon from "@mui/icons-material/Settings";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StackedChart from "./Charts/StackedChart";
import PieChart from "./Charts/PieChart";
import FooterCards from "./Cards/FooterCards";

export default function AdminDashboard() {

  return (
    <Box>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
        <Card sx={{ display: "flex", backgroundColor: "#a8b18e3b", width: "300px", justifyContent: "center" }} >
          <PeopleAltIcon sx={{ width: 50, height: 100, color: "#215b64" }} />
          <CardContent sx={{ backgroundColor: "#f3e7e700" }}>
            <Typography sx={{ fontSize: 20 }} color="#215b64" gutterBottom>
              <strong> Users</strong>
            </Typography>
            <Typography variant="body2">Total:5</Typography>
            <Typography variant="body2">Increased by 50%</Typography>
          </CardContent>
        </Card>
        <Card sx={{ display: "flex", backgroundColor: "#84cbaa6b", width: "300px", justifyContent: "center" }}>
          <StorefrontIcon sx={{ width: 50, height: 100, color: "burlywood" }} />
          <CardContent sx={{ backgroundColor: "#f3e7e700" }}>
            <Typography sx={{ fontSize: 20 }} color="burlywood" gutterBottom>
              <strong>Stock</strong>
            </Typography>
            <Typography variant="body2">Total:5</Typography>
            <Typography variant="body2">Increased by 60%</Typography>
          </CardContent>
        </Card>
        <Card sx={{ display: "flex", backgroundColor: "#b8cde36b", width: "300px", justifyContent: "center" }}>
          {/* <CurrencyRupeeIcon
            sx={{ width: 50, height: 100, color: "rebeccapurple" }}
          /> */}
          <ManageHistoryIcon sx={{ width: 50, height: 100, color: "rebeccapurple" }} />
          <CardContent sx={{ backgroundColor: "#f3e7e700" }}>
            <Typography
              sx={{ fontSize: 20 }}
              color="rebeccapurple"
              gutterBottom
            >
              <strong>Orders</strong>
            </Typography>
            <Typography variant="body2">Total:5</Typography>
            <Typography variant="body2">Increased by 50%</Typography>
          </CardContent>
        </Card>
        <Card sx={{ display: "flex", backgroundColor: "#d9cc8a6b", width: "300px", justifyContent: "center" }}>
          <MovingIcon sx={{ width: 50, height: 100, color: "burlywood" }} />
          <CardContent sx={{ backgroundColor: "#f3e7e700" }}>
            <Typography sx={{ fontSize: 20 }} color="green" gutterBottom>
              <strong>Sales</strong>
            </Typography>
            <Typography variant="body2">Total:5</Typography>
            <Typography variant="body2">Increased by 60%</Typography>
          </CardContent>
        </Card>
      </Box>{" "}
      <br />
      <Box sx={{ display: "flex" }}>
        {/* /////two charts */}
        <Box sx={{ width: "50%" }}>
          <StackedChart />
        </Box>
        <Box sx={{ width: "45%" }}>
          <PieChart />
        </Box>
      </Box>
      <br />
      <FooterCards />
    </Box>
  );
}
