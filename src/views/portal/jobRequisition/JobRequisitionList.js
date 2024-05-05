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

const JobRequisitionList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "ই রিকুইজিশন",
        headerSlot: () => (
            <Link to="/portal/job-requisition/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> ই
                    রিকুইজিশন যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "instituename", label: "প্রতিষ্ঠানের নাম" },
            { id: "instituteTypw", label: "প্রতিষ্ঠানের ধরন" },
            // { id: "designation", label: "পদবি" },
            // { id: "subject", label: "বিষয়" },
            // { id: "division", label: "প্রার্থীর ধরন" },
            { id: "district", label: "পদ সংখ্যা" },
            // { id: "filledNo", label: "পূরণকৃত পদ সংখ্যা" },
            // { id: "thana", label: "পদের ধরন" },
            { id: "year", label: "বছর" },
            { id: "tracknumber", label: "অ্যাপ্লিকেশন ট্র্যাকিং নম্বর" },
            { id: "status", label: "লেনদেনের অবস্থা" },
            { id: "applicantstatus", label: "আবেদনকারীর অবস্থা" },
            { id: "action", label: "Action" },
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
            instituteType: "দাখিল মাদ্রাসা",
            // designation: "সহকারী মৌলভী",
            // subject: "গণিত ",
            // candidateType: "সাধারণ",
            postCount: "2",
            filledNo: "1",
            postType: "MPO",
            year: "2022",
            tracknumber: "1545",
            status: "paid",
        },
        {
            instituename: "Mogultoli Aftab Uddin Dakhil Madrasha",
            instituteType: "দাখিল মাদ্রাসা",
            // designation: "সহকারী মৌলভী",
            // subject: "গণিত ",
            // candidateType: "সাধারণ",
            postCount: "1",
            filledNo: "1",
            postType: "MPO",
            year: "2023",
            tracknumber: "1045",
            status: "paid",
        },
        {
            instituename: "Mogultoli Aftab Uddin Dakhil Madrasha",
            instituteType: "দাখিল মাদ্রাসা",
            // designation: "সহকারী শিক্ষক",
            // subject: "বাংলা ",
            // candidateType: "মহিলা কোটা",
            postCount: "1",
            filledNo: "1",
            postType: "MPO",
            year: "2023",
            tracknumber: "1095",
            status: "paid",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                {/* <div class="row">
                    <div class="col-md-12">
                        <h3 class=" text-center">

                            Selected Candidates Result List in Institutes <p size="4" >(3rd Cycle: 2nd Phase)</p>
                        </h3>
                    </div>
                </div> */}
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
                                            {row.instituteType}
                                        </span>
                                    </td>
                                    {/* <td>
                                        <span className="text-center">
                                            {row.designation}
                                        </span>
                                    </td> */}
                                    {/* <td>
                                        <span className="text-center">
                                            {row.subject}
                                        </span>
                                    </td> */}
                                    {/* <td>
                                        <span className="text-center">
                                            {row.candidateType}
                                        </span>
                                    </td> */}
                                    <td>
                                        <span className="text-center">
                                            {row.postCount}
                                        </span>
                                    </td>
                                    {/* <td>
                                        <span className="text-center"> 
                                            {row.filledNo}
                                        </span>
                                    </td> */}
                                    {/* <td>
                                        <span className="text-center">
                                            {row.postType}
                                        </span>
                                    </td> */}
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
                                                Pending : USEO
                                            </Button>
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-center">
                                            <Link to="/portal/job-requisition-details">
                                                <Button
                                                    className="bg-primary text-light"
                                                    variant="link"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                    {""}
                                                </Button>
                                            </Link>
                                            <Link to="/portal/filledPosts/List">
                                                <Button
                                                    className="bg-primary text-light ml-5"
                                                    variant="link"
                                                >
                                                    পূরণকৃত পদ সংখ্যার বিস্তারিত
                                                </Button>
                                            </Link>
                                        </span>
                                    </td>
                                    {/*


                                    <Link to="/portal/job-requisition-details">
                                            <Button className="bg-primary text-light" variant="link">
                                                <FontAwesomeIcon icon={faInfo} />{""}
                                            </Button>
                                        </Link>
                                    
                                    
                                    
                                    
                                    <td>
                                        <a href="/portal/job-requisition/add">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                Apply
                                            </button>
                                        </a>
                                    </td> */}
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

export default JobRequisitionList;
