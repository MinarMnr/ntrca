import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import { InputField, InputTextArea } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const TeacherPostForm = ({ setFieldValue, values }) => {
    return (
        <Form>
            <Row>
                <Col md={4} className="mb-10">
                    <InputField
                        label="পদবির নাম (ইংরেজি)"
                        name="designationName"
                        required={true}
                        type="text"
                        placeholder="পদবির নাম লিখুন"
                    />
                    <ErrorMessage fieldName="designationName" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="পদবির নাম (বাংলা)"
                        name="designationNameBn"
                        required={true}
                        type="text"
                        placeholder="পদবির নাম লিখুন"
                    />
                    <ErrorMessage fieldName="designationNameBn" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="পোষ্ট কোড"
                        name="designationCode"
                        required={true}
                        type="number"
                        placeholder="পোষ্ট কোড লিখুন"
                    />
                    <ErrorMessage fieldName="designationCode" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputTextArea
                        label="বিস্তারিত"
                        name="designationDescBn"
                        type="text"
                        required="true"
                    />
                    <ErrorMessage fieldName="designationDescBn" />
                </Col>
                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" /> সাবমিট করুন
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/settings/post/list">
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

export default TeacherPostForm;
