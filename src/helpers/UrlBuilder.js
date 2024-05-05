import { AuthUser } from "./AuthUser";

const AUTH_API_BASE_URL = process.env.REACT_APP_AUTH_API_BASE_URL;
const COMMON_API_BASE_URL = process.env.REACT_APP_COMMON_API_BASE_URL;
const FOREIGN_API_BASE_URL = process.env.REACT_APP_FOREIGN_API_BASE_URL;
const FILE_SERVICE_API_BASE_URL =
  process.env.REACT_APP_FILE_SERVICE_API_BASE_URL;

const instituteTypeId = AuthUser.getInstituteTypeId();
class UrlBuilderHelper {
  api(path) {
    return path;
  }

  authApi(path) {
    // return `http://192.168.1.37:8033/api/v1/${path}`; //nazran
    //return `http://192.168.1.62:8033/api/v1/${path}`; //reja
    return `http://103.4.145.250:8033/api/v1/${path}`;
  }

  reviewerApi(path) {
    return `http://103.4.145.250:8035/api/v1/${path}`;
    // return `http://192.168.1.37:8033/api/v1/${path}`;
  }

  commonApi(path) {
    return `http://103.4.145.250:9000/api/v1/${path}`;
    // return `http://192.168.1.13:9000/api/v1/${path}`;

    //return `${COMMON_API_BASE_URL}/${path}`;
  }

  eiinApi(path) {
    return `http://103.4.145.250:8005/api/v1/${path}`;
    // return `http://192.168.1.13:9000/api/v1/${path}`;

    //return `${COMMON_API_BASE_URL}/${path}`;
  }

  ntrcaApi(path) {
    // return `http://192.168.1.37:8033/api/v1/${path}`; // nazran
    // return `http://192.168.1.62:8033/api/v1/${path}`; //reja
    return `http://103.4.145.250:8033/api/v1/${path}`;
    // return `http://192.168.1.205:8033/api/v1/${path}`; // nazran bhai new
  }

  mpoDsheApi(path) {
    if (instituteTypeId === 4 || instituteTypeId === 5) {
      return `http://103.4.145.250:8026/api/v1/${path}`;// Live Vai
    } else if (instituteTypeId === 14) {
      return `http://103.4.145.250:8029/api/v1/${path}`;// Live Vai
    } else {
      return `http://103.4.145.250:8024/api/v1/${path}`;// Live Vai
    } 
    // return `http://192.168.1.144:8024/api/v1/${path}`; //Alhajj Vaaai
    // return `http://192.168.1.205:8024/api/v1/${path}`;  // Nazran Vaaai
  }

  mpoDteApi(path) {
    return `http://103.4.145.250:8029/api/v1/${path}`; // Live Vai
  }

  mpoDmeApi(path) {
    return `http://103.4.145.250:8026/api/v1/${path}`; // Live Vai
  }

  mpoJoiningApi(path, instituteTypeId) {
    if (instituteTypeId === 4 || instituteTypeId === 5) {
      return `http://103.4.145.250:8026/api/v1/${path}`;// Live Vai
      // return `http://192.168.1.144:8026/api/v1/${path}`; //Alhajj Vaaai
      // return `http://192.168.1.205:8026/api/v1/${path}`;  // Nazran Vaaai
      // return `http://192.168.1.150:8026/api/v1/${path}`;  // Fahim Vaaai
    } else if (instituteTypeId === 14) {
      return `http://103.4.145.250:8029/api/v1/${path}`;// Live Vai
      // return `http://192.168.1.144:8029/api/v1/${path}`; //Alhajj Vaaai
      // return `http://192.168.1.205:8029/api/v1/${path}`;  // Nazran Vaaai
      // return `http://192.168.1.150:8029/api/v1/${path}`;  // Fahim Vaaai
    } else {
      return `http://103.4.145.250:8024/api/v1/${path}`;// Live Vai
      // return `http://192.168.1.144:8024/api/v1/${path}`; //Alhajj Vaaai
      // return `http://192.168.1.205:8024/api/v1/${path}`;  // Nazran Vaaai
      // return `http://192.168.1.150:8024/api/v1/${path}`;  // Fahim Vaaai
    }
  }



  fileServerApi(path) {
    return `http://103.4.145.245/IEIMS/ntrca-service/${path}`;
    //return `${FILE_SERVICE_API_BASE_URL}/${path}`;
  }

  keyClockApi(path) {
    //return `http://192.168.1.37:8005/api/v1/${path}`;
    return `http://103.4.145.250:8035/api/v1/${path}`;
  }

  socketClientApi() {
    return `http://192.168.1.234:5000`;
  }

  notificationClientApi(path) {
    return `http://103.4.145.250:8090/api/v1/${path}`;
  }
}

export const UrlBuilder = new UrlBuilderHelper();
