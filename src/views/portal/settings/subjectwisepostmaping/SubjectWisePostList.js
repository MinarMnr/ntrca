import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
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
import { FieldArray, Field } from "formik/dist/index";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SharedData } from "helpers/SharedData";
import { useEffect } from "react";
import SubjectWisePostFilter from "./SubjectWisePostFilter";

const SubjectWisePostList = () => {
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
        title: "বিষয়ভিত্তিক পদের তালিকা",
        headerSlot: () => (
            <Link to="/portal/settings/Subject-Wise-Post-Add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    নতুন বিষয়ভিত্তিক পদ যোগ করুন
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ" },
            { id: "Post", label: "পদবি" },
            { id: "OrgLevel", label: "প্রতিষ্ঠানের স্তর" },
            { id: "SubjectWisePostName", label: "বিষয়ের নাম" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `institute-level-designation-wise-subject/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "subjectWisePostList",
            storeName: "subjectWisePostList",
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
                        `institute-level-designation-wise-subject/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "subjectWisePostList",
                })
            );
        }
    });

    // const onDeleteClick = (data) => {

    //     dispatch(
    //         setDeleteModal({
    //             deleteApi: UrlBuilder.ntrcaApi(
    //                 `institute-level-designation-wise-subject/delete?levelId=${data.levelId}&designationId=${data.designationId}&subjectId=${data.subjectId}`
    //             ),
    //             method: "DELETE",
    //             output: "DeletResponse",
    //             storeName: "DeleteResponse",
    //         })
    //     );
    // };

    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.ntrcaApi(
                    `institute-level-designation-wise-subject/delete?levelId=${data.levelId}&designationId=${data.designationId}&subjectId=${data.subjectId}`
                ),
                method: "DELETE",
                output: "DeletResponse",
                storeName: "DeleteResponse",
            })
        )
            .then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 100); // Adjust the delay as needed
            })
            .catch((error) => {});
    };

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}
                <div
                className="row"
                style={{ marginTop: "50px", marginLeft: "12px" }}
            >
                <SubjectWisePostFilter
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
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.designationNameBn}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.levelNameBn}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.subjectNameBn}
                                    </span>
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <CrudAction
                                            // onEditClick={() =>
                                            //     history.push(
                                            //         `/portal/settings/Subject-Wise-Post-Edit/${row.levelId}/${row.designationId}/edit`
                                            //     )
                                            // }
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

export default SubjectWisePostList;
