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

const SelectedProcessApplicant = (props) => {
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
        resultProcessId: props.match.params.id,
        sortBy: "",
    });

    const cardProps = {
        title: "প্রতিষ্ঠানের নির্বাচিত প্রার্থীদের তালিকা",
        headerSlot: () => (
            <Link to="/portal/selection-process-applicant-list">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faList} className="me-2" />
                    ফলাফল প্রাপ্তের সময়কাল
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "eiinno", label: "EIIN" },
            { id: "designation", label: "প্রতিষ্ঠানের নাম" },
            { id: "division", label: "বিভাগ" },
            { id: "district", label: "জেলা" },
            { id: "thana", label: "উপজেলা" },
            { id: "post", label: "পদবি" },
            { id: "subject", label: "বিষয়" },
            { id: "postType", label: "পদের ধরন" },
            { id: "type", label: "নির্বাচনের ধরন" },
            { id: "batch", label: "ব্যাচ" },
            { id: "roll", label: "রোল" },
            { id: "applicantname", label: "আবেদনকারীর নাম" },
            { id: "applicantname", label: "ফলাফল প্রকাশের তারিখ" },
            { id: "policeverification", label: "পুলিশ ভেরিফিকেশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-selection-process-result-detail/list?${new URLSearchParams(
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
                                        {row?.eiinNo ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.instituteNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.divisionNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.districtNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.thanaNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.designationName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.subjectName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.jobType}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.quotaName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.batch ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.rollNo ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.applicantName ?? "N/A"}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.resultPublishDate
                                            ? moment(
                                                  row?.resultPublishDate
                                              ).format("DD-MM-YYYY")
                                            : null}
                                    </span>
                                </td>
                                {/* <td>
                                        <span
                                            className={
                                                row?.policeverification ===
                                                "ভেরিফাইড"
                                                    ? "text-center btn btn-success"
                                                    : row?.policeverification ===
                                                      "নন ভেরিফাইড"
                                                    ? "text-center btn btn-danger"
                                                    : ""
                                            }
                                        >
                                            {row?.policeverification}
                                        </span>
                                    </td> */}
                                <td>
                                    <span
                                        className={
                                            row?.isPoliceVerified === "হ্যাঁ"
                                                ? "text-center btn btn-success"
                                                : row?.isPoliceVerified === "না"
                                                ? "btn btn-danger text-center"
                                                : ""
                                        }
                                    >
                                        {row?.isPoliceVerified ?? "N/A"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default SelectedProcessApplicant;
