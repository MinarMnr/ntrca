import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Modal } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../components/button/CrudAction";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import {
    callApi,
    callApiWithoutLoading,
    selectApi,
} from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { SharedData } from "helpers/SharedData";
import swal from "sweetalert";
import moment from "moment";
import GlobalProgressBar from "helpers/GlobalProgressBar";

const MeritListGenarate = ({ values }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        progressDetails = {
            data: {},
        },
    } = useSelector(selectApi);

    /**
     * Put page and size into state
     */

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortColumn: "",
    });

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        if (progressDetails?.data?.meritGenerationProcessedPercentage == 100) {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant-combined-merit-process/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "meritList",
                })
            );
        }
    };
    const handleShow = (data) => {};

    /**
     * Get updated 'type' value from toast alert's state.
     */
    const { type } = useSelector(selectToastAlert);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */

    const cardProps = {
        title: "সম্মিলিত মেধা তালিকা তৈরি করুন",
        headerSlot: () => (
            <Link to="#">
                {/* <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Apply for
                    Job
                </Button> */}
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            // { id: "batch", label: "ব্যাচ" },
            // { id: "year", label: "বছর" },
            {
                id: "সর্বশেষ তালিকা তৈরির সময়",
                label: "সর্বশেষ তালিকা তৈরির সময়",
            },
            {
                id: "তালিকা প্রক্রিয়াকরণ অগ্রগতি",
                label: "তালিকা প্রক্রিয়াকরণ অগ্রগতি (%)",
            },

            { id: "বর্তমান অবস্থা", label: "বর্তমান অবস্থা" },
            { id: "total", label: "মোট নিবন্ধিত শিক্ষক" },
            { id: "বর্তমান অবস্থা", label: "প্রক্রিয়াকৃত নিবন্ধিত শিক্ষক" },
            { id: "বর্তমান অবস্থা", label: "প্রক্রিয়াহীন নিবন্ধিত শিক্ষক" },
            // { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `certified-applicant-combined-merit-process/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "meritList",
        },
        meta: {},
    };

    /**
     * useListApi: get data for displaying on the table
     */
    const { loading, data, meta } = useListApi(tableProps.config);
    /**
     * Update tableProps's meta from api response
     */
    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    /**
     * Change the page on table and update the state.
     * Fetch data by dispatching callApi.
     */
    const onPageChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            page: value,
        });
    };

    const onSizeChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            size: value,
        });
    };

    const onSearchChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            search: value,
        });
    };

    const onSearchByValue = (value) => {
        setCommonSearch({
            ...commonSearch,
            sortColumn: value,
        });
    };

    /**
     * Refresh the table data after performing delete operation.
     * Fetch data by dispatching callApi.
     */
    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant-combined-merit-process/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "meritList",
                })
            );
        }
    });

    useEffect(() => {
        if (progressDetails?.data?.meritGenerationProcessedPercentage == 100) {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant-combined-merit-process/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "meritList",
                })
            );
        }
    }, [progressDetails?.data?.meritGenerationProcessedPercentage]);

    // useEffect(() => {
    //     setInterval(() => {
    //         dispatch(
    //             callApiWithoutLoading({
    //                 operationId: UrlBuilder.ntrcaApi(
    //                     `certified-applicant-combined-merit-process/list?${new URLSearchParams(
    //                         SharedData.cleanObject(commonSearch)
    //                     )}`
    //                 ),
    //                 output: "meritList",
    //             })
    //         );
    //     }, 5000);
    // });

    const generateResult = (id) => {
        swal({
            title: "Do you want to generate merit list?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            willDelete &&
                dispatch(
                    callApi({
                        operationId: UrlBuilder.ntrcaApi(
                            `certified-applicant-combined-merit-process/generate`
                        ),
                        output: "generateResult",
                        parameters: {
                            method: "POST",
                        },
                    })
                );
        });
    };

    const updateStatus = (id, status) => {
        swal({
            title: `Do you want to update status to ${status}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            willDelete &&
                dispatch(
                    callApi({
                        operationId: UrlBuilder.ntrcaApi(
                            `certified-applicant-combined-merit-process/update-merit-generation-process-status`
                        ),
                        output: "details",
                        parameters: {
                            method: "PUT",
                            body: JSON.stringify({
                                combinedMeritProcessId: id,
                                meritGenerationProcessStatus: status,
                            }),
                            header: {
                                "Content-Type": "application/json",
                            },
                        },
                    })
                );
        });
    };
    const generateDetails = (id) => {
        setShow(false);
        dispatch(
            callApiWithoutLoading({
                operationId: UrlBuilder.ntrcaApi(
                    `certified-applicant-combined-merit-process/details/${id}`
                ),
                output: "progressDetails",
            })
        );
        if (progressDetails?.data) {
            setShow(true);
        }
    };

    return (
        <>
            {loading && <ProgressBar />}
            <Modal
                show={show}
                onHide={handleClose}
                size="sm"
                style={{
                    maxWidth: "500px",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Modal.Header closeButton style={{ textAlign: "center" }}>
                    <Modal.Title>
                        তালিকা প্রক্রিয়াকরণ অগ্রগতির বিস্তারিত
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="col-6">
                                <b>প্রক্রিয়া শুরুর সময় : </b>
                                {}
                                {progressDetails?.data
                                    ?.meritGenerationProcessedAt &&
                                    moment(
                                        progressDetails?.data
                                            ?.meritGenerationProcessedAt
                                    ).format("DD-MM-YYYY h:mm:ss a")}
                            </div> */}
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <b>পার্সেন্টেজ </b>
                        <GlobalProgressBar
                            completed={
                                progressDetails?.data
                                    ?.meritGenerationProcessedPercentage
                            }
                            bgcolor={"#3E7AEB"}
                        />
                        {/* {
                                    progressDetails?.data
                                        ?.meritGenerationProcessedPercentage
                                } */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <DefaultCard {...cardProps} className="mb-50">
                <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={() => generateResult()}>
                        Generate Result
                    </Button>
                </div>

                <BasicTable
                    {...tableProps}
                    onSizeChange={(pageSize) => onSizeChange(pageSize)}
                    onSearchChange={(query) => onSearchChange(query)}
                    onPageChange={(pageNo) => onPageChange(pageNo)}
                    onSearchByValue={(sval) => onSearchByValue(sval)}
                >
                    {data !== undefined &&
                        data?.length > 0 &&
                        data.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                {/* <td>
                                <span className="text-center">
                                    {row?.examBatch}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.examYear}
                                </span>
                            </td> */}
                                <td>
                                    <span className="text-center">
                                        {row?.meritGenerationProcessedAt &&
                                            moment(
                                                row?.meritGenerationProcessedAt
                                            ).format("DD-MM-YYYY h:mm:ss a")}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {/* {
                                            row?.meritGenerationProcessedPercentage
                                        } */}
                                        {row?.meritGenerationProcessStatus ==
                                        "IN_PROGRESS" ? (
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    generateDetails(row?.id)
                                                }
                                            >
                                                প্রক্রিয়াকরণ অগ্রগতির বিস্তারিত
                                            </Button>
                                        ) : (
                                            row?.meritGenerationProcessedPercentage
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.meritGenerationProcessStatus}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.totalApplicantExams}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.totalApplicantExamsProcessed}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.totalApplicantExamsNotProcessed}
                                    </span>
                                </td>

                                {/* <td>
                                {(row?.meritGenerationProcessStatus ==
                                    "INCOMPLETE" ||
                                    row?.meritGenerationProcessStatus ==
                                        "PROCESS_DONE" ||
                                    row?.meritGenerationProcessStatus ==
                                        "NOT_STARTED") && (
                                    <Button
                                        variant="primary mr-10"
                                        onClick={() => generateResult(row?.id)}
                                    >
                                        Generate Result
                                    </Button>
                                )}
                                {(row?.meritGenerationProcessStatus ==
                                    "COMPLETED" ||
                                    row?.meritGenerationProcessStatus ==
                                        "INCOMPLETE" ||
                                    row?.meritGenerationProcessStatus ==
                                        "PROCESS_DONE" ||
                                    row?.meritGenerationProcessStatus !=
                                        "IN_PROGRESS") && (
                                    <Button
                                        variant={
                                            row?.meritGenerationProcessStatus !=
                                            "COMPLETED"
                                                ? "warning"
                                                : "success"
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                row?.id,
                                                row?.meritGenerationProcessStatus !=
                                                    "COMPLETED"
                                                    ? "COMPLETED"
                                                    : "INCOMPLETE"
                                            )
                                        }
                                    >
                                        {row?.meritGenerationProcessStatus !=
                                        "COMPLETED"
                                            ? "COMPLETED"
                                            : "INCOMPLETE"}
                                    </Button>
                                )}
                            </td> */}
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default MeritListGenarate;
