import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../../components/button/CrudAction";
import { DefaultCard } from "../../../../components/card";
import { BasicTable } from "../../../../components/table";
import RowSerial from "../../../../helpers/rowSerial";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { callApi } from "../../../../reducers/apiSlice";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { FieldArray, Field } from "formik/dist/index";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SharedData } from "helpers/SharedData";
import moment from "moment";

const RulesList = ({ values }) => {
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
        title: "নিয়মাবলীর তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/rules/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নিয়মাবলী
                    যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "rulesNameBn", label: "নিয়মাবলীর নাম" },
            { id: "rulesNameBn", label: "নিয়মাবলীর নাম (বাংলায়)" },
            { id: "effectiveDateForm", label: "কার্যকর তারিখ" },
            // { id: "effectiveDateTo", label: "শেষের তারিখ" },
            // { id: "quotaFlexibility", label: "কোটা অন্তর্বুক্ত নয়" },
            // { id: "ntrcaexam", label: "NTRCA পরীক্ষা" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-rule/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "RulesList",
            storeName: "RulesList",
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
                        `job-application-rule/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "RulesList",
                })
            );
        }
    });
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

    const demodata = [
        {
            id: 1,
            rulesName: "বিজ্ঞপ্তির নিয়মাবলী 2022",
            effectiveDateForm: "1/1/2022",
            effectiveDateTo: "1/3/2022",
            quotaFlexibility: "হাওর এলাকা",
            ntrcaexam: "১৪ তম",
        },
        {
            id: 2,
            rulesName: "বিজ্ঞপ্তির নিয়মাবলী 2023 ",
            effectiveDateForm: "1/1/2023",
            effectiveDateTo: "1/3/2023",
            quotaFlexibility: "সমতল ভূমি",
            ntrcaexam: "১৪ তম",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}

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
                                        {row.ruleName}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.ruleNameBn}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row?.ruleValidFrom &&
                                            moment(row?.ruleValidFrom).format(
                                                "DD-MM-YYYY h:mm:ss a"
                                            )}
                                    </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/settings/rules/${row.id}/edit`
                                                )
                                            }
                                            onShowClick={() =>
                                                history.push(
                                                    `/portal/settings/rules/${row.id}/details`
                                                )
                                            }
                                            // onDeleteClick={() =>
                                            //     onDeleteClick(row)
                                            // }
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

export default RulesList;
