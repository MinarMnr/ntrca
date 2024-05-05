import React, { useEffect } from "react";
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
import ComboBox from "../../../components/search/SearchComponent";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import InputDate from "components/form/InputDate";
import { UrlBuilder } from "helpers/UrlBuilder";
import { useDispatch, useSelector } from "react-redux";
import { callApiWithoutLoading, callApi, selectApi } from "reducers/apiSlice";
import GlobalProgressBar from "helpers/GlobalProgressBar";
import { useState } from "react";
import { selectToastAlert } from "reducers/toastAlertSlice";
import moment from "moment";

const CertifiedApplicantsForm = ({ values, setFieldValue, errors }) => {
    const dispatch = useDispatch();
    const { type } = useSelector(selectToastAlert);

    const {
        upload = {
            data: {},
        },
    } = useSelector(selectApi);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `certified-applicant/upload-progress`
                ),
                output: "upload",
                storeName: "upload",
            })
        );
    }, [values]);

    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant/upload-progress`
                    ),
                    output: "upload",
                    storeName: "upload",
                })
            );
        }
    });

    var uploadStatus = upload?.data?.fileUploadProcessedStatus ?? "";

    useEffect(() => {
        var clear = setInterval(() => {
            if (uploadStatus == "IN_PROGRESS") {
                dispatch(
                    callApiWithoutLoading({
                        operationId: UrlBuilder.ntrcaApi(
                            `certified-applicant/upload-progress`
                        ),
                        output: "upload",
                        storeName: "upload",
                    })
                );
            }
        }, 2000);
        return () => clearInterval(clear);
    }, [uploadStatus]);

    // const [day, setDay] = useState(0);
    // const [hour, setHour] = useState(0);
    // const [minute, setMinute] = useState(0);
    // const [sec, setSec] = useState(0);

    // useEffect(() => {

    //     var clear = setInterval(() => {
    //         if (uploadStatus == "IN_PROGRESS") {
    //             dispatch(
    //                 callApiWithoutLoading({
    //                     operationId: UrlBuilder.ntrcaApi(
    //                         `certified-applicant/upload-progress`
    //                     ),
    //                     output: "upload",
    //                     storeName: "upload",
    //                 })
    //             );
    //             let diffTime = Math.abs(
    //                 new Date().valueOf() -
    //                     new Date(upload?.data?.fileUploadProcessedAt).valueOf()
    //             );
    //             uploadStatus = upload?.data?.fileUploadProcessedStatus;
    //             let days = diffTime / (24 * 60 * 60 * 1000);
    //             setDay(Math.floor(days));
    //             let hours = (days % 1) * 24;
    //             setHour(Math.floor(hours));
    //             let minutes = (hours % 1) * 60;
    //             setMinute(Math.floor(minutes));
    //             let secs = (minutes % 1) * 60;
    //             setSec(Math.floor(secs));

    //         }
    //     }, 1300);
    //     return () => clearInterval(clear);
    // }, [uploadStatus]);

    return (
        <Form>
            <Row>
                <Row className="action-col">
                    <Col md={4} className="mb-10">
                        <InputSelectApi
                            label="ব্যাচ"
                            name="examBatchId"
                            operationId={UrlBuilder.ntrcaApi("exam/all")}
                            storeName="examName"
                            value="id"
                            text="examNameBn"
                            required={true}
                            onChange={(e) =>
                                setFieldValue("examBatchId", e.target.value)
                            }
                        />

                        <ErrorMessage fieldName="examBatchId" />
                    </Col>
                </Row>
                <Row className="action-col">
                    <Col md={4} className="mb-10">
                        <label>
                            উত্তীর্ণ শিক্ষকদের তালিকা ফাইল{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <span className="text-primary">
                            {" "}
                            Allowed format xlxs, xls and max file size 50mb
                        </span>

                        <div className="display-block-ruby">
                            <input
                                label="উত্তীর্ণ শিক্ষকদের তালিকা ফাইল "
                                required
                                name="file"
                                type="file"
                                className={`form-control mt-5 ${
                                    errors.file ? "is-invalid" : ""
                                }`}
                                onChange={(event) => {
                                    setFieldValue(
                                        "file",
                                        event.currentTarget?.files[0]
                                    );
                                }}
                            />
                            <a
                                href="/demo/Applicants.xlsx"
                                target="_blank"
                                style={{
                                    color: "red",
                                    position: " relative",
                                    top: " 8px",
                                    paddingLeft: "10px",
                                }}
                            >
                                {" "}
                                <b>Download Sample File</b>
                            </a>
                        </div>
                        {errors.file && (
                            <div id="feedback" className="text-danger">
                                {errors.file}
                            </div>
                        )}
                        <ErrorMessage fieldName="file" />
                    </Col>
                </Row>
                <Row className="action-col">
                    <Col md={4} className="mb-10">
                        <label>
                            উত্তীর্ণ শিক্ষকদের শিক্ষাগত যোগ্যতা ফাইল{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <span className="text-primary">
                            {" "}
                            Allowed format xlxs, xls and max file size 50mb
                        </span>
                        <div className="display-block-ruby">
                            <input
                                label="উত্তীর্ণ শিক্ষকদের শিক্ষকদের শিক্ষাগত যোগ্যতা ফাইল"
                                required
                                name="educationFile"
                                type="file"
                                className={`form-control mt-5 ${
                                    errors.educationFile ? "is-invalid" : ""
                                }`}
                                onChange={(event) => {
                                    setFieldValue(
                                        "educationFile",
                                        event.currentTarget?.files[0]
                                    );
                                }}
                            />
                            <a
                                href="/demo/EduQualification.xlsx"
                                target="_blank"
                                style={{
                                    color: "red",
                                    position: " relative",
                                    top: " 8px",
                                    paddingLeft: "10px",
                                }}
                            >
                                {" "}
                                <b>Download Sample File</b>
                            </a>
                        </div>
                        {errors.educationFile && (
                            <div id="feedback" className="text-danger">
                                {errors.educationFile}
                            </div>
                        )}
                        <ErrorMessage fieldName="educationFile" />
                    </Col>
                </Row>
                {uploadStatus == "IN_PROGRESS" && (
                    <>
                        <Row className="action-col">
                            <Col md={4} className="mb-10 mt-10">
                                <h5 className="text-center">
                                    <b>ফাইল আপলোডের সময়কাল </b>
                                </h5>
                                <hr />
                                <div className="p-4 d-flex justify-content-center">
                                    <b>
                                        {moment(
                                            upload?.data?.fileUploadProcessedAt
                                        ).format("YYYY-MM-DD hh:mm a")}
                                    </b>
                                    {/* <div
                                        className="countdown countdown-horizontal"
                                        id="countdown"
                                    >
                                        <div className="countdown-unit countdown-days countdown-unit-vertical ">
                                            <div className="badge ">{day}</div>
                                            <label
                                                name="label-days"
                                                className="text-light bg-dark"
                                            >
                                                দিন
                                            </label>
                                        </div>
                                        <div className="countdown-unit countdown-hours countdown-unit-vertical ">
                                            <div className="badge  "> {hour}</div>
                                            <label
                                                name="label-hours"
                                                className="text-light bg-dark"
                                            >
                                                ঘন্টা
                                            </label>
                                        </div>
                                        <div className="countdown-unit countdown-mins countdown-unit-vertical ">
                                            <div className="badge  "> {minute}</div>
                                            <label
                                                name="label-mins"
                                                className="text-light bg-dark"
                                            >
                                                মিনিট
                                            </label>
                                        </div>
                                        <div className="countdown-unit countdown-seconds countdown-unit-vertical ">
                                            <div className="badge  "> {sec}</div>
                                            <label
                                                name="label-seconds"
                                                className="text-light bg-dark"
                                            >
                                                সেকেন্ড
                                            </label>
                                        </div>
                                    </div> */}
                                </div>
                                {upload?.data?.fileUploadProcessedPercentage >
                                    0 && (
                                    <GlobalProgressBar
                                        completed={
                                            upload?.data
                                                ?.fileUploadProcessedPercentage
                                        }
                                        bgcolor={"#3E7AEB"}
                                    />
                                )}
                            </Col>
                        </Row>
                    </>
                )}
                <Row className="action-col">
                    <Col md={4} className="mb-10 mt-10">
                        <Button
                            variant=""
                            className="f-right btn-color btn-primary"
                            type="submit"
                            disabled={
                                uploadStatus == "IN_PROGRESS" ? true : false
                            }
                        >
                            <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                            সাবমিট করুন
                        </Button>
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="reset"
                            disabled={
                                uploadStatus == "IN_PROGRESS" ? true : false
                            }
                        >
                            <FontAwesomeIcon icon={faUndo} className="me-2" />{" "}
                            রিসেট
                        </Button>
                        <Link to="/portal/dashboard">
                            <Button
                                variant="white"
                                className="f-right mr-10"
                                type="cancel"
                                disabled={
                                    uploadStatus == "IN_PROGRESS" ? true : false
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="me-2"
                                />{" "}
                                বাতিল করুন
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Row>
        </Form>
    );
};

export default CertifiedApplicantsForm;
