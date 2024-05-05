import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { BasicTable } from "../../../../components/table";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEye,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import RowSerial from "helpers/rowSerial";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";
import moment from "moment";

const ApproveReviewIndex = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const [page, setPage] = useState(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "Application Review Configuration",
        headerSlot: () => (
            <Link to="/portal/configuration/approve-review/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New{" "}
                </Button>{" "}
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "approverReviewerName", label: "Approver Reviewer Name" },
            // { id: "forAppEntity", label: "App Entity" },
            { id: "effectiveDateFrom", label: "Effective From" },
            { id: "effectiveDateTo", label: "Effective To" },
            { id: "remark", label: "Remark" },
            { id: "Actions", label: "Actions" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.reviewerApi(
                `approve-review-config/list?appModuleId=13&page=${page}&size=${size}`
            ),
            output: "ApproveReviewConfigList",
            storeName: "ApproveReviewConfigList",
        },
        meta: {},
    };

    const onPageChange = (pageNo) => {
        dispatch(
            callApi({
                operationId:
                    searchValue === ""
                        ? UrlBuilder.reviewerApi(
                              `approve-review-config/list?page=${setPage.current}&size=${size}`
                          ) //&sortBy=${changeParams.current}
                        : UrlBuilder.reviewerApi(
                              `approve-review-config/list?page=${setPage.current}&size=${size}&sort="ASC"&search=${searchValue}`
                          ),
                output: "ApproveReviewConfigList",
            })
        );
    };

    /**
     * Change the page size on table and update the state.
     * Fetch data by dispatching callApi.
     */
    const onSizeChange = (pageSize) => {
        setSize(pageSize);
        setPage.current = 1;
        dispatch(
            callApi({
                operationId:
                    searchValue == ""
                        ? UrlBuilder.reviewerApi(
                              `approve-review-config/list?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.reviewerApi(
                              `approve-review-config/list?page=${setPage.current}&size=${size}&search=${searchValue}`
                          ),
                output: "ApproveReviewConfigList",
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
                        ? UrlBuilder.reviewerApi(
                              `approve-review-config/list?page=${setPage.current}&size=${size}`
                          )
                        : UrlBuilder.reviewerApi(
                              `approve-review-config/list?page=${setPage.current}&size=${size}&search=${val}`
                          ),
                output: "ApproveReviewConfigList",
            })
        );
    };

    /**
     * Receive the value from search box and update the state.
     * Fetch data by dispatching callApi.
     */
    const onSearchChange = (query) => {
        if (query !== "") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.reviewerApi(
                        `approve-review-config/list?departmentName=${query}&page=${page}&size=${size}`
                    ),
                    output: "ApproveReviewConfigList",
                })
            );
        }
    };

    const { loading, data = [{}], meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    /**
     * Show delete modal and performing delete operation
     * by dispatching setDeleteModal. 'deleteApi' must need be passed.
     */
    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.reviewerApi(
                    `approve-review-config/delete/${data.id}`
                ),
            })
        );
    };

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {" "}
                {loading && <ProgressBar />}
                <BasicTable
                    {...tableProps}
                    onSizeChange={(pageSize) => onSizeChange(pageSize)}
                    onPageChange={(pageNo) => {
                        setPage.current = pageNo;
                        onPageChange(pageNo);
                    }}
                    onSearchChange={(query) => onSearchChange(query)}
                    //onSearch={(searchVal) => onSearchByValue(searchVal)}
                >
                    {data !== undefined &&
                        data.length > 1 &&
                        data.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <span> {RowSerial(meta, index)} </span>{" "}
                                </td>{" "}
                                <td>
                                    <span className="text-center">
                                        {" "}
                                        {row.approverReviewerName}{" "}
                                    </span>{" "}
                                </td>{" "}
                                {/* <td>
                                      <span className="text-center">{row.forAppEntity}</span>
                                    </td> */}{" "}
                                <td>
                                    <span className="text-center">
                                        {" "}
                                        {row.effectiveDateFrom
                                            ? moment
                                                  .utc(row.effectiveDateFrom)
                                                  .format("DD/MM/yyyy")
                                            : "N/A"}{" "}
                                    </span>{" "}
                                </td>{" "}
                                <td>
                                    <span className="text-center">
                                        {" "}
                                        {row.effectiveDateTo
                                            ? moment
                                                  .utc(row.effectiveDateTo)
                                                  .format("DD/MM/yyyy")
                                            : "N/A"}{" "}
                                    </span>{" "}
                                </td>{" "}
                                <td>
                                    <span className="text-center">
                                        {" "}
                                        {row.remark}{" "}
                                    </span>{" "}
                                </td>{" "}
                                <td className="text-center">
                                    <Button
                                        className="btn btn-orange mr-10"
                                        onClick={() =>
                                            history.push(
                                                `/portal/configuration/approve-review/${row.id}/edit`
                                            )
                                        }
                                    >
                                        {/* <FontAwesomeIcon icon={faEdit} className="cursor" title="Edit" />  */}
                                        Edit{" "}
                                    </Button>{" "}
                                    <Button
                                        className="btn btn-color "
                                        onClick={() =>
                                            history.push(
                                                `/portal/configuration/approve-review/${row.id}`
                                            )
                                        }
                                    >
                                        {/* <FontAwesomeIcon icon={faEye} className="cursor" title="View Details" />  */}
                                        View Details{" "}
                                    </Button>
                                    {/* <Button className="btn btn-danger mr-10" onClick={() => onDeleteClick(row)}>
                                        <FontAwesomeIcon icon={faTrash} className="cursor" title="Delete" />
                                      </Button> */}{" "}
                                </td>{" "}
                            </tr>
                        ))}{" "}
                </BasicTable>{" "}
            </DefaultCard>{" "}
        </>
    );
};

export default ApproveReviewIndex;
