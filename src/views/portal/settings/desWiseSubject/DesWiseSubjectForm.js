import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import InputSelectApi from "components/form/InputSelectApi";
import { Form } from "formik/dist/index";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Link } from "react-router-dom";

const DesWiseSubjectForm = ({ setFieldValue, values }) => {
    return (
        <Form>
            <Row>
                <Col md={{span: 6, offset: 3}} className="mb-10">
                    <InputSelectApi
                        label="Designation"
                        name="designationId"
                        operationId={UrlBuilder.ntrcaApi("designationId/all")}
                        storeName="designationList"
                        type="text"
                        value="id"
                        required={true}
                        text="designationName"
                    />
                </Col>
                <Col md={{span: 6, offset: 3}} className="mb-10">
                    <InputSelectApi
                        label="Subject"
                        name="subjectId"
                        operationId={UrlBuilder.ntrcaApi("employee/religion/all")}
                        storeName="subjectList"
                        type="text"
                        value="id"
                        required={true}
                        text="subjectName"
                    />
                </Col>
                <Col md={{span: 6, offset: 3}} className="mb-10 mt-10">
                    <Button
                    
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        Submit
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                    <Link to="/portal/settings/designation-wise-subject/list">
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

export default DesWiseSubjectForm;
