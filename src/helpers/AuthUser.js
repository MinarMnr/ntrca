import Cookies from "js-cookie";

class AuthUserHelper {
  getUser() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    return user || {};
  }

  getUserId() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    return user?.id || null;
  }

  getUserName() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    return user?.username || null;
  }

  getInstituteId() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    return user?.instituteId || null;
  }

  getInstituteTypeId() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    return user?.instituteTypeId || null;
  }

  getUserFullName() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    //return `${user?.firstName} ${user?.lastName}` || null;
    return `${user?.firstName}` || null;
  }

  getInstituteName() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    //return `${user?.firstName} ${user?.lastName}` || null;
    return `${user?.instituteName}` || null;
  }

  getApplicantNid() {
    const user =
      localStorage.getItem("auth_user") &&
      JSON.parse(localStorage.getItem("auth_user"));
    //return `${user?.firstName} ${user?.lastName}` || null;
    return `${user?.nid}` || null;
  }

  getRoles() {
    const roles =
      localStorage.getItem("auth_roles") &&
      JSON.parse(localStorage.getItem("auth_roles"));
    return roles || [];
  }

  getRolesID() {
    const rolesID = localStorage.getItem("auth_rolesID")
      ? JSON.parse(localStorage.getItem("auth_rolesID"))
      : [];
    return rolesID || [];
  }
  getRoleID() {
    const roleID = localStorage.getItem("auth_roleID")
      ? JSON.parse(localStorage.getItem("auth_roleID"))
      : null;
    return roleID || null;
  }

  getUserIndexNo() {
    const instituteResponse =
      localStorage.getItem("auth_user_institute") &&
      JSON.parse(localStorage.getItem("auth_user_institute"));
    return instituteResponse?.indexNumber || null;
  }

  getSearchIndexNo() {
    const searchIndex =
      localStorage.getItem("searchIndex") &&
      JSON.parse(localStorage.getItem("searchIndex"));
    return searchIndex || null;
  }

  getUserInstitute() {
    const instituteResponse =
      localStorage.getItem("auth_user_institute") &&
      JSON.parse(localStorage.getItem("auth_user_institute"));
    return instituteResponse || "";
  }

  getUserInstituteID() {
    const instituteResponse =
      localStorage.getItem("auth_user_institute") &&
      JSON.parse(localStorage.getItem("auth_user_institute"));
    return instituteResponse?.instituteId || "";
  }
  getUserInstituteTypeID() {
    const instituteResponse =
      localStorage.getItem("auth_user_institute") &&
      JSON.parse(localStorage.getItem("auth_user_institute"));
    return instituteResponse?.instituteType || "";
  }
  getUserInstituteThanaId() {
    const instituteResponse =
      localStorage.getItem("auth_user_institute") &&
      JSON.parse(localStorage.getItem("auth_user_institute"));
    return instituteResponse?.thanaCode || "";
  }
  getUserInstituteDistrictId() {
    const instituteResponse =
      localStorage.getItem("auth_user_institute") &&
      JSON.parse(localStorage.getItem("auth_user_institute"));
    return instituteResponse?.districtCode || "";
  }

  isLooggedIn() {
    return (
      Cookies.get("access_token") && Cookies.get("access_token").length > 0
    );
  }

  isExpired() {
    return localStorage.getItem("expiresIn")
      ? JSON.parse(localStorage.getItem("expiresIn"))
      : null;
  }

  saveLoginData(authData) {
    // save token
    let token =
      JSON.parse(JSON.stringify(authData)).accessToken !== undefined
        ? JSON.parse(JSON.stringify(authData)).accessToken
        : "";
    Cookies.set("access_token", token, { expires: 15 });

    // save user
    localStorage.setItem("auth_user", JSON.stringify(authData.user));
    localStorage.setItem("expiresIn", JSON.stringify(authData.expiresIn));

    // save user institute
    localStorage.setItem(
      "auth_user_institute",
      JSON.stringify(authData?.instituteResponse ?? "")
    );

    // save user roles
    let roles = [];
    authData.roles.forEach((item) => {
      roles.push(item.roleName);
    });
    localStorage.setItem("auth_roles", JSON.stringify(roles));

    let rolesID = [];
    authData.roles.forEach((item) => {
      rolesID.push(item.roleId);
    });
    localStorage.setItem("auth_rolesID", JSON.stringify(rolesID));

    let roleID = null;
    let DEO = "";
    let USEO = "";

    authData.roles.forEach((item) => {
      if (item.roleName !== "default-roles-banbeis") roleID = item.roleId;
      if (item.roleName == "DEO") DEO = item.roleName;
      if (item.roleName == "USEO" || item.roleName == "TEO")
        USEO = item.roleName;
    });

    localStorage.setItem("auth_roleID", JSON.stringify(roleID));
    localStorage.setItem("DEO", JSON.stringify(DEO));
    localStorage.setItem("USEO", JSON.stringify(USEO));
    localStorage.setItem("searchIndex", null);
  }

  removeLoginData() {
    Cookies.set("access_token", "");
    localStorage.setItem("auth_user", "");
    localStorage.setItem("auth_roles", "");
    localStorage.setItem("auth_user_institute", "");
    localStorage.setItem("auth_rolesID", "");
    localStorage.setItem("auth_roleID", "");
    localStorage.setItem("DEO", "");
    localStorage.setItem("USEO", "");
    localStorage.setItem("AP", "");
    localStorage.setItem("expiresIn", "");
    localStorage.setItem("searchIndex", "");
  }
}

export const AuthUser = new AuthUserHelper();
