import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../components/button/CrudAction";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi, clearState, selectApi } from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
import swal from "sweetalert";
import { useEffect } from "react";

const ResultGenerate = () => {
    /**
     * useHistory: navigation helper
     */
    const history = useHistory();
    const { resGenerate = {} } = useSelector(selectApi);
    const { type } = useSelector(selectToastAlert);

    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Put page and size into state
     */

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortBy: "",
    });

    const cardProps = {
        title: "প্রার্থী নির্বাচন করুন",
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
            { id: "circularTitle", label: "গণ বিজ্ঞপ্তির নাম" },
            { id: "publishedDate", label: "প্রকাশের তারিখ" },
            { id: "effectiveDate", label: "কার্যকর তারিখ" },
            { id: "expireDate", label: "মেয়াদ উত্তীর্ণের তারিখ" },

            { id: "instituteType", label: "নির্বাচন ক্রম নম্বর" },
            { id: "isPublish", label: "ফলাফল প্রকাশ" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-selection-process/job-application-circular/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "ResultGenerate",
            storeName: "ResultGenerate",
        },
        meta: {},
        totalData: 0,
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

    const resultGenerate = (
        circularId,
        jobApplicationCircularType = "JOB_APPLICATION_CIRCULAR"
    ) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-selection-process/generate?circularId=${circularId}&jobApplicationCircularType=${jobApplicationCircularType}`
                ),
                output: "resGenerate",
                parameters: {
                    method: "POST",
                },
            })
        );
    };

    const resultPublish = (id) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-circular/publish/${id}`
                ),
                output: "ResultGenerate",
                parameters: {
                    method: "PUT",
                },
            })
        );
    };

    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `job-application-selection-process/job-application-circular/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "ResultGenerate",
                })
            );
        }
    });

    useEffect(() => {
        if (resGenerate?.status === "success") {
            dispatch(
                clearState({
                    output: "resGenerate",
                })
            );
            //setTimeout(() => {
            history.push(`/portal/selection-process-applicant-list`);
            //}, 2000);
        }
    });

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                {/* <div class="row">
                    <div class="col-md-12">
                        <h3 class=" text-center">
                            Selected Candidates Result List in Institutes{" "}
                            <p size="4">(3rd Cycle: 2nd Phase)</p>
                        </h3>
                    </div>
                </div> */}
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
                                <td>
                                    <span className="text-center">
                                        {row.circularTitle}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row.circularPublishDate).format(
                                            "DD-MM-YYYY h:mm:ss a"
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(
                                            row.circularEffectiveDate
                                        ).format("DD-MM-YYYY h:mm:ss a")}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row.circularExpiryDate).format(
                                            "DD-MM-YYYY h:mm:ss a"
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.circularOrder}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.isPublished == true ? (
                                            <span className="btn btn-sm btn-success">
                                                প্রকাশিত
                                            </span>
                                        ) : (
                                            <span className="btn btn-sm btn-danger">
                                                অপ্রকাশিত
                                            </span>
                                        )}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.processStatus ==
                                            "IN_PROGRESS" && (
                                            <b>
                                                ফলাফল তৈরির প্রক্রিয়া চলমান{" "}
                                                <br />
                                            </b>
                                        )}
                                        {row?.isExpired == 1 &&
                                            row?.processStatus ==
                                                "PROCESS_DONE" && (
                                                // <Link to="/portal/generated-result">
                                                <Button
                                                    variant="danger"
                                                    className="m-2"
                                                    onClick={() => {
                                                        swal({
                                                            title: "আপনি কি ফলাফল প্রকাশ করতে চান?",
                                                            icon: "warning",
                                                            //buttons: false,
                                                            //dangerMode: false,
                                                        }).then((willDo) => {
                                                            willDo &&
                                                                resultPublish(
                                                                    row?.id
                                                                );
                                                        });
                                                    }}
                                                >
                                                    Publish Result
                                                </Button>
                                                // </Link>
                                            )}
                                        {row?.isExpired == 1 &&
                                            row?.processStatus !=
                                                "IN_PROGRESS" && (
                                                // <Link to="/portal/generated-result">
                                                <Button
                                                    variant="success"
                                                    className="m-2"
                                                    onClick={() => {
                                                        swal({
                                                            title: "আপনি কি রেজাল্ট জেনারেট করতে চান?",
                                                            icon: "warning",
                                                            //buttons: false,
                                                            //dangerMode: false,
                                                        }).then((willDo) => {
                                                            willDo &&
                                                                resultGenerate(
                                                                    row?.id
                                                                );
                                                        });
                                                    }}
                                                >
                                                    Generate Result
                                                </Button>
                                                // </Link>
                                            )}
                                        {row?.circularOrder > 1 && (
                                            <Button
                                                variant="info"
                                                className="m-2"
                                                onClick={() =>
                                                    history.push(
                                                        `/portal/phase-wise/generated-result/${row?.id}`
                                                    )
                                                }
                                            >
                                                Phase Wise List
                                            </Button>
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default ResultGenerate;
