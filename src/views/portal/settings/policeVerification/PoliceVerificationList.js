import React from "react";
import { faList, faPlus, faFile } from "@fortawesome/free-solid-svg-icons";
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
import { AuthUser } from "helpers/AuthUser";

const PoliceVerificationList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);
    const roles = AuthUser.getRoles();

    const cardProps = {
        title: "পুলিশ ভেরিফিকেশনের তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/police-verification/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> পুলিশ
                    ভেরিফিকেশন যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "applicationid", label: "আবেদন আইডি" },
            { id: "file", label: "এনক্লোজার ফাইল" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `#?page=${setPage.current}&size=${size}`
            ),
            output: "CircularList",
            storeName: "CircularList",
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
                              `#?page=${setPage.current}&size=${size}`
                          ) //&sortBy=${changeParams.current}
                        : UrlBuilder.ntrcaApi(
                              `#?page=${setPage.current}&size=${size}`
                          ),
                output: "CircularList",
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
                              `#?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.ntrcaApi(
                              `#?page=${setPage.current}&size=${size}`
                          ),
                output: "CircularList",
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
                              `#?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.ntrcaApi(
                              `#?page=${setPage.current}&size=${size}&search=${val}`
                          ),
                output: "CircularList",
            })
        );
    };

    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.ntrcaApi(`subject/delete/${data.id}`),
                method: "PUT",
                output: "DeletResponse",
                storeName: "DeleteResponse",
            })
        );
    };

    const dataDemo = [
        {
            file: "",
            applicationid: "32189",
        },
    ];
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
                    {dataDemo !== undefined &&
                        JSON.parse(JSON.stringify(dataDemo)).map(
                            (row, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{RowSerial(meta, index)}</span>
                                    </td>
                                    <td>{row.applicationid}</td>

                                    <td>
                                        <span className="text-center">
                                            <Link to="{row.file}">
                                                <FontAwesomeIcon
                                                    icon={faFile}
                                                    className="me-2"
                                                />
                                            </Link>
                                        </span>
                                    </td>

                                    <td>
                                        <CrudAction
                                            onEditClick={() =>
                                                history
                                                    .push
                                                    // `/portal/settings/subject/${row.id}/edit`
                                                    ()
                                            }
                                            onDeleteClick={() =>
                                                onDeleteClick(row)
                                            }
                                        />
                                    </td>
                                </tr>
                            )
                        )}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default PoliceVerificationList;
