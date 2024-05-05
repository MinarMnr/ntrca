import * as React from 'react';
import ResetPasswordForm from "./ResetPasswordForm";
import { Formik } from "formik/dist/index";
import { Login } from "./Login";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import { Redirect } from "react-router-dom";
import { AuthUser } from "../../../helpers/AuthUser";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faUndo,
    faTimes,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
const ResetPassword = () => {

    const dispatch = useDispatch();

    const {
        loading, authData = {
            data: {}
        }
    } = useSelector(selectApi);


    if (authData.accessToken !== undefined) {
        AuthUser.saveLoginData(authData);
        return <Redirect to='/portal/dashboard' />;
    }

    return (
        <main className="container mt-30 mb-30">
            {loading &&
                <ProgressBar />
            }
             
            <div className="row">
                <div className='col-lg-6 offset-lg-3'>
                    <div className="login rounded p-30">
                        <h3>Reset Password</h3>
                        {/* <div className='text-center mb-10'><FontAwesomeIcon icon={faUsers} className='loginicon' /></div> */}

                        <Formik
                            initialValues={Login}
                            enableReinitialize={true}
                            validationSchema={Login.validator()}
                            onSubmit={(values, { resetForm }) => {

                                dispatch(callApi({
                                    operationId: UrlBuilder.authApi('auth/login'),
                                    output: 'authData',
                                    parameters: {
                                        method: 'POST',
                                        body: Login.toString(values)
                                    }
                                }));

                                /**
                                 * Reset form data.
                                 */
                                // resetForm({});

                            }}
                        >
                            <ResetPasswordForm />
                        </Formik>
                        
                    </div>
                </div>
            </div>
        </main>
    )

};

export default ResetPassword;
