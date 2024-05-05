import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import InputSelectApi from "components/form/InputSelectApi";
import { Form } from "formik/dist/index";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { quotaName } from "./quotaData";

const QuotaForm = ({ setFieldValue, values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="কোটার নাম"
                        name="quotaName"
                        type="text"
                        required={true}
                        placeholder="Quota Name in English"
                    />

                    <ErrorMessage fieldName="quotaName" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="কোটার নাম (বাংলায়)"
                        name="quotaNameBn"
                        type="text"
                        required={true}
                        placeholder="কোটার নাম লিখুন বাংলায়"
                    />

                    <ErrorMessage fieldName="quotaNameBn" />
                </Col>
                {/* <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="এলাকা"
                        name="areaStatusId"
                        operationId={UrlBuilder.commonApi(
                            "area-status/list?page=1&size=10"
                        )}
                        storeName="areaStatus"
                        value="id"
                        text="areaStatusDescriptionBn"
                        required={true}
                        onChange={(e) =>
                            setFieldValue("areaStatusId", e.target.value)
                        }
                    />
                    <ErrorMessage fieldName="areaStatusId" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="শতাংশ"
                        name="percentage"
                        type="number"
                        placeholder="শতাংশ লিখুন"
                        defaultInputValue="40"
                    />
                    <ErrorMessage fieldName="percentage" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputTextArea
                        label="বিস্তারিত"
                        name="quotaDescriptionBn"
                        type="text"
                        isRequired="true"
                    />
                    <ErrorMessage fieldName="quotaDescriptionBn" />
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
                    <Link to="/portal/settings/quota/list">
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

export default QuotaForm;
