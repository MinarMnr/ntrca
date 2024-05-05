import React from "react";
import { useEffect, useState } from "react";
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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RowSerial from "../../../../helpers/rowSerial";
import { setState } from "reducers/apiSlice";
import VacantPostsListFiltering from "./VacantPostsListFiltering";
import { SharedData } from "helpers/SharedData";

const VacantPostsList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortColumn: "",
    });

    const { type } = useSelector(selectToastAlert);

    const tableProps = {
        headers: [
            { id: "sl", label: "ক্রঃনঃ" },
            { id: "instituteName", label: "প্রতিষ্ঠানের নাম" },
            { id: "instituteType", label: "প্রতিষ্ঠানের ধরন" },
            {
                id: "jobRequisitionCircularTitle",
                label: "ই-রিকুইজিশন বিজ্ঞপ্তি",
            },
            { id: "eiinNo", label: "ই আই আই এন" },
            { id: "paymentStatus", label: "পেমেন্টের অবস্থা" },
            { id: "totalteachers", label: "অনুমোদনের অবস্থা" },
            { id: "totalteachers", label: "আবেদিত পদের সংখ্যা" },
            { id: "vanactpostsnumber", label: "মোট শূন্য পদের সংখ্যা" },
            { id: "Action", label: "অ্যাকশন" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `institute-job-requisition/admin/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "VacantPostList",
            storeName: "VacantPostList",
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
                        `institute-job-requisition/admin/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "VacantPostList",
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
    return (
        <DefaultCard title="আবেদিত পদের তালিকা">
            {loading && <ProgressBar />}
            <div
                className="row"
                style={{ marginTop: "50px", marginLeft: "12px" }}
            >
                <VacantPostsListFiltering
                    onSubmit={(values) => {
                        setCommonSearch({
                            ...commonSearch,
                            page: 1,
                            ...values,
                        });
                    }}
                />
            </div>
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
                                <span className="text-center">{index + 1}</span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.instituteNameBn ?? "N/A"}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.instituteTypeNameBn ?? "N/A"}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.jobRequisitionCircularTitle ?? "N/A"}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.eiinNo ?? "N/A"}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.paymentStatus ?? "N/A"}
                                </span>
                            </td>
                            {/* <td>
                                <span className="text-center">
                                    {row.divisionNameBn}
                                </span>
                            </td>

                            <td>
                                <span className="text-center">
                                    {row.districtNameBn}
                                </span>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.thanaNameBn}
                                </span>
                            </td> */}
                            <td>
                                <Button
                                    variant={
                                        row.currentApplicationStatus ===
                                        "APPROVED"
                                            ? "text-center btn btn-success"
                                            : row.currentApplicationStatus ===
                                              "UNDER_REVIEW"
                                            ? "text-center btn btn-warning"
                                            : "text-center btn btn-primary"
                                    }
                                >
                                    {row.currentApplicationStatus}
                                </Button>
                            </td>
                            <td>
                                <span className="text-center">
                                    {row.numberOfRequestedSeat ?? "N/A"}
                                </span>
                            </td>
                            {/* <td>
                                <span className="text-center">
                                    {row.totalemployees}
                                </span>
                            </td> */}
                            <td className="text-center">
                                <span className="text-center">
                                    {row.numberOfVacantSeat ?? "N/A"}
                                </span>
                            </td>
                            {/* <td className="text-center">
                                <span
                                    className={
                                        row.status === "Pending"
                                            ? "text-center btn btn-danger"
                                            : row.status === "Approved"
                                            ? "text-center btn btn-success"
                                            : ""
                                    }
                                >
                                    {row.status}
                                </span>
                            </td> */}
                            <td style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        justifyContent: "center",
                                        display: "flex",
                                    }}
                                >
                                    <CrudAction
                                        onShowClick={() =>
                                            history.push(
                                                `/portal/vacant-post/details/${row.id}`
                                            )
                                        }
                                        // onDeleteClick={() => onDeleteClick(row)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}

                {/* <tr>
                    <th colSpan={8}></th>
                    <th colSpan={3}>
                        <p
                            style={{
                                marginLeft: "12%",
                                marginTop: "5%",
                                fontWeight: "bold",
                            }}
                        >
                            Total = 10
                        </p>
                    </th>
                </tr> */}
            </BasicTable>
        </DefaultCard>
    );
};

export default VacantPostsList;
