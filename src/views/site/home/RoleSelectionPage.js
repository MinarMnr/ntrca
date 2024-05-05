import { Button } from "@themesberg/react-bootstrap";
import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthUser } from "../../../helpers/AuthUser";

const RoleSelectionPage = ({ authData }) => {
  const history = useHistory();
  let authRoles = [];
  authRoles.push(authData.roles[0]);

  const handleLoginRole = async (params) => {
    authRoles.push(params);
    const new_authData = await { ...authData, roles: [...authRoles] };
    AuthUser.saveLoginData(new_authData);

    return history.push("/portal/dashboard");
  };

  return (
    <main className="login_main_div pt-30 pb-30 px-4">
      <div className="text-center">
        <h1>Select User Type</h1>
      </div>
      <div className="bg-light rounded p-30 pt-80 pb-80 row justify-content-md-center gx-5">
        {authData.roles.map((item, index) => {
          return (
            index > 0 && (
              <div
                key={index}
                className="col col-md-3 btn btn-outline-gray aligncenter p-50 m-5"
                style={{
                  textAlign: "center",
                  boxShadow: "2px 2px #888888",
                }}
                onClick={() => handleLoginRole(item)}
              >
                {item.roleDesc}
              </div>
            )
          );
        })}
      </div>
    </main>
  );
};

export default RoleSelectionPage;
