import React from "react";
import { faList, faPlus, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../components/button/CrudAction";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi } from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { AuthUser } from "helpers/AuthUser";

const NewERequistionList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);
    const roles = AuthUser.getRoles();

    const cardProps = {
        title: "ই-রিকুইজিশন তালিকা",
        headerSlot: () => (
            <Link to="">
                {/* <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />ই-রিকুইজিশন যোগ করুন
                </Button> */}
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "instituename", label: "প্রতিষ্ঠানের নাম" },
            { id: "instituetype", label: "প্রতিষ্ঠানের ধরন" },
            // { id: "subject", label: "বিষয়" },
            { id: "postnumber", label: "পদের সংখ্যা" },
            { id: "year", label: "বছর" },
            { id: "tracknumber", label: "অ্যাপ্লিকেশন ট্র্যাকিং নম্বর" },
            { id: "status", label: "লেনদেনের অবস্থা" },
            { id: "applicantstatus", label: "আবেদনকারীর অবস্থা" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `#?page=${setPage.current}&size=${size}`
            ),
            output: "ChoiceList",
            storeName: "ChoiceList",
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
                output: "ChoiceList",
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
            instituename: "Mogultoli Aftab Uddin Dakhil Madrasha",
            instituetype: "দাখিল মাদ্রাসা ",
            // subject:"গণিত",
            postnumber: "2",
            year: "2023",
            tracknumber: "1095",
            status: "paid",
            // applicantstatus: "pending to DHSE",
        },
        {
            instituename: "Mogultoli Aftab Uddin Dakhil Madrasha",
            instituetype: "দাখিল মাদ্রাসা ",
            // subject:"গণিত",
            postnumber: "8",
            year: "2023",
            tracknumber: "1095",
            status: "paid",
            // applicantstatus: "forward",
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

                                    <td>
                                        <span className="text-center">
                                            {row.instituename}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.instituetype}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-center">
                                            {row.postnumber}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.year}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.tracknumber}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            <Button
                                                style={{ cursor: "hover" }}
                                                variant="primary"
                                                className="f-left btn btn-sm mr-5 mb-5"
                                                type="button"
                                                title="View"
                                            >
                                                Forworded : USEO
                                            </Button>
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ cursor: "hover" }}
                                            variant="primary"
                                            className="f-left btn btn-sm mr-5 mb-5"
                                            type="button"
                                            title="View"
                                            onClick={() =>
                                                history.push(
                                                    `/portal/new-job-requisition-details`
                                                )
                                            }
                                        >
                                            বিস্তারিত দেখুন
                                        </Button>
                                    </td>
                                </tr>
                            )
                        )}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default NewERequistionList;
