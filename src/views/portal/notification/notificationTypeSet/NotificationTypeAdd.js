import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { Link } from "react-router-dom";
import { Formik } from "formik/dist/index";
import { Button, Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "../../../../components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-topbar-progress-indicator";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import NotificationTypeForm from "./NotificationTypeForm";
import { NotificationType } from "../notificationTypeSet/NotificationTypeModel";

const NotificationTypeAdd = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(selectApi);

  const cardProps = {
    title: "Add New Notification Type",
    headerSlot: () => (
      <>
        <Link to="/portal/notification-type/list">
          <Button variant="link" className="f-right btn-sm p-5 btn-color">
            <FontAwesomeIcon icon={faList} className="me-2" />
            View Notification Type List
          </Button>
        </Link>
      </>
    ),
  };

  return (
    <DefaultCard className="mb-50" {...cardProps}>
      <Card border="white" className="table-wrapper table-responsive">
        <Card.Body>
          {loading && <ProgressBar />}
          <Formik
            initialValues={NotificationType}
            validationSchema={NotificationType.validation()}
            onSubmit={(values, { resetForm }) => {
              dispatch(
                callApi({
                  operationId: UrlBuilder.notificationClientApi(
                    "notification-action/save"
                  ),
                  output: "notification-save",
                  parameters: {
                    method: "POST",
                    body: NotificationType.toString(values),
                    header: {
                      "Content-Type": "application/json",
                    },
                  },
                })
              );
            }}
          >
            {(props) => {
              return <NotificationTypeForm {...props} />;
            }}
          </Formik>
        </Card.Body>
      </Card>
    </DefaultCard>
  );
};

export default NotificationTypeAdd;
