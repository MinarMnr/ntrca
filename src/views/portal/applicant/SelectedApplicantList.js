import React, { useEffect } from "react";
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
import { callApi, setState } from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import SelectedApplicantListFiltering from "./SelectedApplicantListFiltering";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
const SelectedApplicantList = ({ values }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortColumn: "",
    });

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "বেসরকারি শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ(NTRCA)",
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
            { id: "division", label: "বিভাগ" },
            { id: "district", label: "জেলা" },
            // { id: "upazilla", label: "উপজেলা" },
            { id: "thana", label: "উপজেলা" },
            { id: "post", label: "পদবি" },
            { id: "subject", label: "বিষয়" },
            { id: "postType", label: "পদের ধরন" },
            { id: "type", label: "নির্বাচনের ধরন" },
            { id: "batch", label: "ব্যাচ" },
            { id: "roll", label: "রোল" },
            { id: "applicantName", label: "আবেদনকারীর নাম" },
            { id: "nid", label: "NID নম্বর" },
            { id: "resultPublishDate", label: "ফলাফল প্রকাশের তারিখ" },
            { id: "joiningStatus", label: "পুলিশ ভেরিফিকেশন" },
            { id: "isPoliceVerified", label: "যোগদানের অবস্থা" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-selection-process-result-detail/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "SelectedApplicantList",
            storeName: "SelectedApplicantList",
        },
        meta: {},
        totalData: 0,
    };
    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;
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

    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `job-application-selection-process-result-detail/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "SelectedApplicantList",
                })
            );
        }
    });

    React.useEffect(() => {
        dispatch(
            setState({
                output: "toggle",
                storeName: "toggle",
                data: true,
            })
        );
    }, []);

    // const onDeleteClick = (data) => {
    //     const resBody = {
    //         entityId: `${data.id}`,
    //         recordStatus: "DELETED",
    //     };
    //     swal({
    //         title: "Are you sure you want to delete?",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     }).then((willDelete) => {
    //         willDelete && onConfirm(resBody);
    //     });
    // };

    // const onConfirm = (resBody) => {
    //     dispatch(
    //         callApi({
    //             operationId: UrlBuilder.ntrcaApi(`exam/update-record-status`),
    //             parameters: {
    //                 method: "PUT",
    //                 body: JSON.stringify(resBody),
    //             },
    //             output: "BatchList",
    //         })
    //     );
    // };

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
            joiningStatus: "ভেরিফাইড",
            isPoliceVerified: "হ্যাঁ",
        },
        {
            eiinno: "১০৩২৬৫",
            designation: "আহারান্দা মহিউদ্দিন নাগার স্কুল",
            district: "ব্রাহ্মণবাড়িয়া	",
            upazilla: "ব্রাহ্মণবাড়িয়া সদর",
            post: "সহকারী শিক্ষক",
            subject: "ফিজিক্যাল সাইন্স",
            postType: "এমপিও",
            type: "মেরিট",
            batch: "৯",
            roll: "৩১৯০৪৭২০",
            applicantname: "শ্রীকান্ত রায়",
            joiningStatus: "নন ভেরিফাইড",
            isPoliceVerified: "না",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                <div class="row">
                    <div class="col-md-12">
                        <h3 class=" text-center">
                            প্রতিষ্ঠানের নির্বাচিত প্রার্থীদের তালিকা{" "}
                            {/* <p size="4">গণবিজ্ঞপ্তি-৪ (Phase-3)</p> */}
                        </h3>
                    </div>
                </div>
                <SelectedApplicantListFiltering
                    onSubmit={(values) => {
                        setCommonSearch({
                            ...commonSearch,
                            page: 1,
                            ...values,
                        });
                    }}
                />

                <BasicTable
                    {...tableProps}
                    onSizeChange={(pageSize) => onSizeChange(pageSize)}
                    onSearchChange={(query) => onSearchChange(query)}
                    onPageChange={(pageNo) => onPageChange(pageNo)}
                    onSearchByValue={(sval) => onSearchByValue(sval)}
                >
                    {data !== undefined &&
                        JSON.parse(JSON.stringify(data)).map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.eiinNo ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.instituteNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.divisionNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.districtNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.thanaNameBn ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.designationName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.subjectName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.jobType}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.quotaName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.batch ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.rollNo ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.applicantName ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.nid ?? "N/A"}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.resultPublishDate
                                            ? moment(
                                                  row?.resultPublishDate
                                              ).format("DD-MM-YYYY")
                                            : "N/A"}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={
                                            row?.isPoliceVerified === "হ্যাঁ"
                                                ? "text-center btn btn-success"
                                                : row?.isPoliceVerified === "না"
                                                ? "btn btn-danger text-center"
                                                : ""
                                        }
                                    >
                                        {row?.isPoliceVerified ?? "N/A"}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={
                                            row?.joiningStatus === "APPROVED"
                                                ? "text-center btn btn-success"
                                                : row?.joiningStatus === "NONE"
                                                ? "text-center btn btn-danger"
                                                : ""
                                        }
                                    >
                                        {row?.joiningStatus ?? "N/A"}
                                    </span>
                                </td>
                                {/* <td>
                                        <span className="text-center">
                                            <Col md={6}>
                                                <Button variant="primary" >
                                                    Call For PV
                                                </Button>
                                            </Col>
                                        </span>
                                    </td> */}
                                {/* <td>
                                        <CrudAction
                                        onEditClick={() =>
                                            history.push(
                                                `/portal/settings/subject/${row?.id}/edit`
                                            )
                                        }
                                        onDeleteClick={() =>
                                            onDeleteClick(row)
                                        }
                                        />
                                    </td> */}
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default SelectedApplicantList;
