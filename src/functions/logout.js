import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("token");
  // window.location.reload();
};
export default logout;
