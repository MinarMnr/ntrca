import React from "react";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { callApi } from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { SharedData } from "helpers/SharedData";
import moment from "moment";

const SelectionProcessList = () => {
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
    });

    const cardProps = {
        title: "ফলাফল প্রাপ্তের সময়কাল",
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
            { id: "circularTitle", label: "বিজ্ঞপ্তির নাম" },
            { id: "circularOrder", label: "ক্রম নম্বর" },
            { id: "processedStatus", label: "বর্তমান অবস্থা" },
            { id: "processedAt", label: "তৈরির সময়" },
            { id: "totalApplicants", label: "মোট আবেদনকারী" },
            { id: "totalApplicantProcessed", label: "ফলাফল প্রাপ্ত আবেদনকারী" },
            { id: "totalApplicantSelected", label: "আবেদনকারীর তালিকা" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-selection-process/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "SelectionProcess",
            storeName: "SelectionProcess",
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
                                        {row?.processedStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row?.processedAt).format(
                                            "DD-MM-YYYY h:mm:ss a"
                                        )}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.totalApplicants}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.totalApplicantProcessed}
                                    </span>
                                </td>
                                <td>
                                    {row?.processedStatus == "PROCESS_DONE" &&
                                        row?.totalApplicantProcessed > 0 && (
                                            <Link
                                                to={`/portal/selection-process-selected-applicant-list/${row?.id}`}
                                            >
                                                <Button
                                                    variant="link"
                                                    className="btn-sm btn-color"
                                                >
                                                    প্রতিষ্ঠানের নির্বাচিত
                                                    প্রার্থীদের তালিকা
                                                </Button>
                                            </Link>
                                        )}
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default SelectionProcessList;
