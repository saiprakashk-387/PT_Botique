import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function LogoutModel(props) {
  const navigate = useNavigate();
  const { open, handleClose } = props;
  const handleLogout = () => {
    sessionStorage.removeItem("Token","name","profilephoto")  
    localStorage.clear() 
    handleClose();
    navigate("/")
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to logout.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleLogout}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
