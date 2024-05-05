import * as React from "react";
import { Link } from "react-router-dom";
import { Form } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import Checkbox from "../../../../components/form/Checkbox";
import TextEditor from "../../../../components/form/TextEditor";

const NotificationTypeForm = ({ setFieldValue, values }) => {
    let notificationTypeList = [
        {
            id: "INSTITUTE_JOB_REQUISITION_CIRCULAR_PUBLISHED",
            name: "INSTITUTE_JOB_REQUISITION_CIRCULAR_PUBLISHED".replace(
                /_/g,
                " "
            ),
        },
        {
            id: "JOB_APPLICATION_CIRCULAR_PUBLISHED",
            name: "JOB_APPLICATION_CIRCULAR_PUBLISHED".replace(/_/g, " "),
        },

        {
            id: "INSTITUTE_JOB_REQUISITION_APPROVED",
            name: "INSTITUTE_JOB_REQUISITION_APPROVED".replace(/_/g, " "),
        },

        {
            id: "INSTITUTE_JOB_REQUISITION_SUBMIT",
            name: "INSTITUTE_JOB_REQUISITION_SUBMIT".replace(/_/g, " "),
        },

        {
            id: "INSTITUTE_JOB_REQUISITION_REVIEW_FORWARD",
            name: "INSTITUTE_JOB_REQUISITION_REVIEW_FORWARD".replace(/_/g, " "),
        },

        {
            id: "INSTITUTE_JOB_REQUISITION_REVIEW_BACKWARD",
            name: "INSTITUTE_JOB_REQUISITION_REVIEW_BACKWARD".replace(
                /_/g,
                " "
            ),
        },

        {
            id: "INSTITUTE_JOB_REQUISITION_REJECTED",
            name: "INSTITUTE_JOB_REQUISITION_REJECTED".replace(/_/g, " "),
        },

        {
            id: "INSTITUTE_JOB_REQUISITION_BACK_TO_APPLICANT",
            name: "INSTITUTE_JOB_REQUISITION_BACK_TO_APPLICANT".replace(
                /_/g,
                " "
            ),
        },
    ];

    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputSelect
                        label="Notification Type "
                        name="notificationActionName"
                        data={notificationTypeList}
                        text="name"
                        value="id"
                        required={true}
                    />
                    <ErrorMessage fieldName="notificationActionName" />
                </Col>
                {/* <Col md={6} className="mb-10">
          <InputTextArea
            label="Notification Message"
            name="notificationMessage"
            required={true}
            type="text"
            placeholder="Enter Message"
          />
          <ErrorMessage fieldName="notificationMessage" />
        </Col>
        <Col md={6} className="mb-10">
          <InputField
            label="Notification Message (BN)"
            name="notificationMessageBn"
            required={true}
            type="text"
            placeholder="Enter Message In Bangla"
          />
          <ErrorMessage fieldName="addressLine1" />
        </Col> */}

                <Col md={6} className="d-flex flex-column">
                    <label className="text-center">Notification</label>
                    <Row className="justify-content-center">
                        <Col md={2} className="mb-10 align-self-center">
                            <Checkbox
                                label=" Push"
                                name="isPushNotification"
                                checked={
                                    values.isPushNotification ? true : false
                                }
                                onChange={(e) =>
                                    setFieldValue(
                                        "isPushNotification",
                                        e.target.checked
                                    )
                                }
                            />
                        </Col>
                        <Col md={2} className="mb-10 align-self-center">
                            <Checkbox
                                label=" Email"
                                name="isEmailNotification"
                                checked={
                                    values.isEmailNotification ? true : false
                                }
                                onChange={(e) =>
                                    setFieldValue(
                                        "isEmailNotification",
                                        e.target.checked
                                    )
                                }
                            />
                        </Col>
                        <Col md={2} className="mb-10 align-self-center">
                            <Checkbox
                                label=" SMS"
                                name="isSMSNotification"
                                checked={
                                    values.isSMSNotification ? true : false
                                }
                                onChange={(e) =>
                                    setFieldValue(
                                        "isSMSNotification",
                                        e.target.checked
                                    )
                                }
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    {/* <TextEditor label="Message Template" name="notificationMessage" setField={setFieldValue} values={values}/> */}
                    <InputTextArea
                        label="Notification Message "
                        name="notificationMessage"
                        required={true}
                        type="text"
                        placeholder="Enter Message"
                    />
                    <ErrorMessage fieldName="notificationMessage" />
                </Col>

                <Col md={12} className="mb-10 mt-10">
                    {/* <Link to="/portal/settings/Branch"> */}
                    <Button
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        Submit
                    </Button>

                    {/* </Link> */}

                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                    <Link to="/portal/notification-type/list">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            Cancel
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Form>
    );
};

export default NotificationTypeForm;
