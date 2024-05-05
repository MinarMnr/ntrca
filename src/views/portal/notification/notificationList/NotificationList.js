import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { selectToastAlert } from "../../../../reducers/toastAlertSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import useListApi from "../../../../hooks/useListApi";
import { BasicTable } from "../../../../components/table";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";
import { AuthUser } from "../../../../helpers/AuthUser";
import RowSerial from "../../../../helpers/rowSerial";
import UserRole from "constants/UserRole";
import NotificationFilter from "./NotificationFilter";
import { SharedData } from "helpers/SharedData";

const NotificationList = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [size, setSize] = useState(10);

  const setPage = useRef(1);

  const [searchValue, setSearchValue] = useState("");

  const { type } = useSelector(selectToastAlert);
  const [check, setCheck] = useState(0);
  const [view, setView] = useState("NOT VIEWED");

  const [commonSearch, setCommonSearch] = useState({
    page: 1,
    size: 10,
    search: "",
  });

  const cardProps = {
    title: "Notification List",
    // headerSlot: () => (
    //     <Link to="/portal/settings/circular/add">
    //         <Button variant="link" className="f-right btn-sm btn-color">
    //             <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New
    //             Circular
    //         </Button>
    //     </Link>
    // ),
  };

  const tableProps = {
    headers: [
      { id: "id", label: "SL." },
      { id: "actionName", label: "Name" },
      { id: "actionName", label: "Name of the instituttion" },
      { id: "notificationEventMessage", label: "Notification Message" },
      { id: "notificationEventMessageBn", label: " Date & Time" },
      { id: "read", label: "Viewed" },
    ],
    perPage: [10, 25, 50, 100],
    config: {
      operationId: UrlBuilder.notificationClientApi(
        `notification-event/notifications/${AuthUser.getUserId()}?${new URLSearchParams(SharedData.cleanObject(commonSearch))}&appModuleId=13`
      ),
      output: "NotificationList",
      storeName: "NotificationList",
    },
    meta: {},
    totalData: 0,
  };
  const [routeConnect, setRouteConnect] = useState(false);
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
      search: value,
    });
  };

  // const onPageChange = (pageNo) => {
  //   dispatch(
  //     callApi({
  //       operationId: UrlBuilder.notificationClientApi(
  //         `notification-event/notifications/${AuthUser.getUserId()}?page=${
  //           setPage.current
  //         }&size=${size}`
  //       ),

  //       output: "NotificationList",
  //     })
  //   );
  // };

  /**
   * Change the page size on table and update the state.
   * Fetch data by dispatching callApi.
   */
  // const onSizeChange = (pageSize) => {
  //   setSize(pageSize);
  //   dispatch(
  //     callApi({
  //       operationId: UrlBuilder.notificationClientApi(
  //         `notification-event/notifications/${AuthUser.getUserId()}?page=${
  //           setPage.current
  //         }&size=${size}`
  //       ),

  //       output: "NotificationList",
  //     })
  //   );
  // };

  // const onSearchByValue = (val) => {
  //     setSearchValue(val);
  //     setPage.current = 1;
  //     dispatch(
  //         callApi({
  //             operationId:
  //                 val === ""
  //                     ? UrlBuilder.notificationClientApi(
  //                           `circular/list?page=${
  //                               setPage.current
  //                           }&size=${size}&instituteId=${AuthUser.getUserInstituteID()}`
  //                       )
  //                     : UrlBuilder.notificationClientApi(
  //                           `circular/list?page=${
  //                               setPage.current
  //                           }&size=${size}&search=${val}&instituteId=${AuthUser.getUserInstituteID()}`
  //                       ),
  //             output: "NotificationList",
  //         })
  //     );
  // };

  const { loading, data, meta } = useListApi(tableProps.config);

  tableProps.meta = meta;
  tableProps.totalData = data && data.length;
  const { notificationUpdate } = useSelector(selectApi);

  // if (notificationUpdate && notificationUpdate.status == "success") {
  //   location.reload();
  // }

  const redirect = (actionName, actionRequestId) => {
    if (routeConnect == true) {
      if (actionName == "INSTITUTE_APPLICATION_FINAL_SUBMIT") {
        history.push(
          `/portal/review-institute-application/pending/${actionRequestId}`
        );
      } else if (actionName == "INSTITUTE_APPLICATION_REVIEW_FORWARD") {
        history.push(
          `/portal/review-institute-application/pending/${actionRequestId}`
        );
      } else if (actionName == "INSTITUTE_APPLICATION_REVIEW_BACKWARD") {
        history.push(
          `/portal/review-institute-application/pending/${actionRequestId}`
        );
      } else if (actionName == "INSTITUTE_APPLICATION_REJECTED") {
        history.push(`/portal/review-institute-application/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_APPLICATION_APPROVED") {
        if (AuthUser.getRoles().includes(UserRole.APPLICANT)) {
          history.push(
            `/portal/review-institute-application/submitted/${actionRequestId}`
          );
        } else {
          history.push(
            `/portal/review-institute-application/pending/${actionRequestId}`
          );
        }
      } else if (actionName == "INSTITUTE_APPLICATION_BACK_TO_APPLICANT") {
        if (AuthUser.getRoles().includes(UserRole.APPLICANT)) {
          history.push(
            `/portal/institute-application/draft/${actionRequestId}`
          );
        } else {
          history.push(
            `/portal/review-institute-application/pending/${actionRequestId}`
          );
        }
      } else if (actionName == "INSTITUTE_USER_REGISTRATION") {
        history.push(`/portal/review-institute-user/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_USER_REVIEW_FORWARD") {
        history.push(`/portal/review-institute-user/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_USER_REVIEW_BACKWARD") {
        history.push(`/portal/review-institute-user/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_USER_APPROVED") {
        let checkUser = AuthUser.getRoles().includes(UserRole.APPLICANT);
        if (checkUser) {
          history.push(`/portal/dashboard`);
        } else {
          history.push(`/portal/review-institute-user/${actionRequestId}`);
        }
      } else if (actionName == "INSTITUTE_USER_REJECTED") {
        history.push(`/portal/review-institute-user/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_LEVEL_MIGRATION_SUBMIT") {
        history.push(`/portal/review-migration-application/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_LEVEL_MIGRATION_REVIEW_FORWARD") {
        history.push(`/portal/review-migration-application/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_LEVEL_MIGRATION_REVIEW_BACKWARD") {
        history.push(`/portal/review-migration-application/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_LEVEL_MIGRATION_APPROVED") {
        history.push(`/portal/review-migration-application/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_LEVEL_MIGRATION_REJECTED") {
        history.push(`/portal/review-migration-application/${actionRequestId}`);
      } else if (actionName == "INSTITUTE_LEVEL_MIGRATION_BACK_TO_APPLICANT") {
        history.push(`/portal/review-migration-application/${actionRequestId}`);
      }
      //setRouteConnect(false)
    }
  };

  return (
    <>
      <DefaultCard {...cardProps} className="mb-50">
        {loading && <ProgressBar />}

        <NotificationFilter
          onSubmit={(values) => {
            setCommonSearch({
              ...commonSearch,
              ...values,
            });
          }}
        />

        <BasicTable
          {...tableProps}
          onSizeChange={(pageSize) => onSizeChange(pageSize)}
          onPageChange={(pageNo) => {
            setPage.current = pageNo;
            onPageChange(pageNo);
          }}
          searchOption={false}
          //onSearch={(searchVal) => onSearchByValue(searchVal)}
        >
          {data !== undefined &&
            JSON.parse(JSON.stringify(data)).map((row, index) => (
              <tr
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  if (row.read == false) {
                    setCheck(row.id);
                    setView("Viewed");
                    dispatch(
                      callApi({
                        operationId: UrlBuilder.notificationClientApi(
                          `notification-event/update/${
                            row.id
                          }?kcUserId=${AuthUser.getUserId()}&notificationEventForId=${
                            row.notificationEventFor.id
                          }&appModuleId=13`
                        ),
                        output: "notificationUpdate",
                        storeName: "notificationUpdate",
                        parameters: {
                          method: "PUT",
                          header: {
                            "Content-type": "application/json",
                          },
                        },
                      })
                    );
                    setRouteConnect(true);
                    redirect(row.actionName, row.actionRequestId);
                  }
                }}
              >
                <td>
                  <span>{RowSerial(meta, index)}</span>
                </td>
                <td>
                  <span className="text-center">
                    {row.actionName && row.actionName.replace(/_/g, " ")}
                  </span>
                </td>
                <td>
                  <span className="text-center">
                    {row.instituteName ?? "N/A"}
                  </span>
                </td>
                <td>
                  <span className="text-center">
                    {row.notificationEventMessage}
                  </span>
                </td>
                <td>
                  <span className="text-center">
                    {/* {row.notificationEventMessageBn} */}
                    {row.createdAt}
                  </span>
                </td>
                <td>
                  {/* <button
                    className="btn btn-success"
                    onClick={() => {
                      dispatch(
                        callApi({
                          operationId: UrlBuilder.notificationClientApi(
                            `notification-event/update/${row.id}?kcUserId=${AuthUser.getUserId()}&notificationEventForId=${row.notificationEventFor.id}`
                          ),
                          output: "notificationUpdate",
                          storeName: "notificationUpdate",
                          parameters: {
                            method: "PUT",
                            header: {
                              "Content-type": "application/json",
                            },
                          },
                        })
                      );
                    }}
                  >
                    {row.read == true ? "VIEWED" : "NOT VIEWED"}
                  </button> */}
                  <span
                    style={
                      row.id == check || row.read == true
                        ? { color: "green" }
                        : {}
                    }
                  >
                    {row.read ? "Viewed" : "Not Viewed"}
                  </span>
                </td>
              </tr>
            ))}
        </BasicTable>
      </DefaultCard>
    </>
  );
};

export default NotificationList;
