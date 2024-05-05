import React from "react";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import ReplaceApplicantListFiltering from "./ReplaceApplicantListFiltering";
const ReplaceApplicantList = ({ values }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "আবেদনকারী প্রতিস্থাপনের তালিকা",
        headerSlot: () => (
            <Link to="#">
                {/* <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Apply for
                    Job
                </Button> */}
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "eiinno", label: "EIIN" },
            { id: "designation", label: "প্রতিষ্ঠানের নাম" },
            { id: "district", label: "জেলা" },
            { id: "upazilla", label: "উপজেলা" },
            { id: "post", label: "পদবি" },
            { id: "subject", label: "বিষয়" },
            { id: "postType", label: "পদের ধরন" },
            { id: "type", label: "নির্বাচনের ধরন" },
            { id: "batch", label: "ব্যাচ" },
            { id: "roll", label: "রোল" },
            { id: "applicantname", label: "আবেদনকারীর নাম" },
            { id: "joining", label: "যোগদানের অবস্থা" },
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
            eiinno: "১০৩২৯৬",
            designation: "এ. মোনেম কলেজ",
            district: "ব্রাহ্মণবাড়িয়া	",
            upazilla: "ব্রাহ্মণবাড়িয়া সদর",
            post: "সহকারী শিক্ষক",
            subject: "প্রাণিবিদ্যা",
            postType: "এমপিও",
            type: "মেরিট",
            batch: "৮",
            roll: "৩২২০৫৩৮৪",
            applicantname: "এমডি মিজানুর রহমান",
            policeverification: "ভেরিফাইড",
            joining: "হ্যাঁ",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}

                <ReplaceApplicantListFiltering onSubmit={(value) => {}} />

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
                                            {row.eiinno}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.designation}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.district}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.upazilla}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.post}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.subject}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.postType}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.type}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.batch}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.roll}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.applicantname}
                                        </span>
                                    </td>
                                    {/* <td>
                                        <span
                                            className={
                                                row.policeverification ===
                                                "ভেরিফাইড"
                                                    ? "text-center btn btn-success"
                                                    : row.policeverification ===
                                                      "নন ভেরিফাইড"
                                                    ? "text-center btn btn-danger"
                                                    : ""
                                            }
                                        >
                                            {row.policeverification}
                                        </span>
                                    </td> */}
                                    <td>
                                        <span
                                            className={
                                                row.joining === "হ্যাঁ"
                                                    ? "text-center btn btn-success"
                                                    : row.joining === "না"
                                                    ? "btn btn-danger text-center"
                                                    : ""
                                            }
                                        >
                                            {row.joining}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            <Button variant="primary">
                                                Genarate
                                            </Button>
                                        </span>
                                    </td>
                                    {/* <td>
                                        <CrudAction
                                        onEditClick={() =>
                                            history.push(
                                                `/portal/settings/subject/${row.id}/edit`
                                            )
                                        }
                                        onDeleteClick={() =>
                                            onDeleteClick(row)
                                        }
                                        />
                                    </td> */}
                                </tr>
                            )
                        )}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default ReplaceApplicantList;
