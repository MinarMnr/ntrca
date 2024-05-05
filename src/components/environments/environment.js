import Cookies from "js-cookie";

export default {
  baseUrl: "http://192.168.1.13:8005",
  accessToken: "Bearer " + Cookies.get("access_token"),
  fileBaseUrl: "http://103.4.145.245/IEIMS/DSHE-MPO/",
};
