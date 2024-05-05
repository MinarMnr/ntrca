import { faUsers } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik/dist/index";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, clearState, selectApi } from "../../../reducers/apiSlice";
import {
  selectToastAlert,
  setToastAlert,
} from "../../../reducers/toastAlertSlice";
import { Register } from "./Register";
import RegisterForm from "./RegisterForm";
import "../login/login.scss";
import "./Register.scss";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    loading,
    authData = {
      data: {},
    },
  } = useSelector(selectApi);

  useEffect(() => {
    if (authData.data !== undefined) {
      dispatch(
        clearState({
          output: "authData",
        })
      );
      history.push("/login");
    }

    if (authData.status !== undefined && authData?.status == "error") {
      dispatch(
        setToastAlert({
          type: "error",
          message: authData.errors,
        })
      );
    }
  }, [dispatch, authData, history]);

  const { type } = useSelector(selectToastAlert);

  useEffect(() => {
    if (type === "success") {
      history.push("/login");
    }
  });

  return (
    <main className={"registration_main_div pt-30 pb-30"}>
      {loading && <ProgressBar />}
      <h3 className="text-center text-white"> NTRCA পোর্টালে স্বাগতম</h3>
      {/* <h3 className="text-center text-white"> WELCOME TO NTRCA Portal</h3> */}
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="registration rounded p-30">
            {/* <h3 className=" text-center">রেজিস্ট্রেশন ফরম</h3> */}
            <h3 className="text-center mb-15 gradient-text">
              রেজিস্ট্রেশন ফরম
            </h3>
            <div className="text-center mb-10">
              <FontAwesomeIcon icon={faUsers} className="loginicon" />
            </div>

            <Formik
              initialValues={Register}
              enableReinitialize={true}
              validationSchema={Register.validator()}
              onSubmit={(values, { resetForm }) => {
                dispatch(
                  callApi({
                    operationId: UrlBuilder.ntrcaApi("registration/save"),
                    output: "RegistrationData",
                    parameters: {
                      method: "POST",
                      body: JSON.stringify(values),
                    },
                  })
                );

                /**
                 * Reset form data.
                 */
                //resetForm({});
              }}
            >
              {(props) => {
                return <RegisterForm {...props} />;
              }}
            </Formik>
            <p>
              Already have an account?
              <Link to="/login" className="thembo ml-2">
                Login here
              </Link>
            </p>
            {/* <p>
              NID not found?
              <Link to="/nidAdd" className="thembo ml-2">
                Add NID here
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
