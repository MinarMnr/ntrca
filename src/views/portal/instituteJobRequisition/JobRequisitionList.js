import { useRef, useState, useEffect } from "react";
import { faList, faPlus, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi } from "../../../reducers/apiSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
import { AuthUser } from "helpers/AuthUser";

const JobRequisitionList = () => {
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
        instituteTypeId: AuthUser.getInstituteTypeId(),
        instituteId: AuthUser.getInstituteId(),
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
        title: "ই-রিকুইজিশন তালিকা",
        // headerSlot: () => (
        //     <Link to="/portal/e-requisition/add">
        //         <Button variant="link" className="f-right btn-sm btn-color">
        //             <FontAwesomeIcon icon={faPlus} className="me-2" />
        //             ই-রিকুইজিশন যোগ করুন
        //         </Button>
        //     </Link>
        // ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "name", label: "সার্কুলার নাম" },
            { id: "fee", label: "ফী" },
            //{ id: "tranacTime", label: "ফী প্রদানের সময়সীমা (ঘন্টায়)" },
            { id: "publishdate", label: "প্রকাশের তারিখ" },
            { id: "effectivetime", label: "কার্যকর তারিখ" },
            { id: "expiretime", label: "মেয়াদ উত্তীর্ণের তারিখ" },
            // { id: "circularfile", label: "সার্কুলার ফাইল" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `institute-job-requisition-circular/institute/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "instituteJobRequisitions",
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
                        `institute-job-requisition-circular/institute/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "instituteJobRequisitions",
                })
            );
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
                                        {row?.title}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.applicationFee}
                                    </span>
                                </td>
                                {/* <td>
                                    <span className="text-center">
                                        {row?.feePaymentValidityHour}
                                    </span>
                                </td> */}
                                <td>
                                    <span className="text-center">
                                        {moment(row?.publishDate).format(
                                            "DD-MM-YYYY hh:mm a"
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row?.effectiveDate).format(
                                            "DD-MM-YYYY hh:mm a"
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row?.expiryDate).format(
                                            "DD-MM-YYYY hh:mm a"
                                        )}
                                    </span>
                                </td>
                                {/* <td>
                                    <span className="text-center">
                                        {row?.encloserList?.length > 0 && (
                                            <>
                                                <a
                                                    target="_blank"
                                                    href={`${UrlBuilder.fileServerApi(
                                                        row?.encloserList
                                                            ?.length > 0 &&
                                                            row?.encloserList[0]
                                                                ?.encloserUrl
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
                                </td> */}
                                <td>
                                    <>
                                        <Link
                                            to={`/portal/job-requisition/add/${row?.id}/${row?.title}`}
                                        >
                                            <Button
                                                style={{ cursor: "hover" }}
                                                variant="success"
                                                className="f-left btn btn-sm mr-5 mb-5"
                                                type="button"
                                                title="Apply"
                                                disabled={
                                                    row?.isApplied
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {!row?.isApplied
                                                    ? "আবেদন করুন"
                                                    : "আবেদন চলমান"}
                                            </Button>
                                        </Link>
                                    </>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default JobRequisitionList;
