import React from "react";
import {
    faList,
    faPlus,
    faEye,
    faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import { useRef, useState } from "react";
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
import { AuthUser } from "helpers/AuthUser";
import moment from "moment";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import { SharedData } from "helpers/SharedData";

const CircularList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortColumn: "",
    });

    const { type } = useSelector(selectToastAlert);
    const roles = AuthUser.getRoles();

    const cardProps = {
        title: "গণ বিজ্ঞপ্তির তালিকা",
        headerSlot: () =>
            roles[1] === "admin" && (
                <Link to="/portal/circular/add">
                    <Button variant="link" className="f-right btn-sm btn-color">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন
                        গণ বিজ্ঞপ্তি প্রকাশ করুন
                    </Button>
                </Link>
            ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "circularTitle", label: "বিজ্ঞপ্তির নাম" },
            { id: "circularPublishedDate", label: "প্রকাশের তারিখ" },
            { id: "circularEffectiveDate", label: "কার্যকর তারিখ" },
            { id: "circularExpiredDate", label: "মেয়াদ শেষ হবার তারিখ" },

            { id: "instituteType", label: "বয়সের সর্বশেষ সীমা" },
            { id: "applicationFee", label: "আবেদন ফী" },
            // { id: "mponNonmpo", label: "এমপিও/নন-এমপিও" },
            // { id: "apply", label: "Apply" },

            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `job-application-circular/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "CircularList",
            storeName: "CircularList",
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
                        `job-application-circular/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "CircularList",
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

    const dataDemo = [
        {
            circularTitle: "বিশেষ গণবিজ্ঞপ্তি ২০২২",
            publishedDate: "০৬/০২/২০২২",
            expireDate: "১৬/০৩/২০২২",
            effectiveDate: "১৬/০৬/২০২২",
            instituteType: "স্কুল, কলেজ, মাদ্রাসা, টেকনিক্যাল",
            applicationFee: "১০০০",
            mponNonmpo: "এমপিও;নন-এমপিও",
        },
        {
            circularTitle: "বিশেষ গণবিজ্ঞপ্তি ২০২১",
            publishedDate: "০৫/০৩/২০২১",
            expireDate: "০৩/০৭/২০২১",
            effectiveDate: "০৯/০৯/২০২১",
            instituteType: "স্কুল, কলেজ, মাদ্রাসা, টেকনিক্যাল",
            applicationFee: "১০০০",
            mponNonmpo: "এমপিও, নন-এমপিও",
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
                                        {row.circularTitle}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row.circularPublishDate).format(
                                            "DD-MM-YYYY h:mm:ss a"
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(
                                            row.circularEffectiveDate
                                        ).format("DD-MM-YYYY h:mm:ss a")}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {moment(row.circularExpiryDate).format(
                                            "DD-MM-YYYY h:mm:ss a"
                                        )}
                                    </span>
                                </td>

                                <td>
                                    <span className="text-center">
                                        {row.ageLimitTo}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.applicationFee}
                                    </span>
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CrudAction
                                            onEditClick={() =>
                                                history.push(
                                                    `/portal/circular/${row.id}/edit`
                                                )
                                            }
                                            onShowClick={() =>
                                                history.push(
                                                    `/portal/circular/${row.id}/show`
                                                )
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

export default CircularList;
