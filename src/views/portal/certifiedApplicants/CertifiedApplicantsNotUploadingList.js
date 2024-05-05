import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Col } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "components/button/CrudAction";
import { DefaultCard } from "components/card";
import { BasicTable } from "components/table";
import RowSerial from "helpers/rowSerial";
import { UrlBuilder } from "helpers/UrlBuilder";
import useListApi from "hooks/useListApi";
import { callApi } from "reducers/apiSlice";
import { setDeleteModal } from "reducers/deleteModalSlice";
import { selectToastAlert } from "reducers/toastAlertSlice";
import { Formik, Form, Field } from "formik";
import { SharedData } from "helpers/SharedData";
import CertifiedApplicantsFiltering from "../certifiedApplicants/CertifiedApplicantsFiltering";
import { AuthUser } from "helpers/AuthUser";
import moment from "moment";

const CertifiedApplicantsNotUploadingList = () => {
    /**
     * useHistory: navigation helper
     */
    const history = useHistory();

    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Put page and size into state
     */

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortBy: "",
    });

    /**
     * Get updated 'type' value from toast alert's state.
     */
    const { type } = useSelector(selectToastAlert);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        title: "আপলোড করা হয়নি আবেদনকারীর তালিকা",
        headerSlot: () => (
            <Link to="/portal/certified-applicants/upload-progress-list">
                <Button variant="light" className="f-right mr-10">
                    <FontAwesomeIcon icon={faList} className="me-2" />
                    ফাইল আপলোডের তালিকা
                </Button>
            </Link>
        ),
    };

    /**
     * tableProps must need to pass into BasicTable component.
     * headers: used for showing table header dynamically.
     * perPage: used for contfileUploadProcessedStatusing page size.
     * config: used for api call.
     * meta: contains pagination related data. [initially empty]
     *
     * @type {{headers: *[], perPage: number[], meta: {}, config: {output: string, operationId: string}}}
     */
    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "name", label: "আবেদনকারীর নাম" },
            { id: "roll", label: "রোল নম্বর" },
            { id: "registration", label: "নিবন্ধন নম্বর" },
            { id: "fatherName", label: "বাবার নাম" },
            { id: "motherName", label: "মায়ের নাম" },
            { id: "nid", label: "এনআইডি" },
            { id: "batch", label: "ব্যাচ নাম" },
            { id: "post", label: "পদ" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `certified-applicant/not-uploaded-list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "PreveousCertifiedApplicationsList",
        },
        meta: {},
    };

    /**
     * useListApi: get data for displaying on the table
     */
    const { loading, data, meta } = useListApi(tableProps.config);
    /**
     * Update tableProps's meta from api response
     */
    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    /**
     * Change the page on table and update the state.
     * Fetch data by dispatching callApi.
     */
    const onPageChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            page: value,
        });
    };

    const onSizeChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            size: value,
        });
    };

    const onSearchChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            search: value,
        });
    };

    const onSearchByValue = (value) => {
        setCommonSearch({
            ...commonSearch,
            sortColumn: value,
        });
    };

    /**
     * Refresh the table data after performing delete operation.
     * Fetch data by dispatching callApi.
     */
    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant/not-uploaded-list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "PreveousCertifiedApplicationsList",
                })
            );
        }
    });

    return (
        <DefaultCard className="mb-50" {...cardProps} loader={loading}>
            {loading && <ProgressBar />}
            {/* {data !== undefined && data.length > 0 ? ( */}
            {/* <CertifiedApplicantsFiltering
                onSubmit={(values) => {
                    setCommonSearch({
                        ...commonSearch,
                        ...values,
                    });
                }}
            /> */}
            <BasicTable
                {...tableProps}
                onSizeChange={(pageSize) => onSizeChange(pageSize)}
                onSearchChange={(query) => onSearchChange(query)}
                onPageChange={(pageNo) => onPageChange(pageNo)}
                onSearchByValue={(sval) => onSearchByValue(sval)}
            >
                {data !== undefined &&
                    data?.length > 0 &&
                    data.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <span>{RowSerial(meta, index)}</span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.applicantName}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.rollNo}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.registrationNo}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.fatherName}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.motherName}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">{row?.nid}</span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row?.examNameBn ?? row?.examName}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.designationNameBn ??
                                        row.designationName}
                                </span>
                            </td>
                        </tr>
                    ))}
            </BasicTable>
        </DefaultCard>
    );
};

export default CertifiedApplicantsNotUploadingList;
