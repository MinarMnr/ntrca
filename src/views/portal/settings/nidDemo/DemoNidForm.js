import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import InputDatePicker from "components/form/InputDatePicker";
// import { quotaName } from "./quotaData";

const DemoNidForm = ({ setFieldValue, values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-15">
                    <InputField
                        label="নাম"
                        name="name"
                        type="text"
                        required={true}
                        placeholder="Enter Name"
                    />
                    <ErrorMessage fieldName="name" />
                </Col>

                <Col md={6} className="mb-15">
                    <label>
                        জন্ম তারিখ
                        <span className="text-danger">*</span>
                    </label>
                    <InputDatePicker
                        // showTime={true}
                        className="mb-15 "
                        name="dateOfBirth"
                        setField={setFieldValue}
                        dataValue={values?.dateOfBirth}
                    />

                    <ErrorMessage fieldName="dateOfBirth" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="বাবার নাম"
                        name="fatherName"
                        type="text"
                        required={true}
                        placeholder="Enter Father Name"
                    />
                    <ErrorMessage fieldName="fatherName" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="মায়ের নাম"
                        name="motherName"
                        type="text"
                        required={true}
                        placeholder="Enter Mother Name"
                    />
                    <ErrorMessage fieldName="motherName" />
                </Col>
                <Col md={6} className="mb-15">
                    <InputField
                        label="NID নাম্বার"
                        name="nidNumber"
                        type="text"
                        required={true}
                        placeholder="Enter NID Number"
                    />
                    <ErrorMessage fieldName="nidNumber" />
                </Col>

                <Col md={6} className="mb-15">
                    <InputSelect
                        label="লিঙ্গ"
                        name="gender"
                        data={[
                            {
                                id: "MALE",
                                name: "MALE",
                            },
                            {
                                id: "FEMALE",
                                name: "FEMALE",
                            },
                        ]}
                        storeName="exam"
                        value="id"
                        text="name"
                        type="number"
                        required={true}
                    />
                    <ErrorMessage fieldName="gender" />
                </Col>

                <Col>
                    <InputTextArea
                        label={`স্থায়ী ঠিকানা`}
                        name="permanentAddress"
                        type="text"
                        required={true}
                    />
                </Col>

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        সাবমিট করুন
                    </Button>

                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/settings/demo-nid/list">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            বাতিল করুন
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Form>
    );
};

export default DemoNidForm;
