import React from "react";
import { useRef, useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../components/button/CrudAction";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi, clearState, setState } from "../../../reducers/apiSlice";
import { setDeleteModal } from "../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import MeritListFiltering from "./MeritListFiltering";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
import { AuthUser } from "helpers/AuthUser";

const MeritList = ({ values }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    /**
     * Put page and size into state
     */
    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        subjectCode: "",
        designationCode: "",
        meritGenerationType: "",
        employmentStatus: "",
        ageLimit: "",
        search: "",
        sortColumn: "",
    });

    /**
     * Get updated 'type' value from toast alert's state.
     */
    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "সম্মিলিত জাতীয় মেধা তালিকা",
        headerSlot: () => (
            <Link to="#">
                {/* <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Apply for
                    Job
                </Button> */}
            </Link>
        ),
    };

    const isNTRCAApplicant = AuthUser?.getRoles().includes("NTRCAApplicant");

    let tableProps = {};

    isNTRCAApplicant
        ? (tableProps = {
              headers: [
                  { id: "id", label: "ক্রঃ নঃ" },
                  { id: "applicantname", label: "আবেদনকারীর নাম" },
                  { id: "roll", label: "রোল" },

                  {
                      id: "combinedMeritProcessDetailList.meritPosition",
                      label: "মেধাক্রম",
                  },
                  { id: "designation", label: "পদবি" },
                  { id: "subject", label: "বিষয়" },
                  { id: "applicableExamList", label: "ব্যাচ" },
              ],
              perPage: [10, 25, 50, 100],
              config: {
                  operationId: UrlBuilder.ntrcaApi(
                      `certified-applicant-combined-merit-process-detail/merit-list/?${new URLSearchParams(
                          SharedData.cleanObject(commonSearch)
                      )}`
                  ),
                  output: "ApplicantMeritList",
                  storeName: "ApplicantMeritList",
              },
              meta: {},
              totalData: 0,
          })
        : (tableProps = {
              headers: [
                  { id: "id", label: "ক্রঃ নঃ" },
                  // { id: "educationLevelId", label: "স্তর" },
                  { id: "applicantname", label: "আবেদনকারীর নাম" },
                  { id: "roll", label: "রোল" },

                  { id: "vivaScoreAchieved", label: "মৌখিক-পরীক্ষা নম্বর" },
                  {
                      id: "writtenScoreAchieved",
                      label: "লিখিত-পরীক্ষা নম্বর",
                  },
                  {
                      id: "combinedMeritProcessDetailList.meritPosition",
                      label: "মেধাক্রম",
                  },
                  { id: "designation", label: "পদবি" },
                  { id: "subject", label: "বিষয়" },
                  { id: "applicableExamList", label: "ব্যাচ" },
              ],
              perPage: [10, 25, 50, 100],
              config: {
                  operationId: UrlBuilder.ntrcaApi(
                      `certified-applicant-combined-merit-process-detail/merit-list/?${new URLSearchParams(
                          SharedData.cleanObject(commonSearch)
                      )}`
                  ),
                  output: "ApplicantMeritList",
                  storeName: "ApplicantMeritList",
              },
              meta: {},
              totalData: 0,
          });

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

    const onSearchByValue = (value) => {
        setCommonSearch({
            ...commonSearch,
            sortColumn: value,
        });
    };

    const onSearchChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            search: value,
        });
    };

    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `certified-applicant-combined-merit-process-detail/merit-list/?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "ApplicantMeritList",
                })
            );
        }
        if (commonSearch?.meritGenerationType == "") {
            dispatch(
                clearState({
                    output: "ApplicantMeritList",
                })
            );
        }
    }, [type, commonSearch]);

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                <div class="row">
                    <div class="col-md-12">
                        <h3 class=" text-center">
                            1-14 এবং 2010 বিশেষ পরীক্ষার জন্য সম্মিলিত জাতীয়
                            মেধা তালিকা।
                            <br />
                            <p>
                                (এনটিআরসিএ সার্টিফিকেটধারীরা লিখিত পরীক্ষায়
                                (ঐচ্ছিক বিষয়) একই নম্বর প্রাপ্তদের একই মেধা
                                অবস্থানে দেখানো হয়েছে)
                            </p>
                        </h3>
                    </div>
                </div>
                <MeritListFiltering
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
                    {data !== undefined && data?.length > 0 ? (
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

                                {!isNTRCAApplicant && (
                                    <>
                                        <td>
                                            <span className="text-center">
                                                <b>
                                                    {Number(
                                                        row?.vivaScoreAchieved
                                                    ).toFixed(1)}
                                                </b>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                <b>
                                                    {Number(
                                                        row?.writtenScoreAchieved
                                                    ).toFixed(1)}
                                                </b>
                                            </span>
                                        </td>
                                    </>
                                )}
                                <td>
                                    <span className="text-center">
                                        <b>{row?.merit}</b>
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.designationNameBn ??
                                            row?.designationName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.subjectNameBn ?? row?.subjectName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.examNameBn ?? row?.examName}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9}>
                                <b>তথ্য পাওয়া যায়নি</b>
                            </td>
                        </tr>
                    )}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default MeritList;
