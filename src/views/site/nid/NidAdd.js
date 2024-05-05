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
import { setToastAlert } from "../../../reducers/toastAlertSlice";
import { Nid } from "./Nid";
import NidAddForm from "./NidAddForm";
import "./Nid.scss";
import { useState } from "react";

const NidAdd = () => {
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState(false);

  const { loading } = useSelector(selectApi);

  return (
    <main className={"registration_main_div pt-30 pb-30"}>
      {loading && <ProgressBar />}
      <h3 className="text-center text-white"> NTRCA পোর্টালে স্বাগতম</h3>
      {/* <h3 className="text-center text-white"> WELCOME TO NTRCA Portal</h3> */}
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="registration rounded p-30">
            <h3 className="text-center mb-15 gradient-text">
              এন আই ডি যোগ করুন
            </h3>
            <div className="text-center mb-10">
              <FontAwesomeIcon icon={faUsers} className="loginicon" />
            </div>

            <Formik
              initialValues={Nid}
              enableReinitialize={true}
              validationSchema={Nid.validator()}
              onSubmit={(values, { resetForm }) => {
                if (values?.nidNew == "") {
                  setErrorMsg(true);
                } else if (values?.nidNew?.length != values?.feedbackOption) {
                  setErrorMsg(true);
                } else {
                  setErrorMsg(false);
                  dispatch(
                    callApi({
                      operationId: UrlBuilder.ntrcaApi(
                        "certified-applicant-information-update-request/nid/save"
                      ),
                      output: "Nid",
                      parameters: {
                        method: "POST",
                        body: JSON.stringify(values),
                      },
                    })
                  );
                }
                /**
                 * Reset form data.
                 */
                //resetForm({});
              }}
            >
              {(props) => {
                return <NidAddForm {...props} errorMsg={errorMsg} />;
              }}
            </Formik>
            <p>
              Already have an account?
              <Link to="/login" className="thembo ml-2">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NidAdd;
