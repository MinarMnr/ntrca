import {
    faTrashAlt,
    faPlusSquare,
    faSave,
    faUndo,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
//import { faPlusSquare } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import InputSelectApi from "components/form/InputSelectApi";
import { FieldArray, Form } from "formik/dist/index";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { InputField } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const ExperienceSubjectWisePostForm = ({ values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="প্রতিষ্ঠানের ধরন"
                        name="instituteTypeId"
                        operationId={UrlBuilder.commonApi(`institute-type/all`)}
                        required={true}
                        storeName="instituteTypeName"
                        value="id"
                        text="instituteTypeNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="instituteTypeId" />
                </Col>

                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="প্রতিষ্ঠানের স্তর"
                        name="educationLevelId"
                        required={true}
                        operationId={
                            values.instituteTypeId
                                ? UrlBuilder.ntrcaApi(
                                      `govt-regulation-recruitment-post-subject-level-grade/education-level/all?instituteTypeId=${values.instituteTypeId}`
                                  )
                                : ""
                        }
                        storeName="educationLevelName"
                        value="id"
                        text="educationLevelNameBn"
                        type="number"
                    />
                    <ErrorMessage fieldName="educationLevelId" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="পদবির ধরন"
                        required={true}
                        name="postId"
                        type="number"
                        value="id"
                        operationId={UrlBuilder.ntrcaApi("designation/all")}
                        storeName="designation"
                        text="designationNameBn"
                    />
                    <ErrorMessage fieldName="postId" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="বিষয়ের নাম"
                        name="subjectId"
                        //required={true}
                        type="number"
                        value="id"
                        operationId={UrlBuilder.ntrcaApi("subject/all")}
                        storeName="subject"
                        text="subjectNameBn"
                    />
                </Col>
            </Row>

            <Col md={12} className="mb-10 mt-10">
                <Button variant="" className="f-right btn-color" type="submit">
                    <FontAwesomeIcon icon={faSave} className="me-2" /> সাবমিট
                </Button>
                <Button variant="white" className="f-right mr-10" type="reset">
                    <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                </Button>
                <Link to="/portal/settings/subject-wise-post">
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="cancle"
                    >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                        বাতিল
                    </Button>
                </Link>
            </Col>
        </Form>
    );
};

export default ExperienceSubjectWisePostForm;
