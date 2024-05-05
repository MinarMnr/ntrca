import React from "react";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
    faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import { InputField, InputSelect } from "../../../../components/form";

import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { AuthUser } from "helpers/AuthUser";
import { UrlBuilder } from "helpers/UrlBuilder";
import { useDispatch, useSelector } from "react-redux";
import { callApi, clearState, selectApi, setState } from "reducers/apiSlice";
import { useEffect } from "react";
import { useState } from "react";
import InputDatePicker from "components/form/InputDatePicker";
import InputSelectMultiLabelApi from "components/form/InputSelectMultiLabelApi";

const ApplicationAttachmentForm = ({
    values,
    setFieldValue,
    circularId,
    ...props
}) => {
    /**
     * useDispatch: dispatch actions
     */

    const dispatch = useDispatch();
    var nid = AuthUser.getUserName();

    const [imgState, setImgState] = useState({
        path: "",
    });

    const [signState, setSignState] = useState({
        path: "",
    });

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
        examList = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Get data through api call by dispatching 'callApi'.
     */

    // useEffect(() => {
    //     dispatch(
    //         callApi({
    //             operationId: UrlBuilder.ntrcaApi(
    //                 `job-application/exam/all/${nid}`
    //             ),
    //             storeName: "examList",
    //             output: "examList",
    //         })
    //     );
    //     dispatch(
    //         callApi({
    //             operationId: UrlBuilder.ntrcaApi(
    //                 `job-application/step-one-details/${nid}/${circularId}`
    //             ),
    //             output: "details",
    //             storeName: "apply",
    //         })
    //     );
    // }, []);

    // useEffect(() => {

    //     !values?.examBatchId &&
    //         dispatch(
    //             clearState({
    //                 output: "details",
    //             })
    //         );

    //     dispatch(
    //         callApi({
    //             operationId: UrlBuilder.ntrcaApi(
    //                 `job-application/exam/all/${nid}`
    //             ),
    //             storeName: "examList",
    //             output: "examList",
    //         })
    //     );

    //     dispatch(
    //         callApi({
    //             operationId:
    //                 nid && values?.examBatchId
    //                     ? UrlBuilder.ntrcaApi(
    //                           `job-application/info/${nid}/${values?.examBatchId}`
    //                       )
    //                     : null,
    //             output: "details",
    //             storeName: "apply",
    //         })
    //     );
    // }, [dispatch, nid, values?.examBatchId]);

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

    const handleSignChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setSignState({
                ...signState,
                path: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setSignState({
                ...signState,
                path: "",
            });
        }
    };

    return (
        <Form>
            <div className="contentBoxBody mt-20"></div>
            <div className="contentBox-modified">
                <div className="contentBoxBody mt-20"></div>
                <Row>
                    <Col lg={4} md={12} className="mb-30">
                        <label className="form-label">
                            আবেদনকারীর ছবি
                            <abbr style={{ color: "red" }} className="req">
                                *
                            </abbr>
                            <span className="text-primary">
                                Allowed format jpg, jpeg, png and max file size
                                300 kb
                            </span>
                        </label>
                        <input
                            name="photo"
                            className={`form-control ${
                                props.touched.photo && props.errors.photo
                                    ? "is-invalid"
                                    : ""
                            }`}
                            type="file"
                            onInput={(event) => {
                                if (
                                    event.currentTarget.files[0] !== undefined
                                ) {
                                    setFieldValue(
                                        "photo",
                                        event?.currentTarget?.files[0]
                                    );
                                } else {
                                    setFieldValue("photo", "");
                                }

                                handlePhotoChange(event);
                            }}
                        />
                        {props.errors.photo && (
                            <div id="feedback" className="invalid-feedback">
                                {props.errors.photo}
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
                                        `${values?.previousPhoto}`
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
                            আবেদনকারীর স্বাক্ষর
                            <abbr style={{ color: "red" }} className="req">
                                *
                            </abbr>
                            <span className="text-primary">
                                Allowed format jpg, jpeg, png and max file size
                                180 kb
                            </span>
                        </label>
                        <input
                            name="eSign"
                            className={`form-control ${
                                props.touched.eSign && props.errors.eSign
                                    ? "is-invalid"
                                    : ""
                            }`}
                            type="file"
                            onInput={(event) => {
                                if (
                                    event.currentTarget.files[0] !== undefined
                                ) {
                                    setFieldValue(
                                        "eSign",
                                        event?.currentTarget?.files[0]
                                    );
                                } else {
                                    setFieldValue("eSign", "");
                                }

                                handleSignChange(event);
                            }}
                        />
                        {props.errors.eSign && (
                            <div id="feedback" className="invalid-feedback">
                                {props.errors.eSign}
                            </div>
                        )}
                    </Col>

                    <Col md={2} className="mb-20">
                        {signState?.path ? (
                            <div className="donor-image">
                                <img
                                    className="img-fluid rounded-circle "
                                    src={signState?.path}
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
                                        `${values?.previousESign}`
                                    )}
                                    id="preview-image"
                                    alt="No Image Available"
                                    style={{ height: "90px", width: "80px" }}
                                />
                            </div>
                        )}
                    </Col>
                    {/* <Col md={2} className="mb-20">
                        {values?.previousESign && (
                            <div className="donor-image">
                                <img
                                    className="img-fluid rounded-circle "
                                    src={UrlBuilder.fileServerApi(
                                        `${values?.previousESign}`
                                    )}
                                    id="preview-image"
                                    alt=""
                                    style={{ height: "90px", width: "80px" }}
                                />
                            </div>
                        )}
                    </Col> */}
                </Row>
            </div>

            <Col md={12} className="mb-10 mt-10">
                <Link
                    to={`/portal/ntrca-application/institute/add/${circularId}`}
                >
                    <Button variant="" className="btn-warning">
                        <FontAwesomeIcon icon={faBackward} className="me-2" />{" "}
                        পূর্ববর্তী
                    </Button>
                </Link>
                <Button
                    variant=""
                    className="f-right btn-primary"
                    type="submit"
                >
                    <FontAwesomeIcon icon={faSave} className="me-2" /> পরবর্তী
                </Button>
                {/* <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                    <Link to="/portal/choice/list">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            Cancel
                        </Button>
                    </Link> */}
            </Col>
        </Form>
    );
};

export default ApplicationAttachmentForm;
