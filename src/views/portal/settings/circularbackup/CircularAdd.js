import { faList } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi,clearState, selectApi } from "../../../../reducers/apiSlice";
import { Circular } from "./Circular";
import CircularForm from "./CircularForm";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { useRef } from "react";

const CircularAdd = () => {
  /**
   * useDispatch: dispatch actions
   */
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * Get loading indicator from 'selectApi' state
   */
   const {
    loading,
    data = {
      data: {},
    },
  } = useSelector(selectApi);
  const circularStatus = useRef("");

  /**
   * cardProps must need to pass into DefaultCard component.
   * headerSlot: this is a placeholder for action buttons on card header.
   *
   * @type {{headerSlot: (function(): *), title: string}}
   */
  const cardProps = {
    title: "Add New Circular",
    headerSlot: () => (
      <>
        <Link to="/">
          <Button variant="link" className="f-right btn-sm p-5 btn-color">
            <FontAwesomeIcon icon={faList} className="me-2" /> View Circular
            List
          </Button>
        </Link>
      </>
    ),
  };

  const statusvalue = (status) => {
    circularStatus.current = status;
  };

  

  // useEffect(() => {
  //   if (data.data !== undefined) {
  //     dispatch(
  //       clearState({
  //         output: "data",
  //       })
  //     );
  //     history.push("/scholarship-circular");
  //   }
  // }, [dispatch, data]);

  return (
    <DefaultCard className="mb-50" {...cardProps}>
      <Card border="white" className="table-wrapper table-responsive">
        <Card.Body>
          {loading && <ProgressBar />}
          <Formik
            initialValues={Circular}
            validationSchema={Circular.validator()}
            onSubmit={(values) => {
              ///values.circularTitle = values.circularTitle + "-" + values.year;
              delete values.scholarshipCircularEncloser
              let data = Circular.toFormData(values);
              data.append("file", values.file);

              /**
               * Save data through POST api by dispatching 'callApi'
               */
              dispatch(
                // callApi({
                //   operationId:
                //     circularStatus.current === "save"
                //       ? UrlBuilder.foreignApi("scholarship-circular/save/ACTIVE")
                //       : circularStatus.current === "draft"
                //       ? UrlBuilder.foreignApi("scholarship-circular/save/DRAFT")
                //       : circularStatus.current === "publish"
                //       ? UrlBuilder.foreignApi(
                //           "scholarship-circular/publish-now"
                //         )
                //       : "",
                //   output: "data",
                //   parameters: {
                //     method: "POST",
                //     body: data,
                //   },
                // })
              );

              /**
               * Reset form data.
               */
            }}
          >
            {(props) => {
              return (
                <CircularForm
                  formType="add"
                  {...props}
                  type="add"
                  circularStatus={statusvalue}
                />
              );
            }}
          </Formik>
        </Card.Body>
      </Card>
    </DefaultCard>
  );
};

export default CircularAdd;
