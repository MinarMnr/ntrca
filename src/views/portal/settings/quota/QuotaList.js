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
import { quotaName } from "./quotaData";

const QuotaList = () => {
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
        title: "কোটা সমূহের তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/quota/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন কোটা
                    যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "quotaNameBn", label: "কোটার নাম" },
            { id: "quotaDescriptionBn", label: "কোটার নাম(বাংলায়)" },
            // { id: "areaStatusId", label: "এলাকা" },
            // { id: "percentage", label: "শতাংশ" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `quota/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "quotaList",
            storeName: "quotaList",
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
                        `quota/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "quotaList",
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
                operationId: UrlBuilder.ntrcaApi(`quota/update-record-status`),
                parameters: {
                    method: "PUT",
                    body: JSON.stringify(resBody),
                },
                output: "quotaList",
            })
        );
    };

    return (
        <>
            {
                <DefaultCard {...cardProps} className="mb-50">
                    {loading && <ProgressBar />}
                    {/* <quotaFiltering
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
                                            {row?.quotaName}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.quotaNameBn}
                                        </span>
                                    </td>
                                    {/* <td>
                                    <span className="text-center">
                                        {row.areaStatusName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.percentage}%
                                    </span>
                                </td> */}
                                    <td style={{ textAlign: "center" }}>
                                        <div
                                            style={{ display: "inline-block" }}
                                        >
                                            <CrudAction
                                                onEditClick={() =>
                                                    history.push(
                                                        `/portal/settings/quota/${row.id}/edit`
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
export default QuotaList;
