import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { SharedData } from "helpers/SharedData";
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
import swal from "sweetalert";

const SubjectList = () => {
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
        title: "বিষয়ের তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/subject/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন
                    বিষয় যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "subjectName", label: "বিষয়ের নাম" },
            { id: "subjectNameBn", label: "বিষয়ের নাম বাংলায়" },
            // { id: "subjectNameDesc", label: "বিষয়ের বর্ণনা" },
            // { id: "subjectNameDescBn", label: "বিষয়ের বর্ণনা বাংলায়" },

            { id: "subjectCode", label: "বিষয় কোড" },
            { id: "levelId", label: "লেভেলের নাম" },
            //{ id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `subject/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "SubjectList",
            storeName: "SubjectList",
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
                        `subject/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "SubjectList",
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
                    `subject/update-record-status`
                ),
                parameters: {
                    method: "PUT",
                    body: JSON.stringify(resBody),
                },
                output: "SubjectList",
            })
        );
    };

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                {/* <subjectFiltering
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
                                        {row?.subjectName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.subjectNameBn ?? "N/A"}
                                    </span>
                                </td>
                                {/* <td>
                                    <span className="text-center">
                                        {row?.subjectNameDescBn ?? "N/A"}
                                    </span>
                                </td> */}
                                <td>
                                    <span className="text-center">
                                        {row?.subjectCode ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.levelNameBn ?? "N/A"}
                                    </span>
                                </td>
                                {/* <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/settings/subject/${row?.id}/edit??"N/A"`
                                                )
                                            }
                                            onDeleteClick={() =>
                                                onDeleteClick(row)
                                            }
                                        />
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default SubjectList;
