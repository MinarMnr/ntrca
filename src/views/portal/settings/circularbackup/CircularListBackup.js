import {
  faPlus,
  faUserClock,
  faUserPlus,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../components/card";
import { BasicTable, BasicTableAction } from "../../components/table";
import useListApi from "../../hooks/useListApi";
import { callApi } from "../../reducers/apiSlice";
import { setDeleteModal } from "../../reducers/deleteModalSlice";
import { selectToastAlert } from "../../reducers/toastAlertSlice";
import ImagePdf from "../../assets/img/pdf_icon.png";
import { UrlBuilder } from "../../helpers/UrlBuilder";
import CrudAction from "../../components/button/CrudAction";
import moment from "moment";
import { useRef } from "react";

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
          <Button variant="link" className="f-right btn-sm btn-color">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Circular
          </Button>
        </Link>
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
      { id: "publishedDate", label: "published Date" },
      { id: "expireDate", label: "Expire Date" },
      { id: "effectiveDate", label: "Effective Date" },
      { id: "year", label: "Year" },
      { id: "", label: "Application Form" },
      { id: "", label: "Applications" },
      { id: "action", label: "Actions" },
      { id: "status", label: "Application list status" },
    ],
    perPage: [10, 20, 30, 40, 50],
    config: {
      operationId: UrlBuilder.foreignApi(
        `scholarship-circular/list?page=${setPage.current}&size=${size}`
      ),
      output: "scholarshipCircular",
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
          `scholarship-circular/list?page=${pageNo}&size=${size}`
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
    dispatch(
      callApi({
        operationId: UrlBuilder.foreignApi(
          `scholarship-circular/list?page=${setPage.current}&size=${pageSize}`
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
    if(query!==""){
      dispatch(
        callApi({
          operationId: UrlBuilder.foreignApi(
            `scholarship-circular/search?page=${setPage.current}&size=${size}&search=${query}`
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
      dispatch(
        callApi({
          operationId: UrlBuilder.foreignApi(
            `scholarship-circular/list?page=${setPage.current}&size=${size}`
          ),
          output: "scholarshipCircular",
        })
      );
  },[type]);

  const onSearchByValue = (searchVal) => {
    dispatch(
      callApi({
        operationId: UrlBuilder.foreignApi(
          `scholarship-circular/search?page=${setPage.current}&size=${size}&search=${searchVal}`
        ),
        output: "scholarshipCircular",
      })
    );
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
                <span className="fw-normal  d-block">{row.circularTitle}</span>
                <span className="fw-normal  d-block">
                  Program: {row.scholarshipProgram}
                </span>
                <span className="fw-normal  d-block">
                  Session: {row.scholarshipSession}
                </span>
              </td>
              <td>
                <span className="fw-normal">
                  {moment(row.publishedDate).format("DD-MM-Y")}
                </span>
              </td>
              <td>
                <span className="fw-normal">
                  {moment(row.expiryDate).format("DD-MM-Y")}
                </span>
              </td>

              <td>
                <span className="fw-normal">
                  {moment(row.effectiveDate).format("DD-MM-Y")}
                </span>
              </td>
              <td>
                <span className="fw-normal">{row.year}</span>
              </td>
              <td>
                <span className="fw-normal">
                  <a href={`create-circular-form/${row.id}`}>
                    <Button className="m-1 apply btn btn-color">
                      Application Form
                    </Button>
                  </a>
                </span>
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
                    <Button className="m-1 btn btn-color">Applications</Button>
                  </a>
                </span>
              </td>
              <td>
                <CrudAction
                  onShowClick={() =>
                    history.push(`/scholarship-circular/${row.id}`)
                  }
                  onEditClick={() =>
                    history.push(`/scholarship-circular/${row.id}/edit`)
                  }
                  onDeleteClick={() => onDeleteClick(row)}
                />
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
