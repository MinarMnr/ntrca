import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Card } from "@themesberg/react-bootstrap";
import { Formik, Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UrlBuilder } from "helpers/UrlBuilder";
import InputDatePicker from "components/form/InputDatePicker";
import InputFieldNumber from "components/form/InputFieldNumber";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "reducers/apiSlice";
import DynamicInputField from "components/form/DynamicInputField";
import { AuthUser } from "helpers/AuthUser";
import Cookies from "js-cookie";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

const JobApplyForm = ({
    values,
    formType,
    setFieldValue,
    errors,
    ...props
}) => {
    const dispatch = useDispatch();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        employeeCount = {
            data: {},
        },
        postAllocation = {
            data: {},
        },
        vacantSeat = {
            data: {},
        },
        tableData = {
            data: {},
        },
    } = useSelector(selectApi);

    const [fileSource, setFileSource] = useState(
        formType === "edit" ? "text" : "file"
    );

    const totalMPOEmployee = employeeCount?.data?.totalMPOEmployee;
    const totalFemaleEmployee = employeeCount?.data?.totalFemaleEmployee;
    const totalMaleEmployee = employeeCount?.data?.totalMaleEmployee;
    const totalAllotted = employeeCount?.data?.totalAllottedPost;

    const [hasFile, sethasFile] = useState(true);

    useEffect(() => {
        if (values?.encloserUrl) {
            sethasFile(true);
        } else {
            sethasFile(false);
        }
    }, [values]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.mpoDsheApi(
                    `institute-wise-post-allocation/subject-designation-list?instituteId=${AuthUser.getInstituteId()}`
                ),
                output: "tableData",
                storeName: "tableData",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.mpoDsheApi(
                    `institute-wise-post-allocation/employee-count?instituteId=${AuthUser.getInstituteId()}`
                ),
                output: "employeeCount",
                storeName: "employeeCount",
            })
        );
    }, [dispatch]);
    const postType = [
        {
            id: "MPO",
            name: "MPO",
        },
        {
            id: "NON_MPO",
            name: "NON_MPO",
        },
    ];

    useEffect(() => {
        if (props?.circularId) {
            // console.log("Circular ID value:", props.circularId);

            const circularIdAsNumber = props.circularId;

            if (!isNaN(circularIdAsNumber) && isFinite(circularIdAsNumber)) {
                setFieldValue("jobRequisitionCircularId", circularIdAsNumber);
            } else {
                console.warn(
                    "Circular ID is not a valid number:",
                    props.circularId
                );
                // Handle the case where circularId is not a valid number
            }
        }
    }, [props?.circularId]);

    let headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
        "Content-Type": "application/json",
    };

    const setVacantSeat = async (index, designationId) => {
        try {
            const subjectId =
                values?.instituteJobRequisitionDetailList?.[index]?.subjectId;

            if (subjectId && designationId) {
                const response = await fetch(
                    UrlBuilder.mpoDsheApi(
                        `institute-wise-post-allocation/subject-designation-wise-employee-count?designationId=${designationId}&instituteId=${AuthUser.getInstituteId()}&subjectId=${subjectId}`
                    ),
                    {
                        method: "GET",
                        headers,
                    }
                );

                if (response.status === 200) {
                    const data = await response.json();
                    const vacantPost = data?.data?.vacantPost;
                    setFieldValue(
                        `instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`,
                        vacantPost
                    );
                } else {
                }
            } else {
            }
        } catch (error) {}
    };

    function hasDuplicates(array) {
        // if (!Array.isArray(array)) {
        //     throw new Error("Input is not an array");
        // }

        const seen = new Set();

        for (const item of array) {
            const key = `${item.levelId}-${item.subjectId}-${item.designationId}`;

            if (seen.has(key)) {
                return true; // Duplicate found
            }

            seen.add(key);
        }

        return false; // No duplicates found
    }

    // Example usage
    const instituteJobRequisitionDetailList =
        values?.instituteJobRequisitionDetailList;

    const result = hasDuplicates(instituteJobRequisitionDetailList || []);

    const [message, setMessage] = useState("");
    useEffect(() => {
        if (result) {
            setMessage(
                "Institute-Type, Subject, Designation should not be identical in different rows."
            );
            // Handle duplicate values, maybe return an error message
        } else {
            setMessage("");
            // Continue with your logic
        }
    }, [result]);

    return (
        <Form>
            <div className="row">
                <div class="contentBox-modified">
                    <div class="section-header-custom">
                        <h5 class="m-10 text-white">ই-রিকুইজিশন বিস্তারিত</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>
                    <div className="contentBoxBody">
                        <div className="row">
                            <Col md={3} className="mb-10">
                                <DynamicInputField
                                    label="সরকার কর্তৃক মোট অনুমোদিত পদের সংখ্যা"
                                    name="approvedPost"
                                    type="number"
                                    defaultValue={totalAllotted}
                                    disabled
                                />
                                <ErrorMessage fieldName="approvedPost" />
                            </Col>
                            <Col md={3} className="mb-10">
                                <DynamicInputField
                                    label="কর্মরত এমপিও পুরুষ শিক্ষকের সংখ্যা"
                                    name="noOfmale"
                                    type="number"
                                    defaultValue={totalMaleEmployee}
                                    disabled
                                />
                                <ErrorMessage fieldName="noOfmale" />
                            </Col>
                            <Col md={3} className="mb-10">
                                <DynamicInputField
                                    label="কর্মরত এমপিও মহিলা শিক্ষকের সংখ্যা"
                                    name="noOfFemale"
                                    type="number"
                                    defaultValue={totalFemaleEmployee}
                                    disabled
                                />
                                <ErrorMessage fieldName="noOfFemale" />
                            </Col>
                            <Col md={3} className="mb-10">
                                <DynamicInputField
                                    label="মোট এমপিও শূন্য পদের সংখ্যা"
                                    name="noVcantPosts"
                                    type="number"
                                    defaultValue={
                                        totalAllotted - totalMPOEmployee
                                    }
                                    disabled
                                />
                                <ErrorMessage fieldName="noVcantPosts" />
                            </Col>

                            <Col md={4} className="mb-10">
                                <InputField
                                    label="GB/SMC/MMC স্মারক নং"
                                    name="memorandumNo"
                                    type="text"
                                    placeholder="GB/SMC/MMC স্মারক নং"
                                    required={true}
                                />
                                <ErrorMessage fieldName="memorandumNo" />
                            </Col>

                            <Col md={4} className="mb-10">
                                <label>
                                    মিটিং তারিখ
                                    <abbr
                                        style={{ color: "red" }}
                                        className="mt-10"
                                    >
                                        *
                                    </abbr>
                                </label>

                                <InputDatePicker
                                    className="mt-10"
                                    name="dateOfRequisition"
                                    setField={setFieldValue}
                                    dataValue={values?.dateOfRequisition}
                                />
                            </Col>

                            <Col md={4} className="mb-10">
                                <label>
                                    কার্য বিবরণী{" "}
                                    <span className="text-danger">*</span>
                                </label>
                                {formType === "edit" &&
                                    values &&
                                    values.encloserUrl && (
                                        <a
                                            href={UrlBuilder.fileServerApi(
                                                `${
                                                    values && values.encloserUrl
                                                }`
                                            )}
                                            target="_blank"
                                            style={{ color: "green" }}
                                        >
                                            <b>VIEW PDF</b>
                                        </a>
                                    )}

                                <span className="text-primary">
                                    {" "}
                                    only-pdf-format(10mb)
                                </span>
                                <input
                                    label="রেজোলিউশন ফাইল"
                                    required={
                                        values?.encloserUrl ? false : true
                                    }
                                    name="file"
                                    type={fileSource}
                                    className="form-control mt-5"
                                    defaultValue={
                                        hasFile
                                            ? values && values?.encloserUrl
                                            : "Click here to upload file"
                                    }
                                    onChange={(event) => {
                                        setFieldValue(
                                            "file",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                    onClick={() => {
                                        setFileSource("file");
                                    }}
                                />

                                {errors.file && (
                                    <div id="feedback" className="text-danger">
                                        {errors.file}
                                    </div>
                                )}
                            </Col>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="contentBox-modified">
                    <div className="section-header-custom">
                        <h5 className="m-10 text-white">
                            বিষয়ভিত্তিক পদের তালিকা
                        </h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="contentBoxBody">
                        <table className="table table-responsive table-striped text-center">
                            <thead>
                                <tr className="custom-table-header text-center">
                                    <th>পদবি</th>
                                    <th>বিষয়</th>
                                    <th>NTRCA পদবি কোড</th>
                                    <th>মোট শূন্য পদবি </th>
                                </tr>
                            </thead>

                            <tbody>
                                {tableData?.data !== undefined &&
                                    tableData?.data.length > 0 &&
                                    tableData?.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {item.designationNameBn ===
                                                    "নির্বাচন করুন " ||
                                                item.designationNameBn ===
                                                    "অন্যান্য"
                                                    ? "N/A"
                                                    : item.designationNameBn ??
                                                      "N/A"}
                                            </td>
                                            <td>
                                                {item.subjectNameBn ===
                                                    "নির্বাচন করুন " ||
                                                item.subjectNameBn ===
                                                    "অন্যান্য"
                                                    ? "N/A"
                                                    : item.subjectNameBn ??
                                                      "N/A"}
                                            </td>
                                            <td>
                                                {item.ntrcaDesignationCode ??
                                                    "N/A"}
                                            </td>
                                            <td>{item.totalPost ?? "N/A"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row">
                <div class="contentBox-modified">
                    <div class="section-header-custom">
                        <h5 class="m-10 text-white">শূন্য পদে আবেদন</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="contentBoxBody">
                        <FieldArray
                            name="instituteJobRequisitionDetailList"
                            render={(arrayHelpers) => (
                                <>
                                    <div className="contentBoxBody">
                                        <table className="table table-responsive table-striped text-center">
                                            <thead>
                                                <tr className="custom-table-header text-center">
                                                    <th>#</th>
                                                    <th>প্রতিষ্ঠানের ধরন</th>
                                                    <th>প্রতিষ্ঠানের স্তর</th>
                                                    <th>বিষয়</th>
                                                    <th>পদবি</th>
                                                    <th>প্রার্থীর ধরন</th>
                                                    <th>পদের ধরন</th>
                                                    <th>পদের অবস্থা</th>
                                                    <th>শূন্য পদের সংখ্যা</th>
                                                    <th>আবেদিত পদের সংখ্যা</th>
                                                    <th>অ্যাকশন</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {values?.instituteJobRequisitionDetailList?.map(
                                                    (item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <InputSelectApi
                                                                        required={
                                                                            true
                                                                        }
                                                                        name={`instituteJobRequisitionDetailList[${index}].levelId`}
                                                                        type="number"
                                                                        value="id"
                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                            "level/all"
                                                                        )}
                                                                        storeName="subject"
                                                                        text="levelNameBn"
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].levelId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].designationId`,
                                                                                ""
                                                                            );
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].educationLevelId`,
                                                                                ""
                                                                            );
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].subjectId`,
                                                                                ""
                                                                            );

                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`,
                                                                                ""
                                                                            );
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelectApi
                                                                        required={
                                                                            true
                                                                        }
                                                                        name={`instituteJobRequisitionDetailList[${index}].educationLevelId`}
                                                                        type="number"
                                                                        value="id"
                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                            "education-level/all"
                                                                        )}
                                                                        storeName="educationLevel"
                                                                        text="educationLevelNameBn"
                                                                        // onChange={(
                                                                        //     e
                                                                        // ) => {
                                                                        //     setFieldValue(
                                                                        //         `instituteJobRequisitionDetailList[${index}].   educationLevelId`,
                                                                        //         e
                                                                        //             .target
                                                                        //             .value
                                                                        //     );
                                                                        // }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelectApi
                                                                        name={`instituteJobRequisitionDetailList[${index}].subjectId`}
                                                                        operationId={
                                                                            values
                                                                                ?.instituteJobRequisitionDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.levelId
                                                                                ? UrlBuilder.ntrcaApi(
                                                                                      `subject/all?levelId=${values?.instituteJobRequisitionDetailList[index].levelId}`
                                                                                  )
                                                                                : null
                                                                        }
                                                                        storeName="subjectName"
                                                                        value="id"
                                                                        text="subjectNameBn"
                                                                        required={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].subjectId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );

                                                                            // Reset other related values
                                                                            setVacantSeat(
                                                                                index,

                                                                                values
                                                                                    ?.instituteJobRequisitionDetailList?.[
                                                                                    index
                                                                                ]
                                                                                    ?.designationId
                                                                            );

                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`,
                                                                                ""
                                                                            );
                                                                        }}
                                                                        otherText="subjectCode"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelectApi
                                                                        name={`instituteJobRequisitionDetailList[${index}].designationId`}
                                                                        operationId={
                                                                            values
                                                                                ?.instituteJobRequisitionDetailList?.[
                                                                                index
                                                                            ]
                                                                                ?.levelId
                                                                                ? UrlBuilder.ntrcaApi(
                                                                                      `designation/all?isForNTRCA=true&levelId=${values?.instituteJobRequisitionDetailList?.[index]?.levelId}`
                                                                                  )
                                                                                : null
                                                                        }
                                                                        storeName="designation"
                                                                        value="id"
                                                                        text="designationNameBn"
                                                                        required={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].designationId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );

                                                                            setVacantSeat(
                                                                                index,

                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );

                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`,
                                                                                ""
                                                                            );
                                                                        }}
                                                                        otherText="designationCode"
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <InputSelectApi
                                                                        name={`instituteJobRequisitionDetailList[${index}].quotaId`}
                                                                        operationId={UrlBuilder.ntrcaApi(
                                                                            "quota/all"
                                                                        )}
                                                                        storeName="quota"
                                                                        value="id"
                                                                        text="quotaNameBn"
                                                                        required={
                                                                            true
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `instituteJobRequisitionDetailList[${index}].quotaId`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <InputSelect
                                                                        name={`instituteJobRequisitionDetailList.${index}.jobType`}
                                                                        type="text"
                                                                        value="id"
                                                                        data={
                                                                            postType
                                                                        }
                                                                        text="name"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <InputSelect
                                                                        name={`instituteJobRequisitionDetailList.${index}.designationStatus`}
                                                                        type="text"
                                                                        value="id"
                                                                        data={[
                                                                            {
                                                                                id: "REGULAR",
                                                                                name: "REGULAR",
                                                                            },
                                                                            {
                                                                                id: "SECTIONAL",
                                                                                name: "SECTIONAL",
                                                                            },
                                                                        ]}
                                                                        text="name"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <InputFieldNumber
                                                                        name={`instituteJobRequisitionDetailList[${index}].numberOfVacantSeat`}
                                                                        type="text"
                                                                        disabled={
                                                                            true
                                                                        }
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <InputFieldNumber
                                                                        name={`instituteJobRequisitionDetailList[${index}].numberOfRequestedSeat`}
                                                                        type="number"
                                                                        value={`instituteJobRequisitionDetailList[${index}].numberOfRequestedSeat`}
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            width: "100%",
                                                                            justifyContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {index +
                                                                            1 ===
                                                                            values
                                                                                ?.instituteJobRequisitionDetailList
                                                                                ?.length && (
                                                                            <span
                                                                                variant="success"
                                                                                className="me-1 i-size"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    arrayHelpers.push(
                                                                                        {
                                                                                            levelId:
                                                                                                "",
                                                                                            educationLevelId:
                                                                                                "",
                                                                                            designationId:
                                                                                                "",
                                                                                            subjectId:
                                                                                                "",
                                                                                            quotaId:
                                                                                                "",
                                                                                            jobType:
                                                                                                "",
                                                                                            designationStatus:
                                                                                                "",
                                                                                            numberOfVacantSeat:
                                                                                                "",
                                                                                            numberOfRequestedSeat:
                                                                                                "",
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <>
                                                                                    <Button variant="success">
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faPlusSquare
                                                                                            }
                                                                                            className="text-white pr-2"
                                                                                            title="Add New Row"
                                                                                        />
                                                                                    </Button>
                                                                                </>
                                                                            </span>
                                                                        )}
                                                                        {values
                                                                            ?.instituteJobRequisitionDetailList
                                                                            ?.length >
                                                                            1 && (
                                                                            <span
                                                                                variant="success"
                                                                                className="i-size"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    swal(
                                                                                        {
                                                                                            title: "Are you sure you want to delete?",
                                                                                            icon: "warning",
                                                                                            buttons: true,
                                                                                            dangerMode: true,
                                                                                        }
                                                                                    ).then(
                                                                                        (
                                                                                            willDelete
                                                                                        ) => {
                                                                                            willDelete &&
                                                                                                arrayHelpers.remove(
                                                                                                    index
                                                                                                );
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <>
                                                                                    <Button variant="danger">
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faTrashAlt
                                                                                            }
                                                                                            className="text-white pr-2"
                                                                                            title="Delete Row"
                                                                                        />
                                                                                    </Button>
                                                                                </>
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                        {message !== "" && (
                                            <div className="text-danger font-weight-bolder">
                                                {message}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
            <Col md={12} className="mb-10 mt-10">
                <Button
                    variant=""
                    className="f-right btn-color btn-primary"
                    type="submit"
                    disabled={message !== ""}
                >
                    <FontAwesomeIcon icon={faSave} className="me-2" /> সাবমিট
                    করুন
                </Button>
                <Button variant="white" className="f-right mr-10" type="reset">
                    <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                </Button>
                <Link to="/portal/job-requisition-list">
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
        </Form>
    );
};

export default JobApplyForm;
