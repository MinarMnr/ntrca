import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import DesignationType from "constants/DesignationType";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField, InputSelect
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const DesignationForm = ({ setFieldValue, values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="Designation Name"
                        name="designationName"
                        required={true}
                        type="text"
                        placeholder="Enter Designation Name"
                    />
                    <ErrorMessage fieldName="designationName" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="Code"
                        name="designationCode"
                        type="text"
                        placeholder="Enter Code"
                    />
                    <ErrorMessage fieldName="designationCode" />
                </Col>
                {/* <Col md={6} className="mb-10">
                    <InputSelect
                      label="Type"
                      name="designationType"
                      type="text"
                      value="id"
                      data={[
                        { id: DesignationType.GENERAL, name: "GENERAL" },
                        { id: DesignationType.ADMINISTRATIVE, name: "ADMINISTRATIVE" },
                      ]}
                      required={true}
                      text="name"
                    />

                    <ErrorMessage fieldName="designationType" />
                </Col> */}
                <Col md={12} className="mb-10 mt-10">
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
                    <Link to="/portal/settings/designation/list">
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

export default DesignationForm;
