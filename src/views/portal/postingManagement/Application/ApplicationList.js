import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInfo,
    faList,
    faEye,
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import CrudAction from "../../../../components/button/CrudAction";
import { DefaultCard, Card } from "../../../../components/card";
import { BasicTable } from "../../../../components/table";
import RowSerial from "../../../../helpers/rowSerial";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
//import { callApi } from "../../../../reducers/apiSlice";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { Formik, Form } from "formik/dist/index";
import { InputSelect, InputField } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const ApplicationList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState();

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "আবেদনের তালিকা",
        // headerSlot: () => (
        //     <>
        //         <Link to="/portal/application/add">
        //             <Button
        //                 variant="link"
        //                 className="f-right btn-sm p-5 btn-color"
        //             >
        //                 <FontAwesomeIcon icon={faList} className="me-2" />
        //                 আবেদন করুন
        //             </Button>
        //         </Link>
        //     </>
        // ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "circularName", label: "বিজ্ঞপ্তির নাম" },
            { id: "postName", label: "পদের ধরন" },
            { id: "applyDate", label: "আবেদনের তারিখ" },
            { id: "instituteType", label: "প্রতিষ্ঠানের ধরন" },
            { id: "mpoORnon", label: "এমপিও / নন-এমপিও" },
            { id: "paymentStatus", label: "পেমেন্ট স্ট্যাটাস" },
            { id: "action", label: "Action" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `#?page=${setPage.current}&size=${size}`
            ),
            output: "ApplicationList",
            storeName: "ApplicationList",
        },
        meta: {},
        totalData: 0,
    };

    const { loading, data, meta } = useListApi(tableProps.config);

    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.ntrcaApi(`#/${data.id}`),
                method: "PUT",
                output: "DeletResponse",
                storeName: "DeleteResponse",
            })
        );
    };

    let initialdata = {
        circularName: 1,
        paymentStatus: 1,
        applyDate: "16/02/2022",
    };

    const demoData = [
        {
            id: 1,
            circularName: "বিশেষ গণবিজ্ঞপ্তি ২০২২",
            postName: "সহঃ শিক্ষক",
            applyDate: "16/02/2022",
            paymentStatus: "Paid",
            instituteType: "School",
            mpoORnon: "MPO",
        },
        {
            id: 2,
            circularName: "বিশেষ গণবিজ্ঞপ্তি ২০২৩",
            postName: "প্রভাষক",
            applyDate: "05/01/2023",
            paymentStatus: "Unpaid",
            instituteType: "College",
            mpoORnon: "MPO",
        },
    ];
    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {/* {loading && <ProgressBar />} */}
                <BasicTable
                    {...tableProps}
                    onSizeChange={(pageSize) => onSizeChange(pageSize)}
                    onPageChange={(pageNo) => {
                        setPage.current = pageNo;
                        onPageChange(pageNo);
                    }}
                    onSearch={(searchVal) => onSearchByValue(searchVal)}
                >
                    {demoData !== undefined &&
                        JSON.parse(JSON.stringify(demoData)).map(
                            (row, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{RowSerial(meta, index)}</span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.circularName}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.postName}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.applyDate}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-center">
                                            {row.instituteType}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.mpoORnon}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span
                                            className={
                                                row.paymentStatus === "Paid"
                                                    ? "bg-success  p-5 pl-10 pr-10 text-light btn fw-bold"
                                                    : row.paymentStatus ===
                                                      "Unpaid"
                                                    ? "bg-danger  p-5 pl-10 pr-10 text-white btn fw-bold"
                                                    : ""
                                            }
                                        >
                                            {row.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <Link
                                            to="/portal/choice/list"
                                            className="mr-5"
                                        >
                                            <Button
                                                className="bg-primary text-light"
                                                variant="link"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                {""}
                                            </Button>
                                        </Link>
                                        {/* <Link
                                            to="/portal/settings/police-verification"
                                            className="ml-5"
                                        >
                                            <Button
                                                className="bg-primary text-light"
                                                variant="link"
                                            >
                                                পুলিশ ভেরিফিকেশন
                                            </Button>
                                        </Link> */}
                                    </td>
                                </tr>
                            )
                        )}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default ApplicationList;
