import { useRef, useState, useEffect } from "react";
import {
    faList,
    faPlus,
    faFileAlt,
    faSave,
    faChevronUp,
    faChevronDown,
    faTrashAlt,
    faIdCard,
    faArrowUp,
    faArrowDown,
    faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { BasicTable } from "../../../../components/table";
import RowSerial from "../../../../helpers/rowSerial";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { callApi } from "../../../../reducers/apiSlice";
import {
    selectToastAlert,
    setToastAlert,
} from "../../../../reducers/toastAlertSlice";
// import ErequisitionCircularListFiltering from "./ErequisitionCircularListFiltering";
import { SharedData } from "helpers/SharedData";
import moment from "moment";
import { Form } from "formik/dist/index";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthUser } from "helpers/AuthUser";

const AllInstituteList = ({
    values,
    setFieldValue,
    circularId,
    maxInstituteToChoose,
    ...props
}) => {
    /**
     * useHistory: navigation helper
     */
    const history = useHistory();
    var nid = AuthUser.getUserName();

    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    const [selctedInstitute, setSelctedInstitute] = useState(
        values?.preferredInstituteList
    );

    /**
     * Put page and size into state
     */

    const [commonSearch, setCommonSearch] = useState({
        page: 1,
        size: 10,
        search: "",
        sortColumn: "",
        nid: nid,
        applicationCircularId: circularId,
    });

    /**
     * Get updated 'type' value from toast alert's state.
     */
    const { type } = useSelector(selectToastAlert);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */

    const cardProps = {
        title: "শূন্য পদের প্রতিষ্ঠানের তালিকা",
    };

    const tableProps = {
        headers: [
            { id: "id", label: "ক্রঃ নঃ." },
            { id: "instituteNameBn", label: "প্রতিষ্ঠানের নাম" },
            { id: "instituteTypeNameBn", label: "প্রতিষ্ঠানের ধরন" },
            { id: "eiinNo", label: "ই আই আই এন" },
            { id: "subjectNameBn", label: "বিষয়" },
            { id: "designationName", label: "পদবি" },
            { id: "jobType", label: "পদের ধরন" },
            { id: "quotaNameBn", label: "কোঠার ধরন" },
            { id: "mobile", label: "ফোন" },
            { id: "divisionNameBn", label: "বিভাগ" },
            { id: "districtNameBn", label: "জেলা" },
            { id: "thanaNameBn", label: "উপজেলা" },
            { id: "address", label: "ঠিকানা" },
            { id: "action", label: "অ্যাকশন" },
        ],
        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.ntrcaApi(
                `institute-job-requisition/job-application/list?${new URLSearchParams(
                    SharedData.cleanObject(commonSearch)
                )}`
            ),
            output: "allInstituteList",
        },
        meta: {},
    };

    /**
     * useListApi: get data for displaying on the table
     */
    const { loading, data, meta } = useListApi(tableProps.config);

    /**
     * Update tableProps's meta from api response
     */
    tableProps.meta = meta;
    tableProps.totalData = data && data.length;

    // const [tableData, setTableData] = useState(data);

    useEffect(() => {
        setSelctedInstitute(values?.preferredInstituteList);
    }, [values?.preferredInstituteList]);

    /**
     * Change the page on table and update the state.
     * Fetch data by dispatching callApi.
     */
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

    const isDisabled = (row) => {
        // if (row?.wasChosen == 1) {
        //     return true;
        // }
        let dup = false;
        values?.preferredInstituteList?.map((item, index) => {
            if (
                row?.instituteId == item?.instituteId &&
                row?.jobType == item?.jobType &&
                row?.subjectId == item?.subjectId &&
                row?.requisitionId == item?.requisitionId &&
                row?.quotaId == item?.quotaId
            ) {
                dup = true;
            }
        });
        return dup;
    };

    const addInstitute = (row, index) => {
        let newFields = [...selctedInstitute];

        // var newTableData = [...data];

        // const newState = newTableData.map((obj, i) =>
        //     i == index ? { ...obj, ...obj.wasChosen, wasChosen: 0 } : obj
        // );

        // setTableData(newTableData);
        let dup = false;
        values?.preferredInstituteList?.map((item, index) => {
            if (
                row?.instituteId == item?.instituteId &&
                row?.jobType == item?.jobType &&
                row?.subjectId == item?.subjectId &&
                row?.requisitionId == item?.requisitionId &&
                row?.quotaId == item?.quotaId
            ) {
                dup = true;
            }
        });
        if (dup == true) {
            dispatch(
                setToastAlert({
                    type: "warn",
                    message: "Institute already Added",
                })
            );
        } else {
            newFields.push({
                instituteId: row?.instituteId,
                instituteNameBn: row?.instituteNameBn,
                designationId: row?.designationId,
                instituteTypeNameBn: row?.instituteTypeNameBn,
                eiinNo: row?.eiinNo,

                subjectNameBn: row?.subjectNameBn,
                designationName: row?.designationName,

                orderIndex: newFields.length
                    ? newFields[newFields.length - 1].orderIndex + 1
                    : 0,
                jobType: row?.jobType,
                requisitionId: row?.requisitionId,
                subjectId: row?.subjectId,
                quotaId: row?.quotaId,
                levelId: row?.levelId,
                wasChosen: 1,
            });

            setSelctedInstitute(newFields);

            setFieldValue("preferredInstituteList", newFields);

            dispatch(
                setToastAlert({
                    type: "info",
                    message: "Institute Added Successfully",
                })
            );
        }
    };

    const removeInstitute = (row, index) => {
        let newFields = [...selctedInstitute];
        // var newTableData = [...tableData];

        // const newState = newTableData.map((obj, i) =>
        //     i == index ? { ...obj, ...obj.wasChosen, wasChosen: 0 } : obj
        // );
        // setTableData(newState);

        newFields.splice(index, 1);

        setSelctedInstitute(newFields);

        setFieldValue("preferredInstituteList", newFields);
        dispatch(
            setToastAlert({
                type: "warn",
                message: "Institute Removed Successfully",
            })
        );
    };

    const arraymove = (arr, fromIndex, toIndex) => {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);

        values?.preferredInstituteList.map((obj, i) => {
            obj["orderIndex"] = i + 1;
        });

        setSelctedInstitute([...values?.preferredInstituteList]);

        setFieldValue("preferredInstituteList", arr);
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
                        `institute-job-requisition/job-application/list?${new URLSearchParams(
                            SharedData.cleanObject(commonSearch)
                        )}`
                    ),
                    output: "allInstituteList",
                })
            );
        }
    });

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        };

        const items = reorder(
            selctedInstitute,
            result.source.index,
            result.destination.index
        );

        setSelctedInstitute([...items]);

        items.map((obj, i) => {
            obj["orderIndex"] = i + 1;
        });

        setFieldValue("preferredInstituteList", items);
    }

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver && "#eaedf2",
        padding: "15px",
    });
    const getItemStyle = (isDragging, draggableStyle) => ({
        ...draggableStyle,
        userSelect: "none",
        position: "static",
        padding: "15px",
        //margin: "5px",
        background: isDragging ? "#b2dfdb94" : "white",
        border: "1px solid #eaedf2",
    });

    return (
        <>
            <Row>
                <Col md={12}>
                    <DefaultCard {...cardProps} className="mb-50">
                        {loading && <ProgressBar />}
                        {/* <ErequisitionCircularListFiltering
                    onSubmit={(value) => {
                  
                    }}
                /> */}
                        <BasicTable
                            {...tableProps}
                            onSizeChange={(pageSize) => onSizeChange(pageSize)}
                            onSearchChange={(query) => onSearchChange(query)}
                            onPageChange={(pageNo) => onPageChange(pageNo)}
                            onSearchByValue={(sval) => onSearchByValue(sval)}
                        >
                            {data !== undefined &&
                                data?.length > 0 &&
                                data.map((row, index) => (
                                    <tr key={index + row}>
                                        <td>
                                            <span>
                                                {RowSerial(meta, index)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row?.instituteNameBn ??
                                                    row?.mobile}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="text-center">
                                                {row?.instituteTypeNameBn ??
                                                    row?.instituteTypeName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row?.eiinNo}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row?.subjectNameBn ??
                                                    row?.subjectName}
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
                                                {row?.jobType}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-center">
                                                {row?.quotaNameBn ??
                                                    row?.quotaName}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="text-center">
                                                {row?.mobile}
                                            </span>
                                        </td>
                                        <td>
                                            <>{row?.divisionNameBn}</>
                                        </td>
                                        <td>
                                            <>{row?.districtNameBn}</>
                                        </td>
                                        <td>
                                            <>{row?.thanaNameBn}</>
                                        </td>

                                        <td>
                                            <>{row?.address}</>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    addInstitute(row, index)
                                                }
                                                disabled={isDisabled(row)}
                                            >
                                                {/* {tableData[index]?.wasChosen == 1
                                            ? "ADDED"
                                            : "ADD"} */}
                                                ADD
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </BasicTable>
                    </DefaultCard>
                </Col>

                <Row className=" justify-content-center">
                    <Col md={10}>
                        <Card className="mt-40 p-5">
                            <div className="header-color pt-8 text-light text-center">
                                <h3
                                    className=""
                                    style={{ display: "flow-root" }}
                                >
                                    <span className="float-start  p-20">
                                        নির্বাচিত প্রতিষ্ঠানের সংখ্যা (
                                        {selctedInstitute?.length > 0
                                            ? selctedInstitute?.length
                                            : 0}
                                        )
                                    </span>
                                    <span className="float-end  p-20">
                                        শিক্ষা প্রতিষ্ঠান Choice(পছন্দের)
                                        সর্বোচ্চ সংখ্যা ({maxInstituteToChoose})
                                    </span>
                                </h3>
                            </div>
                            <>
                                <Card.Body>
                                    <Row>
                                        <div className="table-responsive">
                                            <div className="">
                                                {selctedInstitute?.length >
                                                    0 && (
                                                    <>
                                                        <DragDropContext
                                                            onDragEnd={
                                                                onDragEnd
                                                            }
                                                        >
                                                            <Droppable droppableId="droppable">
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <div
                                                                        {...provided.droppableProps}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        style={getListStyle(
                                                                            snapshot.isDraggingOver
                                                                        )}
                                                                    >
                                                                        {selctedInstitute.map(
                                                                            (
                                                                                row,
                                                                                index
                                                                            ) => (
                                                                                <Draggable
                                                                                    key={
                                                                                        row?.instituteId +
                                                                                        row?.jobType +
                                                                                        row?.subjectId +
                                                                                        row?.requisitionId +
                                                                                        row?.quotaId
                                                                                    }
                                                                                    draggableId={
                                                                                        row?.instituteId +
                                                                                        row?.jobType +
                                                                                        row?.subjectId +
                                                                                        row?.requisitionId +
                                                                                        row?.quotaId
                                                                                    }
                                                                                    index={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {(
                                                                                        provided,
                                                                                        snapshot
                                                                                    ) => (
                                                                                        <div
                                                                                            ref={
                                                                                                provided.innerRef
                                                                                            }
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            style={getItemStyle(
                                                                                                snapshot.isDragging,
                                                                                                provided
                                                                                                    .draggableProps
                                                                                                    .style
                                                                                            )}
                                                                                        >
                                                                                            <>
                                                                                                <div className="divbg">
                                                                                                    <Row>
                                                                                                        <div className="col-lg-1 col-2 p-0  justify-content-center m-auto">
                                                                                                            <div className="">
                                                                                                                <p className="p-bgcolor">
                                                                                                                    {" "}
                                                                                                                    <span>
                                                                                                                        {index +
                                                                                                                            1}
                                                                                                                    </span>
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-11 col-10 p-0">
                                                                                                            <Row>
                                                                                                                <div className="col-lg-10 col-10">
                                                                                                                    <div className="row">
                                                                                                                        <div className="col-lg-12">
                                                                                                                            <h5 class="text-primary m-b-5 tx-14">
                                                                                                                                {" "}
                                                                                                                                {
                                                                                                                                    row?.designationName
                                                                                                                                }{" "}
                                                                                                                                ,{" "}
                                                                                                                                <span>
                                                                                                                                    {" "}
                                                                                                                                    {
                                                                                                                                        row?.instituteTypeNameBn
                                                                                                                                    }
                                                                                                                                </span>
                                                                                                                            </h5>
                                                                                                                        </div>
                                                                                                                        <div className="col-lg-12">
                                                                                                                            <h6>
                                                                                                                                {" "}
                                                                                                                                {
                                                                                                                                    row?.instituteNameBn
                                                                                                                                }
                                                                                                                                <span>
                                                                                                                                    {" "}
                                                                                                                                    (
                                                                                                                                    {
                                                                                                                                        row?.eiinNo
                                                                                                                                    }

                                                                                                                                    )
                                                                                                                                </span>
                                                                                                                            </h6>
                                                                                                                        </div>
                                                                                                                        <div className="col-lg-12">
                                                                                                                            <FontAwesomeIcon
                                                                                                                                icon={
                                                                                                                                    faIdCard
                                                                                                                                }
                                                                                                                            />
                                                                                                                            <span>
                                                                                                                                {" "}
                                                                                                                                {
                                                                                                                                    row?.jobType
                                                                                                                                }
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="col-lg-2 col-2">
                                                                                                                    <div className=" float-end">
                                                                                                                        {index !=
                                                                                                                            0 && (
                                                                                                                            <button
                                                                                                                                className="d-block bg-success btn text-white mr-5 p-5 m-5"
                                                                                                                                // variant="link"
                                                                                                                                onClick={() =>
                                                                                                                                    arraymove(
                                                                                                                                        values?.preferredInstituteList,
                                                                                                                                        index,
                                                                                                                                        index -
                                                                                                                                            1
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <FontAwesomeIcon
                                                                                                                                    icon={
                                                                                                                                        faArrowUp
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </button>
                                                                                                                        )}

                                                                                                                        <button
                                                                                                                            className="d-block bg-danger btn text-white mr-5 p-5 m-5"
                                                                                                                            // variant="link"
                                                                                                                            onClick={() =>
                                                                                                                                removeInstitute(
                                                                                                                                    row,
                                                                                                                                    index
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <FontAwesomeIcon
                                                                                                                                icon={
                                                                                                                                    faTrashAlt
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </button>

                                                                                                                        {index !=
                                                                                                                            selctedInstitute?.length -
                                                                                                                                1 && (
                                                                                                                            <button
                                                                                                                                className="d-block bg-warning  btn text-white mr-5 p-5 m-5"
                                                                                                                                // variant="link"
                                                                                                                                onClick={() =>
                                                                                                                                    arraymove(
                                                                                                                                        values?.preferredInstituteList,
                                                                                                                                        index,
                                                                                                                                        index +
                                                                                                                                            1
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <FontAwesomeIcon
                                                                                                                                    icon={
                                                                                                                                        faArrowDown
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </button>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Row>
                                                                                                        </div>
                                                                                                    </Row>
                                                                                                </div>
                                                                                            </>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            )
                                                                        )}
                                                                        {
                                                                            provided.placeholder
                                                                        }
                                                                    </div>
                                                                )}
                                                            </Droppable>
                                                        </DragDropContext>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Row>
                                </Card.Body>
                            </>
                        </Card>
                    </Col>
                </Row>

                <Form>
                    <Col md={12} className="mb-10 mt-10">
                        <Link
                            to={`/portal/ntrca-application/apply/${circularId}`}
                        >
                            <Button variant="" className="btn-warning">
                                <FontAwesomeIcon
                                    icon={faBackward}
                                    className="me-2"
                                />{" "}
                                পূর্ববর্তী
                            </Button>
                        </Link>

                        <Button
                            variant=""
                            className="f-right btn-primary"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                            পরবর্তী
                        </Button>
                    </Col>
                </Form>
            </Row>
        </>
    );
};

export default AllInstituteList;
