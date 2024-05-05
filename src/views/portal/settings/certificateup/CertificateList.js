import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInfo,
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

const CertificateList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "সনদপত্রের তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/certificate/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> নতুন
                    সনদপত্র যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "batch", label: "ব্যাচ" },
            { id: "year", label: "পাসের সন" },
            { id: "roll", label: "রোল নম্বর" },
            { id: "reg", label: "রেজিস্ট্রেশন নম্বর" },
            { id: "subject", label: "বিষয়" },
            { id: "instituteType", label: "প্রতিষ্ঠানের ধরন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `#?page=${setPage.current}&size=${size}`
            ),
            output: "CertificateList",
            storeName: "CertificateList",
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
            batch: "12 তম",
            year: "2012",
            roll: "32561",
            reg: "54352763261",
            instituteType: "School",
            subject: "ICT",
        },
        {
            id: 2,
            batch: "16 তম",
            year: "2016",
            roll: "90812",
            reg: "58452563226",
            instituteType: "College",
            subject: "ICT",
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
                                            {row.batch}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.year}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.roll}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.reg}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.subject}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-center">
                                            {row.instituteType}
                                        </span>
                                    </td>
                                    {/* <td className="text-center">
                                    <Link to="/portal/choice/list">
                                        <Button className="bg-primary text-light" variant="link">
                                            <FontAwesomeIcon icon={faInfo} />{""}
                                        </Button>
                                    </Link> 
                                </td> */}
                                </tr>
                            )
                        )}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default CertificateList;
