import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Col } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "components/card";
import { BasicTable } from "components/table";
import RowSerial from "helpers/rowSerial";
import { UrlBuilder } from "helpers/UrlBuilder";
import useListApi from "hooks/useListApi";
import { callApi } from "reducers/apiSlice";
import { selectToastAlert } from "reducers/toastAlertSlice";

import { SharedData } from "helpers/SharedData";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";
import SelectedApplicantFilter from "./SelectedApplicantFilter";

const SelectedApplicantJoiningList = () => {
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
        sortColumn: "",
    });

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
        title: "নতুন আবেদনকারীর তালিকা",
        // headerSlot: () => (
        //     <Link to="/portal/certified-applicants/add">
        //         <Button variant="link" className="f-right btn-sm btn-color">
        //             <FontAwesomeIcon icon={faPlus} className="me-2" />
        //             আপলোড করুন
        //         </Button>
        //     </Link>
        // ),
    };

    /**
     * tableProps must need to pass into BasicTable component.
     * headers: used for showing table header dynamically.
     * perPage: used for controlling page size.
     * config: used for api call.
     * meta: contains pagination related data. [initially empty]
     *
     * @type {{headers: *[], perPage: number[], meta: {}, config: {output: string, operationId: string}}}
     */
    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "circularTitle", label: "গণ বিজ্ঞপ্তি" },
            { id: "jobApplicationCircularId", label: "গণ বিজ্ঞপ্তি আইডি " },
            // { id: "totalApplications", label: "মোট আবেদনকারী " },
            { id: "joiningStatus", label: "যোগদানের অবস্থা " },

            // { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `admin/circular-wise-joining-status-count-list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "certifiedApplications",
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
                        `certified-applicant/register/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "certifiedApplications",
                })
            );
        }
    });

    return (
        <DefaultCard className="mb-50" {...cardProps} loader={loading}>
            {loading && <ProgressBar />}
            {/* {data !== undefined && data.length > 0 ? ( */}
            <SelectedApplicantFilter
                onSubmit={(values) => {
                    setCommonSearch({
                        ...commonSearch,
                        ...values,
                    });
                }}
            />
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
                                    {row?.circularTitle ?? "N/A"}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.jobApplicationCircularId ?? "N/A"}
                                </span>
                            </td>
                            {/* <td>
                                <span className="text-center">
                                    {row?.totalApplications ?? "N/A"}
                                </span>
                            </td> */}
                            <td>
                                <span className="text-center">
                                    {row?.joiningStatus === "APPROVED"
                                        ? `যোগদানকারী ${EnglishNumberToBangla(
                                              row?.totalApplications ?? "N/A"
                                          )} জন`
                                        : row?.joiningStatus === "NONE"
                                        ? `নির্বাচিত ${EnglishNumberToBangla(
                                              row?.totalApplications ?? "N/A"
                                          )} জন`
                                        : row?.joiningStatus === "UNDER_REVIEW"
                                        ? `প্রতিষ্ঠানে আবেদনকারী ${EnglishNumberToBangla(
                                              row?.totalApplications ?? "N/A"
                                          )} জন `
                                        : "N/A"}
                                </span>
                            </td>

                            {/* <td>
                                <Button
                                    className="btn btn-color"
                                    onClick={() =>
                                        history.push(
                                            `/portal/certified-applicants/details/${row?.id}/${row?.examRefId}`
                                        )
                                    }
                                >
                                    বিস্তারিত দেখুন
                                </Button>
                            </td> */}
                        </tr>
                    ))}
            </BasicTable>
        </DefaultCard>
    );
};

export default SelectedApplicantJoiningList;
