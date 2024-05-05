import React from "react";
import { faPlus, faInfo, faEye } from "@fortawesome/free-solid-svg-icons";
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

const filledPostsList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "পূরণকৃত পদ সংখ্যার বিস্তারিত তথ্য",
        headerSlot: () => (
            <Link to="/portal/job-requisition/add">
                {/* <Button variant="link" className="f-right btn-sm btn-color">
                <FontAwesomeIcon icon={faPlus} className="me-2" /> শূন্য পদের চাহিদা যোগ করুন 
            </Button> */}
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "teacherName", label: "শিক্ষকের নাম" },
            { id: "instituteTypw", label: "প্রতিষ্ঠানের ধরন" },
            { id: "designation", label: "পদের ধরন" },
            { id: "subject", label: "বিষয়" },
            { id: "division", label: "প্রার্থীর ধরন" },
            { id: "district", label: "পূরণকৃত পদ সংখ্যা" },
            { id: "thana", label: "পদের ধরন" },
            { id: "joinDate", label: "যোগদানের তারিখ" },
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
            teacherName: "",
            instituteType: "দাখিল মাদ্রাসা(1-10)",
            designation: "সহকারী মৌলভী",
            subject: "সহকারী মৌলভী ",
            candidateType: "সাধারণ",
            postCount: "1",
            postType: "MPO",
            joinDate: "",
        },
        {
            teacherName: "",
            instituteType: "দাখিল মাদ্রাসা(1-10)",
            designation: "সহকারী মৌলভী",
            subject: "সহকারী মৌলভী ",
            candidateType: "সাধারণ",
            postCount: "1",
            postType: "MPO",
        },
        {
            teacherName: "",
            instituteType: "দাখিল মাদ্রাসা(1-10)",
            designation: "সহকারী শিক্ষক",
            subject: "বাংলা ",
            candidateType: "মহিলা কোটা",
            postCount: "1",
            postType: "MPO",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}

                <table className="table text-center">
                    <thead>
                        <th>ক্রঃ নঃ</th>
                        <th>শিক্ষকের নাম</th>
                        <th>প্রতিষ্ঠানের ধরন</th>
                        <th>পদের ধরন</th>
                        <th>বিষয়</th>
                        <th>প্রার্থীর ধরন</th>
                        <th>পদের ধরন</th>
                        <th>যোগদানের তারিখ</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Anoy Choudhury</td>
                            <td>দাখিল মাদ্রাসা(1-10)</td>
                            <td>সহকারী মৌলভী</td>
                            <td>সহকারী মৌলভী</td>
                            <td>সাধারণ</td>
                            <td>MPO</td>
                            <td>12/10/2022</td>
                        </tr>
                    </tbody>
                </table>
                {/* <BasicTable
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
                                            {row.instituteType}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.designation}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.subject}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.candidateType}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.postCount}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.postType}
                                        </span>
                                    </td>
                                    
                                </tr>
                            )
                        )}
                </BasicTable> */}
            </DefaultCard>
        </>
    );
};

export default filledPostsList;
