import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { BasicTable } from "../../../../components/table";
import { callApi } from "../../../../reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../../components/button/CrudAction";
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RowSerial from "../../../../helpers/rowSerial";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";

const PayCodeList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "PayCode List",
        headerSlot: () => (
            <Link to="/portal/settings/pay-code/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New
                    PayCode
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "payCodeName", label: "পেকোড নাম" },
            { id: "payCodeNameBn", label: "পেকোড নাম (বাংলা)" },
            { id: "payCodeDescription", label: "বর্ণনা" },
            { id: "payCodeDescriptionBn", label: "বর্ণনা (বাংলা)" },
            { id: "Action", label: "Action" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `pay-code/list?page=${setPage.current}&size=${size}`
            ),
            output: "PayCodeList",
            storeName: "PayCodeList",
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
                              `pay-code/list?page=${setPage.current}&size=${size}`
                          ) //&sortBy=${changeParams.current}
                        : UrlBuilder.ntrcaApi(
                              `pay-code/list?page=${setPage.current}&size=${size}`
                          ),
                output: "PayCodeList",
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
                              `pay-code/list?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.ntrcaApi(
                              `pay-code/list?page=${setPage.current}&size=${size}`
                          ),
                output: "PayCodeList",
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
                              `pay-code/list?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.ntrcaApi(
                              `pay-code/list?page=${setPage.current}&size=${size}&search=${val}`
                          ),
                output: "PayCodeList",
            })
        );
    };

    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.ntrcaApi(`pay-code/delete/${data.id}`),
                method: "PUT",
                output: "DeletResponse",
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
                                        {row.payCodeName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.payCodeNameBn}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.payCodeDescription}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.payCodeDescriptionBn}
                                    </span>
                                </td>

                                <td>
                                    <CrudAction
                                        onEditClick={() =>
                                            history.push(
                                                `/portal/settings/pay-code/${row.id}/edit`
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

export default PayCodeList;
