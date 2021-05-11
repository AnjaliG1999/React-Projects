import { toast } from "react-toastify";
import axios from "./axios";

const addToCart = (props, cake) => {
  if (!localStorage.token) {
    props.history.push("/login");
  } else {
    console.log("add cake", cake);
    axios({
      url: "/api/addcaketocart",
      method: "post",
      data: cake,
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        console.log(response);
        toast.success("Cake added to cart!");
      },
      (error) => {
        console.log(error);
      }
    );
  }
};
export default addToCart;
