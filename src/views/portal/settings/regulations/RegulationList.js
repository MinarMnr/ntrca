import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { BasicTable } from "../../../../components/table";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../../components/button/CrudAction";
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
import RowSerial from "../../../../helpers/rowSerial";
import BasicTableStatus from "../../../../components/table/basic/BasicTableStatus";
import setStatusModal from "../../../../reducers/statusModalSlice";
import { SharedData } from "helpers/SharedData";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";
import RegulationFilter from "./RegulationFilter";
import swal from "sweetalert";

const MpoTeacherRulesIndex = () => {
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
        title: "পদভিত্তিক ন্যূনতম যোগ্যতা তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/regulations/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "instituteTypeId", label: " প্রতিষ্ঠানের ধরন" },
            { id: "instituteTypeId", label: " প্রতিষ্ঠানের স্তর" },
            { id: "designationNameBn", label: "পদবি" },
            { id: "subjectNameBn", label: "বিষয়" },
            { id: "grade", label: "বেতন গ্রেড" },
            { id: "ageLimit", label: "নীতিমালা" },

            { salaryGradeId: "Action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `govt-regulation-recruitment-post-subject-level-grade/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "govt-regulation-recruitmentList",
            storeName: "govt-regulation-recruitmentList",
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

    /**
     * Refresh the table data after performing delete operation.
     * Fetch data by dispatching callApi.
     */
    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.ntrcaApi(
                        `govt-regulation-recruitment-post-subject-level-grade/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "govt-regulation-recruitmentList",
                })
            );
        }
    }, [type]);

    const onDeleteClick = (data) => {
        const resBody = {
            entityId: `${data.id}`,
            recordStatus: "DELETED",
        };
        swal({
            title: "Are you sure you want to delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            willDelete && onConfirm(resBody);
        });
    };

    const onConfirm = (resBody) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `govt-regulation-recruitment-post-subject-level-grade/update-record-status`
                ),
                parameters: {
                    method: "PUT",
                    body: JSON.stringify(resBody),
                },
                output: "govt-regulation-recruitmentList-delete",
            })
        );
    };

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}

                <RegulationFilter
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
                >
                    {data !== undefined &&
                        JSON.parse(JSON.stringify(data)).map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.instituteTypeNameBn ??
                                            row?.instituteTypeName ??
                                            "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.educationLevelNameBn ??
                                            row?.educationLevelName ??
                                            "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.postNameBn ??
                                            row?.postName ??
                                            "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row?.postSubjectIdDtoList?.length >
                                            0 &&
                                            row?.postSubjectIdDtoList.map(
                                                (item, index) => {
                                                    return (
                                                        <span className="uldesign">
                                                            {item?.subjectNameBn ??
                                                                "N/A"}
                                                        </span>
                                                    );
                                                }
                                            )}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        <b>
                                            {/* গ্রেড- */}
                                            {row?.salaryGradeNameBn ?? "N/A"}
                                        </b>
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row.govtRegulationNameBn ??
                                            row.govtRegulationName ??
                                            "N/A"}
                                    </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/settings/regulations/${row.id}/edit`
                                                )
                                            }
                                            onShowClick={() =>
                                                history.push(
                                                    `/portal/settings/regulations/${row.id}/details`
                                                )
                                            }
                                            onDeleteClick={() =>
                                                onDeleteClick(row)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default MpoTeacherRulesIndex;
