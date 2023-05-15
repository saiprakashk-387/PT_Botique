import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { deleteStock, deleteUser, getStockList, getUserList } from "../API/Api";

export default function DeleteModel(props) {
  const { open, handleClose, value, deleteId, userDeleteID } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDeleteStock = async () => {
    let id = deleteId;
    await dispatch(deleteStock(id));
    handleClose();
    dispatch(getStockList());
  };
  const handleDeleteUser = async () => {
    let id = userDeleteID?._id;
    await dispatch(deleteUser(id));
    handleClose();
    dispatch(getUserList());
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {value
              ? `Do you Want to delete ${value}`
              : "Do you Want to delete User"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          {value ? (
            <Button onClick={handleDeleteStock} autoFocus>
              Agree
            </Button>
          ) : (
            <Button onClick={handleDeleteUser} autoFocus>
              Agree
            </Button>
          )}
          {/* <Button onClick={handleDeleteStock} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
