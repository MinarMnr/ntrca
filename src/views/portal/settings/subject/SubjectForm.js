import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { InputField, InputTextArea } from "../../../../components/form";
import InputSelectApi from "components/form/InputSelectApi";
import { UrlBuilder } from "helpers/UrlBuilder";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { Form } from "formik/dist/index";

const SubjectForm = ({ values }) => {
    // console.log(values);
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="বিষয়ের নাম (ইংরেজি)"
                        name="subjectName"
                        required={true}
                        type="text"
                        placeholder="বিষয়ের নাম লিখুন"
                    />
                    <ErrorMessage fieldName="subjectName" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="বিষয়ের নাম (বাংলা)"
                        name="subjectNameBn"
                        required={true}
                        type="text"
                        placeholder="বিষয়ের নাম লিখুন"
                    />
                    <ErrorMessage fieldName="subjectNameBn" />
                </Col>

                <Col md={6} className="mb-10">
                    <InputField
                        label="বিষয় কোড"
                        name="subjectCode"
                        required={true}
                        type="number"
                        placeholder="বিষয় কোড লিখুন"
                    />
                    <ErrorMessage fieldName="subjectCode" />
                </Col>

                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="লেভেল"
                        name="levelId"
                        required={true}
                        operationId={UrlBuilder.ntrcaApi("level/all")}
                        storeName="levelNameBn"
                        type="text"
                        value="id"
                        text="levelNameBn"
                    />
                    <ErrorMessage fieldName="levelId" />
                </Col>
                {/* <Col md={4} className="mb-10">
                    <InputTextArea
                        label="বিস্তারিত"
                        name="subjectNameDescBn"
                        type="text"
                        //required="true"
                    />
                    <ErrorMessage fieldName="subjectNameDescBn" />
                </Col> */}

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
                    <Link to="/portal/settings/batch/list">
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

export default SubjectForm;
