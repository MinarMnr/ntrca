import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { NotificationType } from "../notificationTypeSet/NotificationTypeModel";
import NotificationTypeForm from "./NotificationTypeForm";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";

//import './Country.scss'

const NotificationTypeEdit = (props) => {
  /**
   * useDispatch: dispatch actions
   */
  const dispatch = useDispatch();

  /**
   * Get loading indicator and data from 'selectApi' state
   */
  const {
    loading,
    details = {
      data: {},
    },
  } = useSelector(selectApi);

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
        storeName: "notificationDetails",
      })
    );
  }, [dispatch, props.match.params.id]);

  /**
   * cardProps must need to pass into DefaultCard component.
   * headerSlot: this is a placeholder for action buttons on card header.
   *
   * @type {{headerSlot: (function(): *), title: string}}
   */
  const cardProps = {
    title: "Edit Notification Type",
    headerSlot: () => (
      <>
        <Link to="/portal/notification-type/list">
          <Button variant="link" className="f-right btn-sm p-5 btn-color">
            <FontAwesomeIcon icon={faList} className="me-2" /> View Notification
            Type List
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
            initialValues={NotificationType.fromJson(details.data)}
            enableReinitialize={true}
            validationSchema={NotificationType.validation()}
            onSubmit={(values) => {
              /**
               * Save data through POST api by dispatching 'callApi'.
               */
              dispatch(
                callApi({
                  operationId: UrlBuilder.notificationClientApi(
                    "notification-action/update"
                  ),
                  parameters: {
                    method: "PUT",
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
              return <NotificationTypeForm {...props} from="edit" />;
            }}
          </Formik>
        </Card.Body>
      </Card>
    </DefaultCard>
  );
};

export default NotificationTypeEdit;
