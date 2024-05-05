import { Button, Card } from "@themesberg/react-bootstrap/lib/esm/index";
import { Link, useHistory } from "react-router-dom";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faCheck,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-topbar-progress-indicator";
import { useDispatch, useSelector } from "react-redux";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { useEffect, useState } from "react";

const NotificationTypeDetails = (props) => {
  /**
   * Get loading indicator and data from 'selectApi' state
   */
  const {
    loading,
    details = {
      data: {},
    },
  } = useSelector(selectApi);
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * Get data through api call by dispatching 'callApi'.
   */
  useEffect(() => {
    dispatch(
      callApi({
        operationId: UrlBuilder.notificationClientApi(
          `notification-action/find/${props.match.params.id}`
        ),
        output: "details",
        storeName: "notificationTypeDetails",
      })
    );
  }, [dispatch, props.match.params.id]);

  const cardProps = {
    title: "Notification Type Details",
    headerSlot: () => (
      <>
        <Link to="/portal/notification-type/list">
          <Button variant="link" className="f-right btn-sm p-5 btn-color">
            <FontAwesomeIcon icon={faList} className="me-2" />
            Notification Type List
          </Button>
        </Link>
      </>
    ),
  };

  return (
    <>
      <DefaultCard className="mb-50" {...cardProps}>
        {loading && <ProgressBar />}
        {details !== undefined && (
          <>
            <Card border="white" className="table-wrapper table-responsive">
              <Card.Body>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover ">
                    <tbody>
                      <tr>
                        <th className="wd-350">
                          <span>Notification For : </span>
                        </th>
                        <td>
                          <span>
                            {details.data.notificationActionName &&
                              details.data.notificationActionName.replace(
                                /_/g,
                                " "
                              )}
                          </span>
                        </td>
                        <th className="wd-350">
                          <span>Notification Message : </span>
                        </th>
                        <td>
                          <span>
                            {details.data.notificationMessage ?? "N/A"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="wd-350">
                          <span>Notification Message (BN) : </span>
                        </td>
                        <td>
                          <span>
                            {details.data.notificationMessageBn ?? "N/A"}
                          </span>
                        </td>
                        <td className="wd-350">
                          <span>Email Notification : </span>
                        </td>
                        <td>
                          <span>
                            {details.data.isEmailNotification ? (
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
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="wd-350">
                          <span>Push Notification : </span>
                        </td>
                        <td>
                          <span>
                            {details.data.isPushNotification ? (
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
                          </span>
                        </td>
                        <td className="wd-350">
                          <span>SMS Notification : </span>
                        </td>
                        <td>
                          <span>
                            {details.data.isSMSNotification ? (
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
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <div className="p-3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row education">
                        <div className="col-md-6">
                          <p>
                            <span>Notification For : </span>

                            <span>
                              {details.data.notificationActionName &&
                                details.data.notificationActionName.replace(
                                  /_/g,
                                  " "
                                )}
                            </span>
                          </p>
                        </div>

                        <div className="col-md-6">
                          <p>
                            <span>Notification Message : </span>

                            <span>
                              {details.data.notificationMessage ?? "N/A"}
                            </span>
                          </p>
                        </div>

                        <div className="col-md-6">
                          <p>
                            <span>Notification Message (BN) : </span>
                            <span>
                              {details.data.notificationMessageBn ?? "N/A"}
                            </span>
                          </p>
                        </div>

                        <div className="col-md-6">
                          <p>
                            <span>Email Notification : </span>

                            <span>
                              {details.data.isEmailNotification ? (
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
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span>Push Notification : </span>

                            <span>
                              {details.data.isPushNotification ? (
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
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <span>SMS Notification : </span>

                            <span>
                              {details.data.isSMSNotification ? (
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
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <hr />
                <Link to={`/portal/notification-type/${details.data.id}/edit`}>
                  <Button
                    variant=""
                    className="f-right btn-color"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                    Notification Type
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </>
        )}
      </DefaultCard>
    </>
  );
};

export default NotificationTypeDetails;
