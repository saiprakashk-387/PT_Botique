import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { theme } from "../../theme/default";
import { admin, customer } from "../Routes/RouteList";

const useStyles = makeStyles({
  active: {
    background: theme.palette.default.main,
    color: theme.palette.primary.main,
    borderTopRightRadius: 20,
    borderEndEndRadius: 20,
    "&:hover": {
      background: theme.palette.default.main,
      color: theme.palette.primary.main,
      borderTopRightRadius: 20,
      borderEndEndRadius: 20,
    },
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: 16,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  activeIcon: {
    color: "#fff",
    fontSize: 16,
  },
});

const Sidebar = (props) => {
  const { setMobileOpen ,sample } = props;  
 const userRole= sessionStorage.getItem("role");
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Stack
        direction="column"
        spacing={1}
        marginTop={2}
        marginLeft={5}
        marginBottom={3}
      >
        <Avatar
          alt="Patnam-Trends"
          src="/Patnamtrends_2.png"
          sx={{ width: 120, height: 120 }}
        />
        <Typography
          variant="body1"
          fontWeight="bold"
          color="white"
          textAlign="left"
        >
          {sample?.data?.firstname  +" "+ sample?.data?.lastname}
        </Typography>
        <Typography
          fontFamily={"Source Sans Pro"}
          color="white"
          textAlign="left"
        >
          {sample?.data?.email}
        </Typography>
      </Stack>

      <List>
        {userRole === "customer" ?
                 customer.map((item) => (
          <div key={item.id}>
            <ListItem
              style={{ marginTop: 14 }}
              button
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon
                className={
                  location.pathname === item.path
                    ? classes.icon
                    : classes.activeIcon
                }
                sx={{color:"white"}}
              >
                {item.icon}
              </ListItemIcon>
              <Typography
                variant="body1"
                className={
                  location.pathname === item.path
                    ? classes.text
                    : classes.activeIcon
                }
              >
                {item.name}
              </Typography>
            </ListItem>
          </div>
        ))
        :  admin.map((item) => (
          <div key={item.id}>
            <ListItem
              style={{ marginTop: 14 }}
              button
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon
                className={
                  location.pathname === item.path
                    ? classes.icon
                    : classes.activeIcon
                }
              >
                {item.icon}
              </ListItemIcon>
              <Typography
                variant="body1"
                className={
                  location.pathname === item.path
                    ? classes.text
                    : classes.activeIcon
                }
              >
                {item.name}
              </Typography>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

Sidebar.propTypes = {
  setMobileOpen: PropTypes.func,
};

export default Sidebar;
