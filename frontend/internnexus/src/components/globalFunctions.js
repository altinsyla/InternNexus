import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const useGlobalFunctions = () => {
  const history = useHistory();

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/login");

    Toast.fire({
      icon: "success",
      title: "Logged out successfully",
      timer: 1500,
    });
  }, []);

  const verifyTokenExpiration = useCallback(async () => {
    try {
      await api.get("/user/verifytoken");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Your session has expired, please log in again!",
        icon: "error",
        // showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogOut();
          //   console.log("user confirmed")
        }
      });
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await api.get(
        "/user/" + localStorage.getItem("username")
      );
      //   setcurrentUser(response.data);
      return response.data;
    } catch (err) {
      console.log("Error getting custom users");
    }
  }, []);

  const getAllSkills = useCallback(async () => {
    try {
      const response = await api.get("/skills");

      return response.data
    } catch(err){
      console.log("Error getting skills");
    }
  });

  return { handleLogOut, verifyTokenExpiration, getCurrentUser, getAllSkills };
};

export default useGlobalFunctions;
