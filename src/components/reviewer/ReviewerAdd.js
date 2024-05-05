import React, { useEffect, useState } from "react";
import { Button, Card } from "@themesberg/react-bootstrap";
import ReviewFrom from "./reviewerForm";
import { Formik } from "formik/dist/index";
import { UrlBuilder } from "../../helpers/UrlBuilder";
import { useDispatch } from "react-redux";
import { Reviewer } from "./Reviewer";
import { callApi } from "../../reducers/apiSlice";
import DefaultModal from "../modal/default/DefaultModal";
import ConfirmationModal from "../modal/ConfirmationModal";

const ReviewerAdd = ({
  showParent = false,
  centered = true,
  loading = false,
  title = "Modal",
  size,
  children,
  reviewData,
  close,
  url = "",
  outPut,
  ...props
}) => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sendReq, setSendReq] = useState(false);
  const [formValue, setFormValue] = useState({ Reviewer });
  const [resetValue, setResetValue] = useState(null);

  function getData() {
    setSendReq(true);

    if (sendReq) {
      dispatch(
        callApi({
          operationId: UrlBuilder.commonApi(url),
          output: outPut,
          parameters: {
            method: "POST",
            body: Reviewer.toString(formValue),
            header: {
              "Content-Type": "application/json",
            },
          },
        })
      );
    }
    close(false);
  }
  useEffect(() => {
    getData();
    setSendReq(false);
  }, [sendReq]);

  return (
    <>
      <Card border="white" className="table-wrapper">
        <Card.Body>
          <DefaultModal
            title={title}
            show={showParent}
            onClose={() => close(false)}
            size="lg"
          >
            <Formik
              initialValues={Reviewer}
              enableReinitialize={true}
              onSubmit={(values) => {
                setFormValue(values);
                setShowConfirmModal(true);
              }}
            >
              {(props) => {
                return <ReviewFrom {...props} reviewData={reviewData} />;
              }}
            </Formik>
          </DefaultModal>
        </Card.Body>
      </Card>
      <ConfirmationModal
        title="Confirmation For Sending Back"
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setSendReq(true);
          getData();
          setShowConfirmModal(false);
        }}
      >
        <p>Are You Sure To Send Back ?</p>
      </ConfirmationModal>
      ;
    </>
  );
};

export default ReviewerAdd;
