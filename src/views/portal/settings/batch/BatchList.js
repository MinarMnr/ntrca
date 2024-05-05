import React from "react";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
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
import BatchFiltering from "./BatchFiltering";
import swal from "sweetalert";
import { SharedData } from "helpers/SharedData";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

const BatchList = () => {
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

    const cardProps = {
        title: "ব্যাচের  তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/batch/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন
                    ব্যাচ যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "examName", label: "ব্যাচের নাম (ইংরেজিতে)" },
            { id: "examNameBn", label: "ব্যাচের নাম (বাংলায়)" },
            { id: "examBatch", label: "ব্যাচ নং" },
            { id: "year", label: "বছর" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `exam/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "BatchList",
            storeName: "BatchList",
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

    /**
     * Refresh the table data after performing delete operation.
     * Fetch data by dispatching callApi.
     */
    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `exam/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "BatchList",
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
                operationId: UrlBuilder.ntrcaApi(`exam/update-record-status`),
                parameters: {
                    method: "PUT",
                    body: JSON.stringify(resBody),
                },
                output: "BatchList",
            })
        );
    };

    return (
        <DefaultCard className="mb-50" {...cardProps} loader={loading}>
            {loading && <ProgressBar />}
            {/* {data !== undefined && data.length > 0 ? ( */}
            {/* <BatchFiltering
                onSubmit={(value) => {

                }}
            /> */}
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
                                    {row.examName}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.examNameBn}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.examBatch}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {EnglishNumberToBangla(row.examYear)}
                                </span>
                            </td>

                            <td style={{ textAlign: "center" }}>
                                <div style={{ display: "inline-block" }}>
                                    <CrudAction
                                        onEditClick={() =>
                                            history.push(
                                                `/portal/settings/batch/${row.id}/edit`
                                            )
                                        }
                                        onDeleteClick={() => onDeleteClick(row)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
            </BasicTable>
        </DefaultCard>
    );
};

export default BatchList;
