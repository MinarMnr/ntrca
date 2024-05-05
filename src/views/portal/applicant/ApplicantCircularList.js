import { AuthUser } from "helpers/AuthUser";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi } from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import {
    selectToastAlert,
    setToastAlert,
} from "../../../reducers/toastAlertSlice";
import { FieldArray, Field } from "formik/dist/index";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
import Cookies from "js-cookie";

const ApplicantCircularList = (props) => {
    const history = useHistory();
    const nid = AuthUser.getUserName();
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const paymentStatus = query.get("paymentStatus");

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        nid: `${nid}`,
        search: "",
        sortColumn: "",
    });

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "গণ বিজ্ঞপ্তির তালিকা",
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "circularTitle", label: "বিজ্ঞপ্তির নাম" },
            { id: "circularPublishDate", label: "প্রকাশের তারিখ" },
            { id: "circularEffectiveDate", label: "কার্যকর তারিখ" },
            { id: "circularExpiryDate", label: "মেয়াদ শেষের তারিখ" },
            // { id: "effectiveDateForm", label: "কার্যকর সময়" },
            { id: "applicationFee", label: "আবেদন ফী" },
            { id: "name", label: "পেমেন্ট স্ট্যাটাস" },
            { id: "isApplied", label: "পদক্ষেপ গ্রহন করুন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-circular/applicant/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "CircularList",
            storeName: "CircularList",
        },
        meta: {},
        totalData: 0,
    };

    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

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
    const onNidChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            nid: value,
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

    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `job-application-circular/applicant/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "CircularList",
                })
            );
        }
    });

    let headers = {
        Authorization: "Bearer " + Cookies.get("access_token"),
        "Content-Type": "application/json",
    };

    const pay = async (id) => {
        var res = await fetch(
            UrlBuilder.ntrcaApi(`job-application/payment/${id}`),

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
                        `job-application-circular/applicant/list?${new URLSearchParams(
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
                        `job-application-circular/applicant/list?${new URLSearchParams(
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
                        `job-application-circular/applicant/list?${new URLSearchParams(
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
                        `job-application-circular/applicant/list?${new URLSearchParams(
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
                        `job-application-circular/applicant/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "submittedJobRequisition",
                })
            );
        }
    }, [paymentStatus]);

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
                        JSON.parse(JSON.stringify(data)).map((row, index) => (
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
                                        {row?.circularPublishDate &&
                                            moment(
                                                row?.circularPublishDate
                                            ).format("DD-MM-YYYY h:mm:ss a")}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.circularEffectiveDate &&
                                            moment(
                                                row?.circularEffectiveDate
                                            ).format("DD-MM-YYYY h:mm:ss a")}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.circularExpiryDate &&
                                            moment(
                                                row?.circularExpiryDate
                                            ).format("DD-MM-YYYY h:mm:ss a")}
                                    </span>
                                </td>

                                {/* <td>
                                    <span className="text-center">
                                        {row.applicationFeePaymentValidityHour}{" "}
                                        ঘণ্টা
                                    </span>
                                </td> */}
                                <td>
                                    <span className="text-center">
                                        {row.applicationFee} টাকা
                                    </span>
                                </td>
                                <td>
                                    <>
                                        <br />
                                        {row?.paymentStatus == "UNPAID" &&
                                        row?.applicationStatus !=
                                            "INITIATED" ? (
                                            <Button
                                                style={{ cursor: "hover" }}
                                                variant="primary"
                                                className="btn btn-primary  btn-sm mr-5 mb-5"
                                                type="button"
                                                title="View"
                                                onClick={() => {
                                                    pay(row?.jobApplicationId);
                                                }}
                                            >
                                                PAY NOW
                                            </Button>
                                        ) : (
                                            <span className="text-center">
                                                {row?.paymentStatus}
                                            </span>
                                        )}
                                    </>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {(row?.applicationStatus ==
                                            "INITIATED" ||
                                            row?.applicationStatus == null) &&
                                            row?.isRequisitionAvailableForChoice ==
                                                1 && (
                                                <Link
                                                    to={`/portal/ntrca-application/apply/${row?.id}`}
                                                >
                                                    <Button
                                                        style={{
                                                            cursor: "hover",
                                                        }}
                                                        variant="primary"
                                                        className="f-left btn btn-primary  btn-sm mr-5 mb-5"
                                                        type="button"
                                                        title="apply"
                                                    >
                                                        আবেদন করুন
                                                    </Button>
                                                </Link>
                                            )}
                                        {(row?.applicationStatus == "APPLIED" ||
                                            row?.applicationStatus ==
                                                "COMPLETED" ||
                                            row?.applicationStatus ==
                                                "SELECTED") && (
                                            <Link
                                                to={`/portal/ntrca-application/application/preview/${row?.id}/${row?.circularTitle}`}
                                            >
                                                <Button
                                                    style={{
                                                        cursor: "hover",
                                                    }}
                                                    variant="info"
                                                    className="f-left btn btn-info  btn-sm mr-5 mb-5"
                                                    type="button"
                                                    title="apply"
                                                >
                                                    আবেদিত তথ্য দেখুন
                                                </Button>
                                            </Link>
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

export default ApplicantCircularList;
