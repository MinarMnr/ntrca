import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { useRef, useState } from "react";
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

const DesignationList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "Designation List",
        headerSlot: () => (
            <Link to="/portal/settings/designation/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New
                    Designation
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "designationName", label: "Designation Name" },
            { id: "designationCode", label: "Code" },
            { id: "designationType", label: "Type" },

            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `designation/list?page=${setPage.current}&size=${size}`
            ),
            output: "DesignationList",
            storeName: "DesignationList",
        },
        meta: {},
        totalData: 0,
    };

    const onPageChange = (pageNo) => {
        dispatch(
            callApi({
                operationId:
                    searchValue === ""
                        ? UrlBuilder.ntrcaApi(
                              `designation/list?page=${setPage.current}&size=${size}`
                          ) //&sortBy=${changeParams.current}
                        : UrlBuilder.ntrcaApi(
                              `designation/list?page=${setPage.current}&size=${size}`
                          ),
                output: "DesignationList",
            })
        );
    };

    /**
     * Change the page size on table and update the state.
     * Fetch data by dispatching callApi.
     */
    const onSizeChange = (pageSize) => {
        setSize(pageSize);
        dispatch(
            callApi({
                operationId:
                    searchValue == ""
                        ? UrlBuilder.ntrcaApi(
                              `designation/list?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.ntrcaApi(
                              `designation/list?page=${setPage.current}&size=${size}`
                          ),
                output: "DesignationList",
            })
        );
    };

    const onSearchByValue = (val) => {
        setSearchValue(val);
        setPage.current = 1;
        dispatch(
            callApi({
                operationId:
                    val === ""
                        ? UrlBuilder.ntrcaApi(
                              `designation/list?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.ntrcaApi(
                              `designation/list?page=${setPage.current}&size=${size}&search=${val}`
                          ),
                output: "DesignationList",
            })
        );
    };

    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    const onDeleteClick = (data) => {
        var bodyStr = {
            entityId: `${data.id}`,
            recordStatus: "DELETED",
        };
        var res = JSON.stringify(bodyStr);

        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    "designation/update-record-status"
                ),
                parameters: {
                    method: "PUT",
                    body: res,
                    header: {
                        "Content-Type": "application/json",
                    },
                },
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
                    onPageChange={(pageNo) => {
                        setPage.current = pageNo;
                        onPageChange(pageNo);
                    }}
                    onSearch={(searchVal) => onSearchByValue(searchVal)}
                >
                    {data !== undefined &&
                        JSON.parse(JSON.stringify(data)).map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.designationNameBn}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.designationCode}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.designationType}
                                    </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/settings/designation/${row.id}/edit`
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
        </>
    );
};

export default DesignationList;
