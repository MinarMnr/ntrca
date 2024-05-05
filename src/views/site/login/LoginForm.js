import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import React from "react";
import { faSave, faUndo, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import InputField from "../../../components/form/InputField";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { Link } from "react-router-dom";
import "./login.scss";
const LoginForm = () => {
  return (
    <Form>
      <Row>
        <div className="form-group form-box">
          <InputField
            className="input-text"
            name="username"
            type="text"
            placeholder="Username or Eiin or Nid"
          />
        </div>
        <div className="form-group form-box">
          <InputField
            className="input-text"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="form-group checkbox clearfix">
          <div className="form-check checkbox-theme">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>{" "}
          {/* <Link to="/reset-password" className="reset-password ml-50">
              Forgot Password
            </Link> */}
        </div>
        {/* <Button variant="success" className="btn btn-block btn-lg btn-primary" type="submit">
                        <FontAwesomeIcon icon={faLock} className="me-2"/> Login
                    </Button> */}
        <Button variant="" className="btn-md btn-theme btn-block" type="submit">
          {/* <FontAwesomeIcon icon={faSave} className='me-2' /> */}
          Login
        </Button>
      </Row>
    </Form>
    // <Form>
    //     <Row>
    //         <Col md={12} className="mb-20">
    //             <InputField
    //                 label="Username"
    //                 name="username"
    //                 type="text"
    //                 placeholder="Enter Username"
    //             />
    //             <ErrorMessage fieldName="username"/>
    //         </Col>
    //         <Col md={12} className="mb-20">
    //             <InputField
    //                 label="Password"
    //                 name="password"
    //                 type="password"
    //                 placeholder="Enter Password"
    //             />
    //             <ErrorMessage fieldName="password"/>
    //         </Col>
    //         <Col md={12} className="mb-10 mt-10">

    //         </Col>
    //     </Row>
    // </Form>
  );
};

export default LoginForm;
