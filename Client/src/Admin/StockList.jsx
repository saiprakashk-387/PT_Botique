import React, { useEffect, useState ,useCallback} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Strong from "@mui/material/Button";
import Span from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteModel from "../Utils/DeleteModel";
import ViewModelSlide from "../Utils/ViewModel";
import { useDispatch, useSelector } from "react-redux";
import { getStockList } from "../API/Api";
import { productSelector } from "../redux/slice";
import Loader from "../Components/Loader/Loader";
import { debounce } from "../Constants";

const StockList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading, error } = useSelector(productSelector);
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [openViewModel, setOpenViewModel] = React.useState(false);
  const [deleteId, setDeleteId] = useState();
  const [viewData, setviewData] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    dispatch(getStockList());
  }, []);

  const setDelay = useCallback(debounce((val)=>{
    setSearch(val)
  }
, 2000), []);

  const handleCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  };
  const stockDelete = (val) => {
    setDeleteId(val?._id);
    setOpenDeleteModel(true);
  };
  const stockView = (val) => {
    setviewData(val);
    setOpenViewModel(true);
  };
  const handleCloseViewModel = () => {
    setOpenViewModel(false);
  };
  const stockEdit = (url, ids) => {
    let val = ids?.row;
    navigate(url, { state: val });
  };
  const filtered = !search
    ? product?.data
    : product?.data.filter((value) => {
        if (search === !null) {
          return value;
        } else if (
          value.material_type.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        } else if (
          value.cloth_type.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        }
      });
  
  return (
    <div
      style={{
        marginBottom: "4rem",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Strong>Stock List</Strong>
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
            placeholder="Search with Cloth ,Material -Type"
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
              <TableCell>Cloth Type</TableCell>
              <TableCell>Material Type</TableCell>
              <TableCell>Price (INR)</TableCell>
              <TableCell>Status</TableCell>
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
              {filtered?.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.cloth_type}
                  </TableCell>
                  <TableCell>{row.material_type}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {row.status === "available" ? (
                      <Span sx={{color:"green"}}>{"Available"}</Span>
                    ) : row.status === "very_soon" ? (
                      <Span sx={{color:"orange"}}>{"Very Soon"}</Span>
                    ) : (
                      <Span sx={{color:"rebeccapurple"}}>{"Not Available"}</Span>
                    )}
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${row.product_image}`}
                      alt=""
                      style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        stockView(row);
                      }}
                    >
                      {" "}
                      <VisibilityIcon />
                    </Button>
                    <Button
                      onClick={(e) => {
                        stockEdit("/stockedit", { row });
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={(e) => {
                        stockDelete(row);
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
        value={"Stock"}
        viewData={viewData}
      />
      <DeleteModel
        open={openDeleteModel}
        handleClose={handleCloseDeleteModel}
        value={"stock"}
        deleteId={deleteId}
      />
    </div>
  );
};

export default StockList;
