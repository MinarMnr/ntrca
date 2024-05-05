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
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faPlus,
    faEye,
    faEdit,
    faWindowClose,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
//import CrudAction from "../../../../components/";

const NotificationTypeList = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [size, setSize] = useState(10);

    const setPage = useRef(1);

    const [searchValue, setSearchValue] = useState("");

    const { type } = useSelector(selectToastAlert);

    const cardProps = {
        title: "Notification Type List",
        headerSlot: () => (
            <Link to="/portal/notification-type/add">
                <Button variant="link" className="f-right btn-sm btn-color">
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New
                    Type
                </Button>
            </Link>
        ),
    };

    const tableProps = {
        headers: [
            { id: "id", label: "SL." },
            { id: "actionName", label: "Name" },
            { id: "notificationEventMessage", label: "Notification Message" },
            // { id: "notificationEventMessageBn", label: "Notification Message (Bn)" },
            { id: "read", label: "Push" },
            { id: "email", label: "Email Address" },
            { id: "sms", label: "SMS" },
            { id: "Actions", label: "Actions" },
        ],
        perPage: [10, 25, 50, 100],
        config: {
            operationId: UrlBuilder.notificationClientApi(
                `notification-action/list?page=${setPage.current}&size=${size}&appModuleId=13`
            ),
            output: "NotificationList",
            storeName: "NotificationList",
        },
        meta: {},
        totalData: 0,
    };

    const onPageChange = (pageNo) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.notificationClientApi(
                    `notification-action/list?page=${setPage.current}&size=${size}&appModuleId=13`
                ),

                output: "NotificationList",
                storeName: "NotificationList",
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
                operationId: UrlBuilder.notificationClientApi(
                    `notification-action/list?page=${setPage.current}&size=${size}&appModuleId=13`
                ),

                output: "NotificationList",
                storeName: "NotificationList",
            })
        );
    };

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

    return (
        <>
            <DefaultCard {...cardProps} className="mb-50">
                {loading && <ProgressBar />}

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
                            <tr key={index}>
                                <td>
                                    <span>{RowSerial(meta, index)}</span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.notificationActionName &&
                                            row.notificationActionName.replace(
                                                /_/g,
                                                " "
                                            )}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-center">
                                        {row.notificationMessage}
                                    </span>
                                </td>
                                {/* <td>
                  <span className="text-center">
                    {row.notificationMessageBn}

                  </span>
                </td> */}
                                <td className="text-center">
                                    {row.isPushNotification ? (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ color: "green" }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faWindowClose}
                                            style={{ color: "red" }}
                                        />
                                    )}
                                    {/* <input
                      type="checkbox"
                      checked={row.isPushNotification ? true : false}
                      readOnly
                    /> */}
                                </td>
                                <td className="text-center">
                                    {row.isEmailNotification ? (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ color: "green" }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faWindowClose}
                                            style={{ color: "red" }}
                                        />
                                    )}

                                    {/* <input
                      type="checkbox"
                      checked={row.isEmailNotification ? true : false}
                      readOnly
                    /> */}
                                </td>
                                <td className="text-center">
                                    {row.isSMSNotification ? (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ color: "green" }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faWindowClose}
                                            style={{ color: "red" }}
                                        />
                                    )}
                                    {/* <input
                      type="checkbox"
                      checked={row.isSMSNotification ? true : false}
                      readOnly
                    /> */}
                                </td>

                                <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            className="btn btn-color me-2"
                                            onClick={() =>
                                                history.push(
                                                    `/portal/notification-type/${row.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            className="btn btn-orange me-2"
                                            onClick={() =>
                                                history.push(
                                                    `/portal/notification-type/${row.id}/edit`
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </BasicTable>
            </DefaultCard>
        </>
    );
};

export default NotificationTypeList;
