import React, { useEffect,useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Strong from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Span from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Components/Loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModel from "../Utils/DeleteModel";
import ViewModelSlide from "../Utils/ViewModel";
import { getUserList } from "../API/Api";
import { userSelector } from "../redux/slice";
import { debounce } from "../Constants";

export default function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(userSelector);
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [openViewModel, setOpenViewModel] = React.useState(false);
  const [userDeleteID, setuserDeleteID] = React.useState();
  const [userViewData, setuserViewData] = React.useState();
  const [search, setSearch] = React.useState();

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const setDelay = useCallback(debounce((val)=>{
    setSearch(val)
  }
, 2000), []);

  const handleCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  };
  const userDelete = (val) => {
    setuserDeleteID(val);
    setOpenDeleteModel(true);
  };
  const userView = (val) => {
    setuserViewData(val);
    setOpenViewModel(true);
  };
  const handleCloseViewModel = () => {
    setOpenViewModel(false);
  };

  const userEdit = (url, ids) => {
    let val = ids?.rows;
    navigate(url, { state: val });
  };

  const filtered = !search
    ? users?.data
    : users?.data.filter((value) => {
        if (search === !null) {
          return value;
        } else if (
          value.firstname.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        } else if (value.email.toLowerCase().includes(search.toLowerCase())) {
          return value;
        }
      });

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        marginBottom: "4rem",
      }}
    >
      <Strong>Users List</Strong>
      <Span>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            placeholder="Search with Email"
            onChange={(e) => {   
              setDelay(e.target.value);
            }}
          />
        </Paper>
      </Span>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <Loader />
          ) : error ? (
            "Something Went Wrong"
          ) : (
            <TableBody>
              {filtered?.map((row,i) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                     <TableCell>{i+1}</TableCell>
                  <TableCell component="th" scope="row" >
                    {row.firstname + "" + row.lastname}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.mobile}</TableCell>                
                    <TableCell> {row.status === true ? <Span>{"Active" }</Span> : <Span  sx={{color:"red"}}>{"In-Active"}</Span>}</TableCell>                 
                  <TableCell>{row.role === "admin" ?<Span sx={{color:"green"}}>{"Admin"}</Span> :<Span  sx={{color:"orange"}}>{ "Customer"}</Span>}</TableCell>
                  <TableCell>
                    <img
                      src={`${row.photoUrl}`}
                      alt=""
                      style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        userView(row);
                      }}
                    >
                      {" "}
                      <VisibilityIcon />
                    </Button>
                    <Button
                      disabled
                      onClick={(e) => {
                        userEdit("/adminuseredit", { row });
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={(e) => {
                        userDelete(row);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <ViewModelSlide
        open={openViewModel}
        handleClose={handleCloseViewModel}
        userViewData={userViewData}
      />
      <DeleteModel
        open={openDeleteModel}
        handleClose={handleCloseDeleteModel}
        userDeleteID={userDeleteID}
      />
    </div>
  );
}
