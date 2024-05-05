import React, { useState, useEffect } from "react";
import { callApi, selectApi } from "../reducers/apiSlice";
import {
  Col,
  Container,
  Dropdown,
  Image,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "@themesberg/react-bootstrap";
import { AuthUser } from "../helpers/AuthUser";
import { useDispatch, useSelector } from "react-redux";
import { UrlBuilder } from "../helpers/UrlBuilder";
import { useHistory } from "react-router-dom";
import UserRole from "../constants/UserRole";

const Notification = (props) => {
  const {
    id,
    link,
    notificationEventMessage,
    actionName,
    read,
    notificationEventFor,
    createdAt,
    actionRequestId,
    instituteName,
  } = props;
  const readClassName = read ? "" : "text-danger";
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, notificationUpdate } = useSelector(selectApi);
  const [routeConnect, setRouteConnect] = useState(false);

  useEffect(() => {
    if (routeConnect == true) {
      if (actionName == "INSTITUTE_JOB_REQUISITION_REVIEW_FORWARD") {
        history.push(`/portal/review/requisition/details/${actionRequestId}`);
        setRouteConnect(false);
      } else if (actionName == "INSTITUTE_JOB_REQUISITION_REVIEW_BACKWARD") {
        history.push(`/portal/review/requisition/details/${actionRequestId}`);
        setRouteConnect(false);
      } else if (actionName == "INSTITUTE_JOB_REQUISITION_SUBMIT") {
        history.push(`/portal/review/requisition/details/${actionRequestId}`);
        setRouteConnect(false);
      } else if (actionName == "INSTITUTE_JOB_REQUISITION_APPROVED") {
        history.push(`/portal/job-requisition/details/${actionRequestId}`);
        setRouteConnect(false);
      }
      // } else if (actionName == "INSTITUTE_JOB_REQUISITION_BACK_TO_APPLICANT") {
      //   history.push(`/portal/review/requisition/details/${actionRequestId}`);
      //   setRouteConnect(false);
      // }
    }
  }, [routeConnect, notificationUpdate]);

  return (
    <ListGroup.Item action href={link} className="border-bottom border-light">
      <Row
        className="align-items-center"
        style={
          read == true
            ? {
                fontWeight: "bold",
                backgroundColor: "#80808047",
                textAlign: "center",
              }
            : {}
        }
      >
        <Col
          className="ps-0 ms--2"
          onClick={() => {
            if (read == false) {
              dispatch(
                callApi({
                  operationId: UrlBuilder.notificationClientApi(
                    `notification-event/update/${id}?kcUserId=${AuthUser.getUserId()}&notificationEventForId=${
                      notificationEventFor.id
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
            }
            setRouteConnect(true);
          }}
        >
          <div className="">
            <div>
              <h4
                className="h6 mb-0 text-small"
                style={read == false ? { textAlign: "center" } : {}}
              >
                {actionName.replace(/_/g, " ")}
              </h4>
            </div>
            {/* <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div> */}
            <div className=" text-center">
              <h5 style={{ fontWeight: "bold" }}>{instituteName ?? "N/A"}</h5>
            </div>
          </div>
          <h4 className="font-small mt-1 mb-0" style={{ textAlign: "center" }}>
            {notificationEventMessage}
          </h4>
          <h6 style={{ textAlign: "center" }}>{createdAt}</h6>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Notification;
