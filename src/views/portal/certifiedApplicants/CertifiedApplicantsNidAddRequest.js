import { AuthUser } from "helpers/AuthUser";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { BasicTable } from "../../../components/table";
import RowSerial from "../../../helpers/rowSerial";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi } from "../../../reducers/apiSlice";
import { selectToastAlert } from "../../../reducers/toastAlertSlice";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { SharedData } from "helpers/SharedData";

const CertifiedApplicantsNidAddRequest = ({ values }) => {
    const history = useHistory();
    const nid = "NID_ONLY";
    const dispatch = useDispatch();

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        informationUpdateRequestType: `${nid}`,
        search: "",
        sortColumn: "",
    });

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "NID হালনাগাদ তালিকা",
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "nidOld", label: "পুরাতন NID" },
            { id: "nidNew", label: "নতুন NID" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `certified-applicant-information-update-request/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "NidUpdatedList",
            storeName: "NidUpdatedList",
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
    const onNidChange = (value) => {
        setCommonSearch({
            ...commonSearch,
            informationUpdateRequestType: value,
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
                        `certified-applicant-information-update-request/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "NidUpdatedList",
                })
            );
        }
    });

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
                    onNidChange={(nid) => onNidChange(nid)}
                >
                    {data !== undefined &&
                        JSON.parse(JSON.stringify(data)).map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.nidOld ?? "N/A"}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.nidNew ?? "N/A"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default CertifiedApplicantsNidAddRequest;
