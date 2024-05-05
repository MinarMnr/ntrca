import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { SharedData } from "helpers/SharedData";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import swal from "sweetalert";
import CrudAction from "../../../../components/button/CrudAction";
import { DefaultCard } from "../../../../components/card";
import { BasicTable } from "../../../../components/table";
import RowSerial from "../../../../helpers/rowSerial";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { callApi } from "../../../../reducers/apiSlice";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { AuthUser } from "helpers/AuthUser";
import RecommendationFilter from "./RecommendationFilter";
import moment from "moment";

const RecommendationList = () => {
    // let obj = JSON.parse(json);
    const history = useHistory();

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

    const cardProps = {
        title: "রিকমেন্ডেশন সমূহের তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/recommendation/form">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন
                    রিকমেন্ডেশন যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "circularTitle", label: "গণবিজ্ঞপ্তি" },
            { id: "recommendationNameBn", label: "বিষয়" },
            { id: "recommendationDescriptionBn", label: "প্রকাশের তারিখ" },
            { id: "areaStatusId", label: "যোগদানের তারিখ শুরু" },
            { id: "percentage", label: "যোগদানের তারিখ শেষ" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `recommendation-letter-setting/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "RecommendationList",
            storeName: "RecommendationList",
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
                        `recommendation/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "RecommendationList",
                })
            );
        }
    });

    const onDeleteClick = (data) => {
        const resBody = {
            entityId: `${data.id}`,
            recordStatus: "DELETED",
        };
        swal({
            title: "Are you sure you want to delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            willDelete && onConfirm(resBody);
        });
    };

    const onConfirm = (resBody) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `recommendation/update-record-status`
                ),
                parameters: {
                    method: "PUT",
                    body: JSON.stringify(resBody),
                },
                output: "RecommendationList",
            })
        );
    };

    return (
        <>
            {
                <DefaultCard {...cardProps} className="mb-50">
                    {loading && <ProgressBar />}
                    <RecommendationFilter
                        onSubmit={(values) => {
                            setCommonSearch({
                                ...commonSearch,
                                page: 1,
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
                                            {row?.jobApplicationCircularTitle ??
                                                "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row?.subject ?? "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {moment
                                                .utc(row?.publishDate)
                                                .format("DD/MM/yyyy") || "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {moment
                                                .utc(row?.joiningStartDate)
                                                .format("DD/MM/yyyy") ?? "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {moment
                                                .utc(row?.joiningEndDate)
                                                .format("DD/MM/yyyy") ?? "N/A"}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <div
                                            style={{ display: "inline-block" }}
                                        >
                                            <CrudAction
                                                onEditClick={() =>
                                                    history.push(
                                                        `/portal/settings/recommendation/${row?.id}/edit`
                                                    )
                                                }
                                                onDeleteClick={() =>
                                                    onDeleteClick(row)
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </BasicTable>
                </DefaultCard>
            }
        </>
    );
};
export default RecommendationList;
