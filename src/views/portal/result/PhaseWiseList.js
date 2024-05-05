import React, { useEffect } from "react";
import { faFileAlt, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
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

const PhaseWiseList = (props) => {
    const { resGenerate = {} } = useSelector(selectApi);
    const { type } = useSelector(selectToastAlert);
    /**
     * useHistory: navigation helper
     */
    const history = useHistory();

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
        jobApplicationCircularId: props.match.params.circularId,
    });

    const cardProps = {
        title: "গণ বিজ্ঞপ্তি (Phase Wise) তালিকা",
        headerSlot: () => (
            <>
                <Link to="/portal/result-generate">
                    <Button variant="secondary" className="f-right">
                        <FontAwesomeIcon icon={faList} className="me-2" />{" "}
                        প্রার্থী নির্বাচন করুন
                    </Button>
                </Link>

                <Link to="/portal/phase-wise-circular/add">
                    <Button variant="success" className="f-right mr-10">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন
                        গণ বিজ্ঞপ্তি (Phase Wise) প্রকাশ করুন
                    </Button>
                </Link>
            </>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "circularTitle", label: "গণ বিজ্ঞপ্তির নাম" },
            { id: "circularOrder", label: "নির্বাচন ক্রম নম্বর" },
            { id: "circularPublishDate", label: "প্রকাশের তারিখ" },
            { id: "circularEffectiveDate", label: "মেয়াদ উত্তীর্ণের তারিখ" },
            { id: "circularExpiryDate", label: "মেয়াদ উত্তীর্ণের তারিখ" },
            { id: "circularfile", label: "ফাইল" },
            { id: "isPublish", label: "ফলাফল প্রকাশ" },
            { id: "action", label: "অ্যাকশন" },
            // { id: "noOfMpoPost", label: "MPO পোস্ট সংখ্যা" },
            // { id: "noOfNonMpoPost", label: "Non MPO পোস্ট সংখ্যা" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `phase-wise-job-application-circular/list?${new URLSearchParams(
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

    const resultPublish = (id) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `phase-wise-job-application-circular/publish/${id}`
                ),
                output: "ResultGenerate",
                parameters: {
                    method: "PUT",
                },
            })
        );
    };

    const resultGenerate = (
        circularId,
        jobApplicationCircularType = "PHASE_WISE_JOB_APPLICATION_CIRCULAR"
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

    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `phase-wise-job-application-circular/list?${new URLSearchParams(
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
                                        {row.circularOrder}
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
                                        {row?.encloserUrl && (
                                            <>
                                                <a
                                                    target="_blank"
                                                    href={`${UrlBuilder.fileServerApi(
                                                        row?.encloserUrl
                                                    )}`}
                                                    className="form-control"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFileAlt}
                                                    />
                                                </a>
                                            </>
                                        )}
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
                                    {row?.processStatus == "IN_PROGRESS" && (
                                        <b>
                                            ফলাফল তৈরির প্রক্রিয়া চলমান <br />
                                        </b>
                                    )}
                                    {row?.isExpired == 1 &&
                                        row?.processStatus ==
                                            "PROCESS_DONE" && (
                                            // <Link to="/portal/generated-result">
                                            <Button
                                                variant="info"
                                                className="mr-10"
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
                                        row?.processStatus != "IN_PROGRESS" && (
                                            // <Link to="/portal/generated-result">
                                            <Button
                                                variant="success"
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
                                    {row?.isExpired == 0 && (
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/phase-wise-circular/${row.id}/edit`
                                                )
                                            }
                                        />
                                    )}
                                </td>

                                {/* <td>
                                    <span className="text-center">
                                        {row.noOfMpoPost}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row.noOfNonMpoPost}
                                    </span>
                                </td> */}
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default PhaseWiseList;
