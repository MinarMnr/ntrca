import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
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
import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import SelectedApplicantListFiltering from "./SelectedApplicantListFiltering";
const WaitingList = ({ values }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "Selected Candidates List",
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
            { id: "designation", label: "Institute Name" },
            { id: "district", label: "District" },
            { id: "upazilla", label: "Upazilla" },
            { id: "post", label: "Post" },
            { id: "subject", label: "Subject" },
            { id: "postType", label: "Post Type" },
            { id: "type", label: "Selection Type" },
            { id: "batch", label: "Batch" },
            { id: "roll", label: "Roll" },
            { id: "applicantname", label: "Applicant Name" },
            // { id: "action", label: "Action" },
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
            eiinno: "103296",
            designation: "A. MONEM COLLEGE",
            district: "BRAHMANBARIA	",
            upazilla: "BRAHMANBARIA SADAR",
            post: "Demonstrator",
            subject: "Zoology",
            postType: "MPO",
            type: "Merit",
            batch: "8",
            roll: "32205384",
            applicantname: "MD. MIZANUR RAHMAN",
        },
        {
            eiinno: "103265",
            designation: "AHARANDA MOHIUDDIN NAGAR SCHOOL",
            district: "BRAHMANBARIA	",
            upazilla: "BRAHMANBARIA SADAR",
            post: "Assistant Teacher, Physical Science",
            subject: "Zoology",
            postType: "MPO",
            type: "Merit",
            batch: "9",
            roll: "31904720",
            applicantname: "SRIKANTA ROY",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                <div class="row">
                    <div class="col-md-12">
                        <h3 class=" text-center">
                            Selected Candidates list in Institutes{" "}
                            <p size="4">(4rd Cycle: 2nd Phase)</p>
                        </h3>
                    </div>
                </div>
                <SelectedApplicantListFiltering onSubmit={(value) => {}} />

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

export default WaitingList;
