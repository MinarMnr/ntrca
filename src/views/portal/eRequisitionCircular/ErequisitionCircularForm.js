import React, { useEffect, useRef, useState } from "react";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { UrlBuilder } from "helpers/UrlBuilder";
import InputDatePicker from "components/form/InputDatePicker";
import FindComboBox from "components/material/FindComponent";

const ErequisitionCircularForm = ({
    values,
    formType,
    errors,
    setFieldValue,
}) => {
    const [fileSource, setFileSource] = useState(
        formType === "edit" ? "text" : "file"
    );

    const [hasFile, sethasFile] = useState(true);

    useEffect(() => {
        if (values?.encloserList?.length > 0) {
            sethasFile(true);
        } else {
            sethasFile(false);
        }
    }, [values]);

    const [errorMessage, setErrorMessage] = useState("");
    // console.log(errorMessage, "errorMessage");
    const jsonArrayString = values?.instituteTypeList;

    // Convert the variable to a string and then check if it's not empty

    useEffect(() => {
        if (jsonArrayString?.toString().trim() !== "") {
            try {
                const parsedArray = JSON.parse(jsonArrayString);

                const hasIdOne =
                    Array.isArray(parsedArray) &&
                    parsedArray.find((item) => item.id === 1);

                if (hasIdOne && hasIdOne.id === 1 && parsedArray.length > 1) {
                    setErrorMessage("আপনি ইতিমধ্যে 'কোনটি নয়' নির্বাচন করেছেন");
                } else {
                    setErrorMessage("");
                }
            } catch (error) {
                console.error("Error parsing JSON:", error.message);
            }
        } else {
            console.error("JSON string is empty");
        }
    }, [jsonArrayString]);

    return (
        <Form>
            <Row>
                <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <InputField
                        label="শিরোনাম"
                        name="title"
                        type="text"
                        placeholder="শিরোনাম"
                        required={true}
                    />
                    <ErrorMessage fieldName="title" />
                </Col>
                <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <InputField
                        label="আবেদন ফী"
                        name="applicationFee"
                        type="number"
                        placeholder="আবেদন ফী"
                        required={true}
                    />
                    <ErrorMessage fieldName="applicationFee" />
                </Col>
                <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <InputSelectApi
                        label="বিজ্ঞপ্তির নিয়মাবলী"
                        name="jobApplicationRuleId"
                        required={true}
                        operationId={UrlBuilder.ntrcaApi(
                            "job-application-rule/all"
                        )}
                        storeName="job-application-rule"
                        type="number"
                        value="id"
                        text="ruleNameBn"
                    />
                </Col>
                {/* <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <InputField
                        label="ফী প্রদানের সময়সীমা12"
                        name="feePaymentValidityHour"
                        type="number"
                        placeholder="ফী প্রদানের সময়সীমা (ঘন্টায়)"
                        required={true}
                    />
                    <ErrorMessage fieldName="feePaymentValidityHour" />
                </Col> */}

                <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <label>
                        প্রকাশের তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="publishDate"
                        setField={setFieldValue}
                        dataValue={values?.publishDate}
                    />
                </Col>

                <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <label>
                        কার্যকর তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="effectiveDate"
                        setField={setFieldValue}
                        dataValue={values?.effectiveDate}
                    />
                </Col>
                <Col xl={4} lg={4} md={6} sm={12} className="mb-10">
                    <label>
                        মেয়াদ উত্তীর্ণের তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        showTime={true}
                        name="expiryDate"
                        setField={setFieldValue}
                        dataValue={values?.expiryDate}
                    />
                </Col>

                <Col md={6} className="mb-10">
                    <label class="form-label">
                        প্রতিষ্ঠানের ধরন
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <FindComboBox
                        title="instituteTypeNameBn"
                        name="instituteTypeList"
                        setField={setFieldValue}
                        storeName="instituteList"
                        isMultiple={true}
                        formType={formType}
                        operationId={UrlBuilder.ntrcaApi(`institute-type/all`)}
                        allValue={values}
                        placeHolder="প্রতিষ্ঠানের ধরন"
                        selectType="object"
                    ></FindComboBox>

                    <div style={{ color: "red" }}>{errorMessage}</div>
                </Col>

                {/* <Col md={6} className="mb-10">
                    <InputField
                        label="এনক্লোজার ফাইল"
                        name="file"
                        type="file"
                        placeholder="এনক্লোজার ফাইল"
                    />
                    <ErrorMessage fieldName="file" />
                </Col> */}

                <Col xl={4} lg={4} md={6} sm={6} className="mb-10 pt-6 m-10">
                    <div className="form-group">
                        <label>
                            ফাইল আপলোড{"  "}
                            {formType === "edit" &&
                                values &&
                                values.encloserList &&
                                values.encloserList?.length > 0 && (
                                    <a
                                        href={UrlBuilder.fileServerApi(
                                            `${
                                                values &&
                                                values.encloserList &&
                                                values.encloserList?.length >
                                                    0 &&
                                                values.encloserList[0]
                                                    .encloserUrl
                                            }`
                                        )}
                                        target="_blank"
                                        style={{ color: "red" }}
                                    >
                                        VIEW PDF
                                    </a>
                                )}
                        </label>

                        <input
                            id="attachment"
                            name="files"
                            //type="file"
                            type={fileSource}
                            className={`form-control ${
                                errors.files ? "is-invalid" : ""
                            }`}
                            defaultValue={
                                hasFile
                                    ? values &&
                                      values.encloserList &&
                                      values.encloserList?.length > 0 &&
                                      values?.encloserList[0]?.encloserUrl
                                    : "Click here to upload file"
                            }
                            onChange={(event) => {
                                setFieldValue(
                                    "files[0]",
                                    event.currentTarget.files[0]
                                );
                            }}
                            onClick={() => {
                                setFileSource("file");
                            }}
                        />
                        {errors.files && (
                            <div id="feedback" className="text-danger">
                                {errors.files}
                            </div>
                        )}
                    </div>
                </Col>

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color btn-primary"
                        type="submit"
                        disabled={errorMessage}
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        {formType == "add" ? "সাবমিট করুন" : "ইডিট করুন"}
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/e-requisition/circular">
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

export default ErequisitionCircularForm;
