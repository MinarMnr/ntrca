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

const CertifiedApplicantsUploadFileForm = ({
    values,
    setFieldValue,
    errors,
    parentId,
    examRefId,
}) => {
    const dispatch = useDispatch();
    const { type } = useSelector(selectToastAlert);

    const {
        upload = {
            data: {},
        },
    } = useSelector(selectApi);

    // useEffect(() => {
    //     dispatch(
    //         callApi({
    //             operationId: UrlBuilder.ntrcaApi(
    //                 `certified-applicant/upload-progress`
    //             ),
    //             output: "upload",
    //             storeName: "upload",
    //         })
    //     );
    // }, [values]);

    useEffect(() => {
        if (type === "success") {
            // dispatch(
            //     callApi({
            //         operationId: UrlBuilder.ntrcaApi(
            //             `certified-applicant/upload-progress`
            //         ),
            //         output: "upload",
            //         storeName: "upload",
            //     })
            // );
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant/details/${parentId}/${examRefId}`
                    ),
                    output: "details",
                    storeName: "certifiedApplicant",
                })
            );
        }
    });

    var uploadStatus = upload?.data?.fileUploadProcessedStatus ?? "";

    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [sec, setSec] = useState(0);

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
                        <label>
                            আপলোড ফাইল <span className="text-danger">*</span>
                        </label>
                        <span className="text-primary">
                            {" "}
                            Allowed format xlxs, xls and max file size 10mb
                        </span>

                        <div className="display-block-ruby">
                            <input
                                required
                                name="educationQualification"
                                type="file"
                                className={`form-control mt-5 ${
                                    errors.educationQualification
                                        ? "is-invalid"
                                        : ""
                                }`}
                                onChange={(event) => {
                                    setFieldValue(
                                        "educationQualification",
                                        event.currentTarget?.files[0]
                                    );
                                }}
                            />
                            <a
                                href="/demo/ApplicantWithEducationalQualification.xlsx"
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
                        <ErrorMessage fieldName="file" />
                    </Col>
                </Row>

                {/* {uploadStatus == "IN_PROGRESS" && (
                    <>
                        <Row className="action-col">
                            <Col md={4} className="mb-10 mt-10">
                                <h5 className="text-center">
                                    <b>ফাইল আপলোড এর সময়কাল </b>
                                </h5>
                                <div class="p-4 d-flex justify-content-center">
                                    <div
                                        class="countdown countdown-horizontal"
                                        id="countdown"
                                    >
                                        <div class="countdown-unit countdown-days countdown-unit-vertical ">
                                            <div class="badge ">{day}</div>
                                            <label
                                                name="label-days"
                                                class="text-light bg-dark"
                                            >
                                                দিন
                                            </label>
                                        </div>
                                        <div class="countdown-unit countdown-hours countdown-unit-vertical ">
                                            <div class="badge  "> {hour}</div>
                                            <label
                                                name="label-hours"
                                                class="text-light bg-dark"
                                            >
                                                ঘন্টা
                                            </label>
                                        </div>
                                        <div class="countdown-unit countdown-mins countdown-unit-vertical ">
                                            <div class="badge  "> {minute}</div>
                                            <label
                                                name="label-mins"
                                                class="text-light bg-dark"
                                            >
                                                মিনিট
                                            </label>
                                        </div>
                                        <div class="countdown-unit countdown-seconds countdown-unit-vertical ">
                                            <div class="badge  "> {sec}</div>
                                            <label
                                                name="label-seconds"
                                                class="text-light bg-dark"
                                            >
                                                সেকেন্ড
                                            </label>
                                        </div>
                                    </div>
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
                )} */}
                <Row className="action-col">
                    <Col md={4} className="mb-10 mt-10">
                        <Button
                            variant=""
                            className="f-right btn-color btn-primary"
                            type="submit"
                            // disabled={
                            //     uploadStatus == "IN_PROGRESS" ? true : false
                            // }
                        >
                            <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                            সাবমিট করুন
                        </Button>
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="reset"
                            // disabled={
                            //     uploadStatus == "IN_PROGRESS" ? true : false
                            // }
                        >
                            <FontAwesomeIcon icon={faUndo} className="me-2" />{" "}
                            রিসেট
                        </Button>
                        <Link to="/portal/dashboard">
                            <Button
                                variant="white"
                                className="f-right mr-10"
                                type="cancel"
                                // disabled={
                                //     uploadStatus == "IN_PROGRESS" ? true : false
                                // }
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

export default CertifiedApplicantsUploadFileForm;
