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

const DemoList = () => {
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
        title: "নিবন্ধিত তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/demo-nid/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন NID
                    যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "name", label: "নাম" },
            { id: "fatherName", label: "বাবার নাম" },
            { id: "motherName", label: "মায়ের নাম" },
            { id: "dateOfBirth", label: "জন্ম তারিখ  " },
            { id: "gender", label: "লিঙ্গ" },
            { id: "nidNumber", label: "এনআইডি" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.commonApi(
                `mock-nid/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "DemoList",
            storeName: "DemoList",
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
                    operationId: UrlBuilder.commonApi(
                        `mock-nid/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "DemoList",
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
                operationId: UrlBuilder.commonApi(
                    `mock-nid/update-record-status`
                ),
                parameters: {
                    method: "PUT",
                    body: JSON.stringify(resBody),
                },
                output: "DemoList",
            })
        );
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
                                        {row?.name?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.fatherName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.motherName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.dateOfBirth.substring(0,10) ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.gender ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.nidNumber ?? "N/A"}
                                    </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/settings/demo-nid/${row?.id}/edit`
                                                )
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};
export default DemoList;
