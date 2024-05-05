import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { AuthUser } from "../../../helpers/AuthUser";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import RoleSelectionPage from "../home/RoleSelectionPage";
import { Login } from "./Login";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    loading,
    authData = {
      data: {},
    },
  } = useSelector(selectApi);

  if (authData.accessToken !== undefined) {
    // if (authData.roles.length > 2) {
    //   return <RoleSelectionPage authData={authData} />;
    // } else {
    AuthUser.saveLoginData(authData);
    // }
    // return <Redirect to='/portal/dashboard' />;
  }

  return (
    <main className="login_main_div pt-30 pb-30">
      {loading && <ProgressBar />}
      {/* <h3 className="text-center text-white"> NTRCA পোর্টালে স্বাগতম</h3> */}
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="login rounded p-30">
          <h3 className="text-center mb-15 gradient-text"> Login Form</h3>
            {/* <h3 className="text-center mb-50 fw-bold text-muted">LOGIN FORM</h3> */}
            {/* <div className="text-center mb-10">
              <FontAwesomeIcon icon={faUsers} className="loginicon" />
            </div> */}

            <Formik
              initialValues={Login}
              enableReinitialize={true}
              validationSchema={Login.validator()}
              onSubmit={(values, { resetForm }) => {
                dispatch(
                  callApi({
                    operationId: UrlBuilder.authApi("auth/login"),
                    output: "authData",
                    parameters: {
                      method: "POST",
                      body: Login.toString(values),
                    },
                  })
                );

                /**
                 * Reset form data.
                 */
                // resetForm({});
              }}
            >
              <LoginForm />
            </Formik>
            <p>
              Don't have an account?
              <Link to="/register" className="thembo ml-2">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
