import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

export default function ViewModelSlide(props) {
  const { open, handleClose, value ,viewData  ,userViewData} = props;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{value ? `${value} Details` : "User Details"}</DialogTitle>
        {value ? (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Cloth Type"
              type="text"
              value={viewData?.cloth_type}
              variant="standard"
              disabled
            />{" "}
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Material Type"
              type="text"
              value={viewData?.material_type}
              variant="standard"
              disabled
            />
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Price"
              value={viewData?.price}
              type="number"
              variant="standard"
              disabled
            />
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Status"
              value={viewData?.status}
              type="text"
              variant="standard"
              disabled
            />
            {""}
            <div style={{ width: "100%" }}>
          <Avatar
            alt="Travis Howard"
            src={`${viewData?.product_image}`}
            sx={{ width: 200, height: 200 }}
          />
        </div>
          </DialogContent>
        ) : (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label=" Name"
              type="text"
              value={userViewData?.firstname +""+ userViewData?.lastname}
              variant="standard"
              disabled
            />{" "}
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="text"
              value={userViewData?.email}
              variant="standard"
              disabled
            />
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Location"
              value={userViewData?.address1 +`${""}`+userViewData?.address2}
              type="text"
              variant="standard"
              disabled
            />
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Number"
              value={userViewData?.mobile}
              type="text"
              variant="standard"
              disabled
            />
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Status"
              value={userViewData?.status}
              type="text"
              variant="standard"
              disabled
            />
            {""}
            <TextField
              autoFocus
              margin="dense"
              label="Role"
              value={userViewData?.role}
              type="text"
              variant="standard"
              disabled
            />
            {""}
            <div style={{ width: "100%" }}>
          <Avatar
            alt="Travis Howard"
            src={`${userViewData?.photoUrl}`}
            sx={{ width: 200, height: 200 }}
          />
        </div>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
