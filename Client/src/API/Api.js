import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addProductAction,
  AllOrderListAction,
  cancelOrderItemAction,
  cartAction,
  cartListAction,
   CreateUserAccountAction,
   PlaceOrderAction,
   productAction,
   updateCartAction,
  UserEditProfileAction,
  UserLoginAction,
  usersAction,
  UserUpdateProfileAction,
} from "../redux/slice";

import { baseUrl, ACCESS_TOKEN } from "../Constants/index";

export const registerApi = (data, navigate) => {
  return (dispatch) => {
     axios
      .post(baseUrl + "/register", data)
      .then((res) => {
        dispatch(CreateUserAccountAction(res));
        navigate("/");
        toast.success("Registered Succesfully");
      })
      .catch((err) => {
        dispatch(CreateUserAccountAction(err));
        toast.error(`${err.response.data.error}`);
      });
  };
};

export const loginApi = (data, navigate) => {
  return (dispatch) => {
     axios
      .post(baseUrl + "/login", data)
      .then((res) => {
        sessionStorage.setItem("access_token", res?.data?.token);
        sessionStorage.setItem("role", res?.data?.user?.role);
        dispatch(UserLoginAction(res));
        if (res?.data?.user?.role === "customer") {
          navigate("/dashboard");
        } else if (res?.data?.user?.role === "admin") {
          navigate("/admindashboard");
        }
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`);
        dispatch(UserLoginAction(err));
       });
  };
};
///user apis////
///profile ///
export const editProfile = () => {
  return (dispatch) => {
     axios
      .get(baseUrl + "/myuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(UserEditProfileAction(res));
      })
      .catch((err) => {
          dispatch(UserEditProfileAction(err));
        toast.error(`${err.response.data.error}`);
      });
  };
};

export const updateProfile = (Value, id) => {
  return (dispatch) => {
     axios
      .put(baseUrl + `/edituser/${id}`, Value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(UserUpdateProfileAction(res));
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`);
        dispatch(UserUpdateProfileAction(err));
      });
  };
};
//////cart //////
export const getCart = () => {
  return (dispatch) => {
    axios
      .get(baseUrl + "/allcarts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(cartAction(res));
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};

export const addCart = (val) => {
   return (dispatch) => {
    axios
      .post(baseUrl + "/addcart", val, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
         toast.success(`${res.data.message}`)
        dispatch(cartListAction(res));
      })
      .catch((error) => {
        // toast.error(`${error}`);
        toast.error(`${error.response.data.error}`);
      });
  };
};
export const removeCartItem = (id) => {
  return (dispatch) => {
    axios
      .delete(baseUrl + `/delCart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(getCart());
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};
///order///
export const placeOrderApi =(requestBody)=>{
  return (dispatch) => {
    axios
     .post(baseUrl + `/placeOrder`, requestBody, {
       headers: {
         "Content-Type": "application/json",
         Authorization: ACCESS_TOKEN()
           ? `Bearer ${ACCESS_TOKEN()}`
           : undefined,
       },
     })
     .then((res) => {
       dispatch(PlaceOrderAction(res));
     })
     .catch((err) => {
       toast.error(`${err.response.data.error}`);
       dispatch(PlaceOrderAction(err));
     });
 };
}
export const orderListApi =()=>{
  return (dispatch) => {
    axios
     .get(baseUrl + `/allorders`, {
       headers: {
         "Content-Type": "application/json",
         Authorization: ACCESS_TOKEN()
           ? `Bearer ${ACCESS_TOKEN()}`
           : undefined,
       },
     })
     .then((res) => {
       dispatch(AllOrderListAction(res?.data[0]?.order_items[0]?.cartItems));
     })
     .catch((err) => {
       toast.error(`${err.response.data.error}`);
       dispatch(AllOrderListAction(err));
     });
 };
}

export const cancelOrderItemApi =(id,data)=>{
  return (dispatch) => {
    axios
     .put(baseUrl + `/updateOrder/${id}`,data, {
       headers: {
         "Content-Type": "application/json",
         Authorization: ACCESS_TOKEN()
           ? `Bearer ${ACCESS_TOKEN()}`
           : undefined,
       },
     })
     .then((res) => {
      if(res.status === 200){
        toast.success(`Cancellation Request Sent `);
      }
       dispatch(cancelOrderItemAction(res));
     })
     .catch((err) => {
       toast.error(`${err.response.data.error}`);
       dispatch(cancelOrderItemAction(err));
     });
 };
}


///////////////////////admin api's///////////////////////
///stock///
export const addstock = (data,navigate) => {
  return (dispatch) => {
     
    axios
      .post(baseUrl + "/createProduct", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(addProductAction(res));
        toast.success(`Product Added `);
        navigate("/viewstock");
      })
      .catch((err) => {
        // toast.error(`${err.message}`);
      });
  };
};
export const getStockList = () => {
  return (dispatch) => {
     axios
      .get(baseUrl + "/allproducts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(productAction(res));
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};
export const deleteStock = (id) => {
  return (dispatch) => {
    axios
      .delete(baseUrl + `/delProduct/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        // console.log("delres", res);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};
export const updateStock = (Data, id) => {
  return (dispatch) => {
    axios
      .put(baseUrl + `/updateProduct/${id}`, Data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        toast.success(`Product Updated`);
      })
      .then((err) => {
        toast.error(`${err}`);
      });
  };
};
////users data ///
export const getUserList = () => {
  return (dispatch) => {
    axios
      .get(baseUrl + "/allusers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(usersAction(res));
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};
export const deleteUser = (id) => {
  return (dispatch) => {
    axios
      .delete(baseUrl + `/deluser/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        toast.success(`User Deleted`);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};

////not used//
export const updateCartItems = (id,value) => {
  return (dispatch) => {
    axios
      .put(baseUrl+`/updateCart/${id}`,value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
          dispatch(updateCartAction(res));
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
};
