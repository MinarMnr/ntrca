import {
    faPlus,
    faUserClock,
    faUserPlus,
    faUserTimes,
    faList,
    faCopy,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { BasicTable, BasicTableAction } from "../../components/table";
import useListApi from "../../../../hooks/useListApi";
import { callApi } from "../../../../reducers/apiSlice";
import { setDeleteModal } from "../../../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import ImagePdf from "../../../../assets/img/pdf_icon.png";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import CrudAction from "../../../../components/button/CrudAction";
import moment from "moment";
import { useRef } from "react";
import ViewAction from "../../../../components/button/ViewAction";
import { useParams } from "react-router";

const CircularList = () => {
    const [searchValue, setSearchValue] = useState("");

    /**
     * useHistory: navigation helper
     */
    const history = useHistory();

    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Put page and size into state
     */
    const [size, setSize] = useState(10);
    //const [page, setPage] = useState(1);

    const setPage = useRef(1);

    /**
     * Get updated 'type' value from toast alert's state.
     */
    const { type } = useSelector(selectToastAlert);
    const { status } = useParams();

    /**
     * cardProps must need to pass into DefaultCard comptwont.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        title: "Circular List",
        headerSlot: () => (
            <>
                <Link to="/scholarship-circular/add">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add
                        New Circular
                    </Button>
                </Link>
                {/* 
        <Link to="/scholarship-circular/clone">
          <Button
            variant="link"
            className="f-right btn-sm p-5 pr-5 mr-10 btn-color"
          >
            <FontAwesomeIcon icon={faCopy} className="me-2" /> Clone Circular
          </Button>
        </Link> */}
            </>
        ),
    };

    /**
     * tableProps must need to pass into BasicTable comptwont.
     * headers: used for showing table header dynamically.
     * perPage: used for controlling page size.
     * config: used for api call.
     * meta: contains pagination related data. [initially empty]
     *
     * @type {{headers: *[], perPage: number[], meta: {}, config: {output: string, operationId: string}}}
     */
    const tableProps = {
        headers: [
            { id: "id", label: "#" },
            { id: "scholarship", label: "Scholarship" },
            { id: "publishedDate", label: "Published Date" },
            { id: "effectiveDate", label: "Start Date" },
            { id: "expireDate", label: "End Date" },
            { id: "year", label: "Year" },
            { id: "", label: "Application Form" },
            { id: "recordStatus", label: "Status" },
            { id: "", label: "Total Applications" },
            { id: "", label: "Add New Circular" },
            { id: "action", label: "Actions" },
            { id: "status", label: "Application list status" },
        ],

        perPage: [10, 20, 30, 40, 50],
        config: {
            operationId: UrlBuilder.foreignApi(
                `scholarship-circular/list?page=${
                    setPage.current
                }&size=${size}&sortBy=id,desc&search=${searchValue}&recordStatus=${
                    status === ":status" || status == undefined ? "" : status
                }`
            ),

            output: "scholarshipCircular",
        },
        meta: {},
        totalData: 0,
    };

    /**
     * useListApi: get data for displaying on the table
     */
    const { loading, data, meta } = useListApi(tableProps.config);

    /**
     * Update tableProps's meta from api response
     */
    tableProps.meta = meta;
    tableProps.totalData = data.length;

    /**
     * Show delete modal and performing delete operation
     * by dispatching setDeleteModal. 'deleteApi' must need be passed.
     */
    const onDeleteClick = (data) => {
        dispatch(
            setDeleteModal({
                deleteApi: UrlBuilder.foreignApi(
                    `scholarship-circular/delete/${data.id}`
                ),
            })
        );
    };

    /**
     * Change the page on table and update the state.
     * Fetch data by dispatching callApi.
     */
    const onPageChange = (pageNo) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.foreignApi(
                    `scholarship-circular/list?page=${setPage.current}&size=${size}&sortBy=id,desc&search=${searchValue}`
                ),
                output: "scholarshipCircular",
            })
        );
    };

    /**
     * Change the page size on table and update the state.
     * Fetch data by dispatching callApi.
     */
    const onSizeChange = (pageSize) => {
        setSize(pageSize);
        setPage.current = 1;
        dispatch(
            callApi({
                operationId: UrlBuilder.foreignApi(
                    `scholarship-circular/list?page=${setPage.current}&size=${size}&sortBy=id,desc&search=${searchValue}`
                ),
                output: "scholarshipCircular",
            })
        );
    };

    /**
     * Receive the value from search box and update the state.
     * Fetch data by dispatching callApi.
     */
    const onSearchChange = (query) => {
        if (query !== "") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.foreignApi(
                        `scholarship-circular/list?page=1&size=${size}&sortBy=id,desc&search=${query}`
                    ),
                    output: "scholarshipCircular",
                })
            );
        }
    };

    /**
     * Refresh the table data after performing delete operation.
     * Fetch data by dispatching callApi.
     */
    useEffect(() => {
        if (type === "success") {
            dispatch(
                callApi({
                    operationId: UrlBuilder.foreignApi(
                        `scholarship-circular/list?page=${
                            setPage.current
                        }&size=${size}&sortBy=id,desc&search=${searchValue}&recordStatus=${
                            status === ":status" || status == undefined
                                ? ""
                                : status
                        }`
                    ),
                    output: "scholarshipCircular",
                })
            );
        }
    });

    const onSearchByValue = (val) => {
        setPage.current = 1;
        // if(val === ""){
        //   setPage.current = 1;
        //  }
        setSearchValue(val);

        // dispatch(
        //   callApi({
        //     operationId:
        //     (val === "" || val == undefined) ?
        //     UrlBuilder.foreignApi(
        //       `scholarship-circular/list?page=${setPage.current}&size=${size}`
        //     )
        //     :
        //     UrlBuilder.foreignApi(
        //       `scholarship-circular/search-global?page=${setPage.current}&size=${size}&search=${searchValue}`
        //     ),
        //     output: "scholarshipCircular",
        //   })
        // );
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            {loading && <ProgressBar />}
            <BasicTable
                {...tableProps}
                onSizeChange={(pageSize) => onSizeChange(pageSize)}
                onSearchChange={(query) => onSearchChange(query)}
                onSearch={(searchVal) => onSearchByValue(searchVal)}
                onPageChange={(pageNo) => {
                    setPage.current = pageNo;
                    onPageChange(pageNo);
                }}
            >
                {data !== undefined &&
                    JSON.parse(JSON.stringify(data)).map((row, rowIndex) => (
                        <tr key={rowIndex} className="width-w">
                            <td>
                                <span className="fw-normal">{row.id}</span>
                            </td>
                            <td>
                                <span className="fw-normal  d-block">
                                    {row.circularTitle}
                                </span>
                                <span className="fw-normal  d-block">
                                    Program: {row.scholarshipProgramName}
                                </span>
                                <span className="fw-normal  d-block">
                                    Session: {row.scholarshipSession}
                                </span>
                            </td>
                            <td>
                                <span className="fw-normal">
                                    {moment(row.publishedDate).format(
                                        "DD-MM-Y hh:mm A"
                                    )}
                                </span>
                            </td>

                            <td>
                                <span className="fw-normal">
                                    {moment(row.effectiveDate).format(
                                        "DD-MM-Y hh:mm A"
                                    )}
                                </span>
                            </td>
                            <td>
                                <span className="fw-normal">
                                    {moment(row.expiryDate).format(
                                        "DD-MM-Y hh:mm A"
                                    )}
                                </span>
                            </td>
                            <td>
                                <span className="fw-normal">{row.year}</span>
                            </td>
                            <td>
                                <span className="fw-normal">
                                    {row.scholarshipFormId == null ? (
                                        <a
                                            href={`create-circular-form/${row.id}`}
                                        >
                                            <Button className="m-1 btn btn-danger">
                                                Application Form
                                            </Button>
                                        </a>
                                    ) : (
                                        <a
                                            href={`create-circular-form/${row.id}`}
                                        >
                                            <Button className="m-1 apply btn btn-color">
                                                Application Form
                                            </Button>
                                        </a>
                                    )}
                                </span>
                            </td>
                            <td>
                                <span>{row.recordStatus}</span>
                            </td>
                            <td>
                                <span className="fw-normal">
                                    <a href={`applications-list/${row.id}`}>
                                        {/* <OverlayTrigger
                      trigger={["hover", "focus"]}
                      overlay={<Tooltip>
                        Total Apply : 200,
                        Accepted: 100,
                        Rejected: 100

                      </Tooltip>} 
                    >
                    </OverlayTrigger> */}
                                        <Button className="m-1 btn btn-color">
                                            {row.totalApp}
                                        </Button>
                                    </a>
                                </span>
                            </td>

                            <td>
                                <span className="fw-normal">
                                    {/* <a
                  href={`/scholarship-circular/clone`}
                  className="p-5"
                
                > */}
                                    <Button
                                        className="m-1 apply btn btn-color"
                                        onClick={() => {
                                            history.push(
                                                `/scholarship-circular/${row.id}/clone`
                                            );
                                            // dispatch(
                                            //   callApi({
                                            //     operationId: UrlBuilder.foreignApi(
                                            //       `scholarship-circular/find/${row.id}`
                                            //     ),
                                            //     output: "details",
                                            //     storeName: "circular",
                                            //   })
                                            // )
                                        }}
                                    >
                                        Clone Circular
                                    </Button>
                                    {/* </a> */}
                                </span>
                            </td>

                            <td className="text-center">
                                {/* <CrudAction
                  onShowClick={() =>
                    history.push(`/scholarship-circular/${row.id}`)
                  }
                  onEditClick={() =>
                    history.push(`/scholarship-circular/${row.id}/edit`)
                  }
                  onDeleteClick={() => onDeleteClick(row)}
                /> */}
                                <div style={{ display: "flex" }}>
                                    <ViewAction
                                        onShowClick={() =>
                                            history.push(
                                                `/scholarship-circular/${row.id}`
                                            )
                                        }
                                    />

                                    {row.recordStatus === "DRAFT" &&
                                        row.effectiveDate >
                                            moment(new Date()).format() && (
                                            <a
                                                href={`/scholarship-circular/${row.id}/edit`}
                                            >
                                                <Button
                                                    variant=""
                                                    className="me-2 btn-primary"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        title="Edit"
                                                    />
                                                </Button>
                                            </a>
                                        )}
                                </div>
                            </td>
                            <td className="text-center">
                                <a
                                    href={`/applicant-waiting-list/${row.id}`}
                                    className="p-5"
                                    title="Wating List"
                                >
                                    <FontAwesomeIcon
                                        icon={faUserClock}
                                        className="me-2 text-defult"
                                        title="Wating List"
                                    />
                                </a>
                                <a
                                    href={`/applicant-final-list/${row.id}`}
                                    className="p-5"
                                    title="Selected List"
                                >
                                    <FontAwesomeIcon
                                        icon={faUserPlus}
                                        className="me-2 text-success"
                                        title="Selected List"
                                    />
                                </a>
                                <a
                                    href={`/applicant-rejected-list/${row.id}`}
                                    className="p-5"
                                    title="Rejected List"
                                >
                                    <FontAwesomeIcon
                                        icon={faUserTimes}
                                        className="me-2 text-danger"
                                        title="Rejected List"
                                    />
                                </a>
                                {/* <ListsAction
                  onWatingClick={() =>
                    //history.push(`/applicant-waiting-list`)
                    "qq"
                  }
                  onSelectedClick={() => history.push(`/applicant-final-list/${row.id}`)}
                  onRejectedClick={() => history.push(`/applicant-rejected-list/${row.id}`)}
                /> */}

                                {/* <BasicTableStatusAction
                  onWatingClick={() =>
                    history.push(`/applicant-waiting-list/${row.id}`)
                  }
                  onSelectedClick={() =>
                  history.push(`/applicant-final-list`)
                }
                onRejectedClick={() =>
                  history.push(`/`)
                }

                /> */}
                            </td>
                        </tr>
                    ))}
            </BasicTable>
        </DefaultCard>
    );
};

export default CircularList;
