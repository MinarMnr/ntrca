import { faFileAlt, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Col } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "components/button/CrudAction";
import { DefaultCard } from "components/card";
import { BasicTable } from "components/table";
import RowSerial from "helpers/rowSerial";
import { UrlBuilder } from "helpers/UrlBuilder";
import useListApi from "hooks/useListApi";
import { callApi } from "reducers/apiSlice";
import { setDeleteModal } from "reducers/deleteModalSlice";
import { selectToastAlert, setToastAlert } from "reducers/toastAlertSlice";
import { Formik, Form, Field } from "formik";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
import { AuthUser } from "helpers/AuthUser";
import Cookies from "js-cookie";

const JobRequisitionSubmittedList = (props) => {
    /**
     * useHistory: navigation helper
     */
    const history = useHistory();

    const query = new URLSearchParams(props.location.search);
    const paymentStatus = query.get("paymentStatus");

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
        title: "সাবমিটেড ই রিকুইজিশন তালিকা",
        headerSlot: () => (
            <Link to="/portal/job-requisition-list">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faList} className="me-2" /> ই
                    রিকুইজিশন তালিকা
                </Button>
            </Link>
        ),
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
            { id: "name", label: "সার্কুলার নাম" },
            { id: "name", label: "ট্র্যাকিং নম্বর" },
            { id: "name", label: "পেমেন্ট স্ট্যাটাস" },
            { id: "আবেদনের অবস্থা", label: "আবেদনের অবস্থা" },
            { id: "registration", label: "কার্য বিবরণী" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `institute-job-requisition/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "submittedJobRequisition",
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

    let headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
        "Content-Type": "application/json",
    };

    const pay = async (id) => {
        // dispatch(
        //     callApi({
        //         operationId: UrlBuilder.ntrcaApi(
        //             `institute-job-requisition/payment/${id}`
        //         ),
        //         output: "submittedJobRequisition",
        //         storeName: "submittedJobRequisition",
        //         parameters: {
        //             method: "PUT",
        //         },
        //     })
        // );

        var res = await fetch(
            UrlBuilder.ntrcaApi(`institute-job-requisition/payment/${id}`),

            {
                method: "PUT",
                headers,
            }
        );
        if (res?.status == 200) {
            res.json().then((response) => {
                window.location.assign(response.data.gatewayPageURL);
            });
        }
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
                        `institute-job-requisition/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        }
    });

    useEffect(() => {
        if (paymentStatus === "VALID") {
            dispatch(
                setToastAlert({
                    type: "success",
                    message: "Payment Successful",
                })
            );
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `institute-job-requisition/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        } else if (paymentStatus === "FAILED") {
            dispatch(
                setToastAlert({
                    type: "warning",
                    message:
                        "Transaction is declined by customer's Issuer Bank",
                })
            );
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `institute-job-requisition/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        } else if (paymentStatus === "CANCELLED") {
            dispatch(
                setToastAlert({
                    type: "warning",
                    message: "Transaction is cancelled by the customer",
                })
            );
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `institute-job-requisition/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        } else if (paymentStatus === "UNATTEMPTED") {
            dispatch(
                setToastAlert({
                    type: "warning",
                    message: "Customer did not choose to pay any channel",
                })
            );
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `institute-job-requisition/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        } else if (paymentStatus === "EXPIRED") {
            dispatch(
                setToastAlert({
                    type: "error",
                    message: "Payment Timeout",
                })
            );
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `institute-job-requisition/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        }
    }, [paymentStatus]);

    return (
        <DefaultCard className="mb-50" {...cardProps} loader={loading}>
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
                                    {row?.jobRequisitionCircularTitle}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.trackingNumber}
                                </span>
                            </td>
                            <td>
                                <>
                                    <span className="text-center">
                                        {row?.paymentStatus}
                                    </span>
                                    <br />
                                    {row?.paymentStatus == "UNPAID" && (
                                        <Button
                                            style={{ cursor: "hover" }}
                                            variant="primary"
                                            className="btn btn-primary  btn-sm mr-5 mb-5"
                                            type="button"
                                            title="View"
                                            onClick={() => {
                                                pay(row?.id);
                                            }}
                                        >
                                            PAY NOW
                                        </Button>
                                    )}
                                </>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.currentApplicationStatus}
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
                                <>
                                    <Link
                                        to={`/portal/job-requisition/details/${row?.id}`}
                                    >
                                        <Button
                                            style={{ cursor: "hover" }}
                                            variant="primary"
                                            className="f-left btn btn-primary  btn-sm mr-5 mb-5"
                                            type="button"
                                            title="View"
                                        >
                                            বিস্তারিত দেখুন
                                        </Button>
                                    </Link>
                                    {(row?.currentApplicationStatus ==
                                        "APPLIED" ||
                                        row?.paymentStatus == "UNPAID") && (
                                        <Link
                                            to={`/portal/job-requisition/edit/${row?.id}`}
                                        >
                                            <Button
                                                style={{ cursor: "hover" }}
                                                variant="warning"
                                                className="f-left btn btn-sm mr-5 mb-5"
                                                type="button"
                                                title="Edit"
                                            >
                                                ইডিট করুন
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            </td>
                        </tr>
                    ))}
            </BasicTable>
        </DefaultCard>
    );
};

export default JobRequisitionSubmittedList;
