import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { Form } from "formik/dist/index";
import React from "react";
import {
    faSave,
    faUndo,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
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
const ResetPasswordForm = () => {
    return (
   
        <Form>
            <Row>
                <div className="form-group form-box">
                    <InputField className='input-text'
                        name='username'
                        type='text'
                        placeholder='Enter Your Username' />
                </div>
                <div className="form-group form-box">
                    <InputField
                        className='input-text'
                        name='password'
                        type='password'
                        placeholder='Enter Your Password' />
                </div>
                <div className="form-group form-box">
                    <InputField

                        className='input-text'
                        name='password'
                        type='password'
                        placeholder='Enter New Password' />
                </div>
                <Button variant='' className=' btn-md btn-theme btn-block' type='submit'>
                    Reset Password
                </Button> 
            </Row>
        </Form>
    );
};

export default ResetPasswordForm;
