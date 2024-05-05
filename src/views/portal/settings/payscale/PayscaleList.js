import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi, setState } from "../../../../reducers/apiSlice";
import { useHistory } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import CrudAction from "../../../../components/button/CrudAction";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { BasicTable } from "../../../../components/table";
import { Link } from "react-router-dom";
import { Button, Card } from "@themesberg/react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RowSerial from "../../../../helpers/rowSerial";

const PayscaleList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "Pay Scale List",
        headerSlot: () => (
            <Link to="/portal/settings/pay-scale/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New
                    Pay Scale
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "#" },
            { id: "payScaleName", label: " Pay Scale Name" },
            { id: "effectiveFrom", label: "Effective From" },
            { id: "effectiveTo", label: "Effective To" },
            { id: "action", label: "Action", width: "150px" },
        ],
        perPage: [10, 20, 30, 40, 50],

        config: {
            operationId: UrlBuilder.ntrcaApi(
                `pay-scale/list?page=${setPage.current}&size=${size}&sortBy=id,desc`
            ),
            output: "paySclaeList",
            storeName: "paySclaeList",
        },
        meta: {},
        totalData: 0,
    };

    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;

    const onPageChange = (pageNo) => {
        dispatch(
            callApi({
                operationId:
                    searchValue === ""
                        ? UrlBuilder.ntrcaApi(
                              `pay-scale/list?page=${setPage.current}&size=${size}&sortBy=id,desc`
                          ) //&sortBy=${changeParams.current}
                        : UrlBuilder.ntrcaApi(
                              `pay-scale/list?page=${setPage.current}&size=${size}&sortBy=id,desc`
                          ),
                output: "PayScaleList",
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
                              `pay-scale/list?page=${setPage.current}&size=${size}&sortBy=id,desc`
                          )
                        : UrlBuilder.ntrcaApi(
                              `pay-scale/list?page=${setPage.current}&size=${size}&sortBy=id,desc`
                          ),
                output: "PayScaleList",
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
                              `pay-scale/list?page=${setPage.current}&size=${size}&sortBy=id,desc`
                          )
                        : UrlBuilder.ntrcaApi(
                              `pay-scale/list?page=${setPage.current}&size=${size}&search=${val}&sortBy=id,desc`
                          ),
                output: "paySclaeList",
            })
        );
    };

    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.ntrcaApi(`pay-scale/delete/${data.id}`),
                method: "PUT",
                output: "DeleteResponse",
                storeName: "DeleteResponse",
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
                                        {row.payScaleName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.effectiveFrom}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.effectiveTo}
                                    </span>
                                </td>

                                <td>
                                    <CrudAction
                                        onEditClick={() =>
                                            history.push(
                                                `/portal/settings/pay-scale/${row.id}/edit`
                                            )
                                        }
                                        onDeleteClick={() => onDeleteClick(row)}
                                    />
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default PayscaleList;
