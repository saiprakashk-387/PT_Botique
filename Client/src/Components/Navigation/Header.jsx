import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TranslateIcon from "@mui/icons-material/Translate";
import Sidebar from "./Sidebar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { theme } from "../../theme/default";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutModel from "../Models/LogoutModel";
import { editProfile, getCart } from "../../API/Api";
import {  cartSelector, userEditProfileSelector } from "../../redux/slice";

const drawerWidth = 200;
function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { window } = props;
  const location = useLocation();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [translate, setTranslate] = React.useState(null);
  const [openLogoutModel, setOpenLogoutModel] = React.useState(false);

  const open = Boolean(translate);
   const { userEditProfile, isLoading, error } = useSelector(userEditProfileSelector);
   const { cart } = useSelector(cartSelector);
    useEffect(() => {
    dispatch(editProfile());
    dispatch(getCart());
  }, []);
    useEffect(() => {
    sessionStorage.setItem("userdetails", JSON.stringify(userEditProfile));
  }, [userEditProfile]);

  const handleClick = (event) => {
     setTranslate(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const userLogout = () => {
    setOpenLogoutModel(true);
  };
  const handleCloseLogoutModel = () => {
    setOpenLogoutModel(false);
  };

  const geticonClick=()=>{
    navigate("/mycart");
  }
  const handleOpenProfile = async () => {
    navigate("/myprofile");
    handleMenuClose();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
       <MenuItem onClick={handleMenuClose}>
        {" "}
        <Button onClick={userLogout}>
          {" "}
          <LogoutIcon style={{ fontSize: 20 }} /> Logout
        </Button>
      </MenuItem>
    </Menu>
  );
  const profile = sessionStorage.getItem("profilephoto");
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClick}>
        <Badge badgeContent={cart?.data?.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
        <Typography>Translate</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <Typography>Messages</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography>Notifications</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <Avatar
            alt="Remy Sharp"
            src="https://bi.im-g.pl/im/e9/ad/18/z25877225Q,Elon-Musk.jpg"
            sx={{ width: 30, height: 30 }}
          />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "#1FAA59" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#17405a",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={theme.palette.common.light}
            textTransform="capitalize"
          >
            Patnam Trends !
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}>
            {userEditProfile?.data?.role === 'admin'? null:<IconButton size="large" aria-label="show 4 new mails">
            <Badge badgeContent={cart?.data?.length} color="secondary" onClick={()=>{geticonClick()}}>
              <ShoppingCartIcon sx={{color:"white"}}/>
            </Badge>
            </IconButton>}
          
            <IconButton size="large" aria-label="show 4 new mails">
              <Badge badgeContent={0} color="error">
                <MailIcon sx={{color:"white"}} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon sx={{color:"white"}}/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              aria-haspopup="true"
            >
              <Avatar
                alt="Remy Sharp"
                src={`${userEditProfile?.data?.photoUrl}`}
                sx={{ width: 34, height: 34 }}
              />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, marginLeft: "auto" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
              aria-haspopup="true"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#17405a",
            },
          }}
        >
          {<Sidebar setMobileOpen={setMobileOpen} />}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#17405a",
            },
          }}
          open
        >
          {<Sidebar setMobileOpen={setMobileOpen} sample={userEditProfile} />}
        </Drawer>
      </Box>
      <LogoutModel
        open={openLogoutModel}
        handleClose={handleCloseLogoutModel}
      />
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
