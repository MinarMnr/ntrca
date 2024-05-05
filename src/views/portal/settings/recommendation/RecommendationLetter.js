import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { InputField, InputSelect, InputTextArea } from "components/form";
import InputDatePicker from "components/form/InputDatePicker";
import ErrorMessage from "components/text/ErrorMessage";
import { UrlBuilder } from "helpers/UrlBuilder";
import { Field, useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";

const RecommendationLetter = ({ values, setFieldValue, ...props }) => {
    // const [fileSource, setFileSource] = useState(
    //     formType === "edit" ? "file" : "file"
    // );

    const [source, setSource] = useState(values?.source);

    const [imgState, setImgState] = useState({
        path: "",
    });

    const handlePhotoChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setImgState({
                ...imgState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setImgState({
                ...imgState,
                path: "",
            });
        }
    };

    const [leftImgState, setLeftImgState] = useState({
        path: "",
    });

    const handleLeftPhotoChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setLeftImgState({
                ...leftImgState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setLeftImgState({
                ...leftImgState,
                path: "",
            });
        }
    };

    const [rightImgState, setRightImgState] = useState({
        path: "",
    });

    const handleRightPhotoChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setRightImgState({
                ...rightImgState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setRightImgState({
                ...rightImgState,
                path: "",
            });
        }
    };

    return (
        <Form>
            <Row>
                <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                    <InputField
                        label="স্মারক নং"
                        name="memorandumNo"
                        required={true}
                        type="text"
                        placeholder="স্মারক নং লিখুন"
                    />
                    <ErrorMessage fieldName="memorandumNo" />
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                    <InputSelectApi
                        label="চাকুরীর বিজ্ঞপ্তি"
                        name="jobCircularId"
                        operationId={UrlBuilder.ntrcaApi(
                            `job-application-circular/all`
                        )}
                        storeName="jobCircular"
                        text="circularTitle"
                        value="id"
                        required={true}
                        type="text"
                        placeholder="স্মারক নং লিখুন"
                    />
                    <ErrorMessage fieldName="jobCircularId" />
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                    <label>
                        প্রকাশের তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        //showTime={true}
                        name="publishDate"
                        setField={setFieldValue}
                        dataValue={values?.publishDate}
                    />
                    <ErrorMessage fieldName="publishDate" />
                </Col>

                <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                    <label>
                        যোগদানের শুরুর তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        //showTime={true}
                        name="joiningStartDate"
                        setField={setFieldValue}
                        dataValue={values?.joiningStartDate}
                    />
                    <ErrorMessage fieldName="joiningStartDate" />
                </Col>

                <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                    <label>
                        যোগদানের শেষের তারিখ
                        <abbr style={{ color: "red" }} class="req">
                            *
                        </abbr>
                    </label>
                    <InputDatePicker
                        //showTime={true}
                        name="joiningEndDate"
                        setField={setFieldValue}
                        dataValue={values?.joiningEndDate}
                    />
                    <ErrorMessage fieldName="joiningEndDate" />
                </Col>

                <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                    <InputSelect
                        label="সার্কুলার আর্ডার"
                        name="circularOrder"
                        required={true}
                        storeName="examNameBn"
                        data={[
                            { orderId: 1 },
                            { orderId: 2 },
                            { orderId: 3 },
                            { orderId: 4 },
                            { orderId: 5 },
                        ]}
                        type="number"
                        value="orderId"
                        text="orderId"
                        onChange={async (e) => {
                            await setFieldValue("circularOrder", e.target.value);
                        }}
                    />
                </Col>

                <Col xl={12} lg={12} md={12} sm={6} className="mb-10">
                    <InputTextArea
                        label="বিষয়"
                        name="subject"
                        required={true}
                        type="text"
                        placeholder="বিষয়"
                    />
                    <ErrorMessage fieldName="subject" />
                </Col>
                <Row style={{ marginBottom: "40px" }}>
                    <Col xl={12} lg={12} md={12} sm={6} className="mb-10">
                        <label
                            htmlFor="source"
                            style={{ display: "block", marginBottom: "10px" }}
                        >
                            সূত্র
                        </label>

                        <ReactQuill
                            name="source"
                            value={values.source || ""}
                            onChange={(e) => setFieldValue("source", e)}
                            style={{ height: "200px", width: "100%" }}
                        />
                        <ErrorMessage fieldName="source" />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "40px" }}>
                    <Col xl={12} lg={12} md={12} sm={6} className="mb-10">
                        <label
                            htmlFor="declaration"
                            style={{ display: "block", marginBottom: "10px" }}
                        >
                            ঘোষণা/বিবৃতি
                        </label>

                        <ReactQuill
                            name="declaration"
                            value={values.declaration || ""}
                            onChange={(e) => setFieldValue("declaration", e)}
                            style={{ height: "200px", width: "100%" }}
                        />
                        <ErrorMessage fieldName="declaration" />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "40px" }}>
                    <Col xl={12} lg={12} md={12} sm={6} className="mb-10">
                        <label
                            htmlFor="recommendationRule"
                            style={{ display: "block", marginBottom: "10px" }}
                        >
                            শর্তসমূহ
                        </label>

                        <ReactQuill
                            name="conditions"
                            value={values.conditions || ""}
                            onChange={(e) => setFieldValue("conditions", e)}
                            style={{ height: "200px", width: "100%" }}
                        />
                        <ErrorMessage fieldName="conditions" />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                        <InputField
                            label="স্বাক্ষরকারীর নাম"
                            name="signerName"
                            required={true}
                            type="text"
                            placeholder="স্বাক্ষরকারীর নাম লিখুন"
                        />
                        <ErrorMessage fieldName="signerName" />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} className="mb-10">
                        <InputField
                            label="স্বাক্ষরকারীর পদবি"
                            name="signerDesignation"
                            required={true}
                            type="text"
                            placeholder="স্বাক্ষরকারীর পদবি লিখুন"
                        />
                        <ErrorMessage fieldName="signerDesignation" />
                    </Col>
                </Row>
                <Col lg={4} md={12} className="mb-30">
                    <label className="form-label">
                        বাম পাশের লোগো
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                        <span className="text-primary">
                            Allowed format jpg, jpeg, png and max file size 300
                            kb
                        </span>
                    </label>
                    <input
                        name="leftSideLogoUrl"
                        className={`form-control ${
                            props.touched.leftSideLogoUrl &&
                            props.errors.leftSideLogoUrl
                                ? "is-invalid"
                                : ""
                        }`}
                        type="file"
                        onInput={(event) => {
                            if (event.currentTarget.files[0] !== undefined) {
                                setFieldValue(
                                    "leftSideLogoUrl",
                                    event?.currentTarget?.files[0]
                                );
                            } else {
                                setFieldValue("leftSideLogoUrl", "");
                            }

                            handleLeftPhotoChange(event);
                        }}
                    />
                    {props.errors.leftSideLogoUrl && (
                        <div id="feedback" className="invalid-feedback">
                            {props.errors.leftSideLogoUrl}
                        </div>
                    )}
                </Col>

                <Col md={2} className="mb-20">
                    {leftImgState?.path ? (
                        <div className="donor-image">
                            <img
                                className="img-fluid rounded-circle "
                                src={leftImgState?.path}
                                id="preview-image"
                                alt="No Image Available"
                                style={{ height: "90px", width: "80px" }}
                            />
                        </div>
                    ) : (
                        <div className="donor-image">
                            <img
                                className="img-fluid rounded-circle "
                                src={UrlBuilder.fileServerApi(
                                    `${values?.leftSideLogoUrl}`
                                )}
                                id="preview-image"
                                alt="No Image Available"
                                style={{ height: "90px", width: "80px" }}
                            />
                        </div>
                    )}
                </Col>

                <Col lg={4} md={12} className="mb-30">
                    <label className="form-label">
                        স্বাক্ষর
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                        <span className="text-primary">
                            Allowed format jpg, jpeg, png and max file size 300
                            kb
                        </span>
                    </label>
                    <input
                        name="signatureUrl"
                        className={`form-control ${
                            props.touched.signatureUrl &&
                            props.errors.signatureUrl
                                ? "is-invalid"
                                : ""
                        }`}
                        type="file"
                        onInput={(event) => {
                            if (event.currentTarget.files[0] !== undefined) {
                                setFieldValue(
                                    "signatureUrl",
                                    event?.currentTarget?.files[0]
                                );
                            } else {
                                setFieldValue("signatureUrl", "");
                            }

                            handlePhotoChange(event);
                        }}
                    />
                    {props.errors.signatureUrl && (
                        <div id="feedback" className="invalid-feedback">
                            {props.errors.signatureUrl}
                        </div>
                    )}
                </Col>

                <Col md={2} className="mb-20">
                    {imgState?.path ? (
                        <div className="donor-image">
                            <img
                                className="img-fluid rounded-circle "
                                src={imgState?.path}
                                id="preview-image"
                                alt="No Image Available"
                                style={{ height: "90px", width: "80px" }}
                            />
                        </div>
                    ) : (
                        <div className="donor-image">
                            <img
                                className="img-fluid rounded-circle "
                                src={UrlBuilder.fileServerApi(
                                    `${values?.signatureUrl}`
                                )}
                                id="preview-image"
                                alt="No Image Available"
                                style={{ height: "90px", width: "80px" }}
                            />
                        </div>
                    )}
                </Col>

                <Col lg={4} md={12} className="mb-30">
                    <label className="form-label">
                        ডান পাশের লোগো
                        <abbr style={{ color: "red" }} className="req">
                            *
                        </abbr>
                        <span className="text-primary">
                            Allowed format jpg, jpeg, png and max file size 300
                            kb
                        </span>
                    </label>
                    <input
                        name="rightSideLogoUrl"
                        className={`form-control ${
                            props.touched.rightSideLogoUrl &&
                            props.errors.rightSideLogoUrl
                                ? "is-invalid"
                                : ""
                        }`}
                        type="file"
                        onInput={(event) => {
                            if (event.currentTarget.files[0] !== undefined) {
                                setFieldValue(
                                    "rightSideLogoUrl",
                                    event?.currentTarget?.files[0]
                                );
                            } else {
                                setFieldValue("rightSideLogoUrl", "");
                            }

                            handleRightPhotoChange(event);
                        }}
                    />
                    {props.errors.rightSideLogoUrl && (
                        <div id="feedback" className="invalid-feedback">
                            {props.errors.rightSideLogoUrl}
                        </div>
                    )}
                </Col>

                <Col md={2} className="mb-20">
                    {rightImgState?.path ? (
                        <div className="donor-image">
                            <img
                                className="img-fluid rounded-circle "
                                src={rightImgState?.path}
                                id="preview-image"
                                alt="No Image Available"
                                style={{ height: "90px", width: "80px" }}
                            />
                        </div>
                    ) : (
                        <div className="donor-image">
                            <img
                                className="img-fluid rounded-circle "
                                src={UrlBuilder.fileServerApi(
                                    `${values?.rightSideLogoUrl}`
                                )}
                                id="preview-image"
                                alt="No Image Available"
                                style={{ height: "90px", width: "80px" }}
                            />
                        </div>
                    )}
                </Col>

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color btn-primary"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        {/* {formType === "file" ? "সাবমিট করুন" : "ইডিট করুন"}
                         */}
                        সাবমিট করুন
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    {/* <Link to="/portal/circular/list"> */}
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="cancel"
                    >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                        বাতিল করুন
                    </Button>
                    {/* </Link> */}
                </Col>
            </Row>
        </Form>
    );
};
export default RecommendationLetter;
