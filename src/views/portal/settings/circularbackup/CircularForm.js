import {
  faPencilRuler,
  faPlusSquare,
  faSave,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form as Form1, Row } from "@themesberg/react-bootstrap";
import {
  ErrorMessage as ErrorFormik,
  FieldArray,
  Form,
} from "formik/dist/index";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { InputField } from "../../../../components/form";
import InputSelectApi from "../../../../components/form/InputSelectApi";
import InputSelectStatic from "../../../../components/form/inputSelectStatic";
import InputTextArea from "../../../../components/form/InputTextArea";
import ComboBox from "../../../../components/search/SearchComponent";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi } from "../../../../reducers/apiSlice";
import { Circular } from "./Circular";
import "./Circular.scss";

const CircularForm = ({
  setFieldValue,
  values,
  type,
  circularStatus,
  formType,
}) => {
  const [publishDate, setPublishDate] = useState(
    values.publishedDate.length !== null ? "text" : "datetime-local"
  );

  const [effectiveDate, setEffectiveDate] = useState(
    values.effectiveDate.length !== null ? "text" : "datetime-local"
  );
  const [expiryDate, setExpiryDate] = useState(
    values.effectiveDate.length !== null ? "text" : "datetime-local"
  );

  const [fileSource, setFileSource] = useState(
    formType === "edit" ? "text" : "file"
  );

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [circularId, setCircularId] = useState(0);
  const history = useHistory();
  const [yearVal, setYearVal] = useState([]);
  const criteriaList = useRef([]);
  const [checkQualification, setCheckQualification] = useState(false);
  const [checkDegree, setCheckDegree] = useState(false);
  const [degreeIndex, setDegreeIndex] = useState(0);
  var yearLists = [];

  if (type === undefined) {
    const criteria = values.eligibleCriteria.map((item) => {
      return {
        educationalQualificationId: item.educationalQualificationId,
        pointMinimumRequirement: item.pointMinimumRequirement,
        cgpaMultiplier: item.cgpaMultiplier,
        percentageMultiplier: item.percentageMultiplier,
        qualificationRulesDetailNotes: item.qualificationRulesDetailNotes,
        id: item.id ? item.id : 0,
      };
    });
    criteriaList.current = criteria;
  }

  const getYear = () => {
    var max = new Date().getFullYear();
    var select = document.getElementById("myDiv");
    select.style.display = "none";

    for (var i = max; i <= max + 10; i++) {
      // var opt = document.createElement("option");
      // opt.value = i;
      // opt.id="optionItem"
      // opt.innerHTML = i;
      // select.appendChild(opt);
      yearLists.push(i);
    }

    setYearVal(yearLists);
  };

  const publishDateTime = useRef("");
  const criteria =
    type === undefined
      ? criteriaList.current
      : criteriaList.current.criteria
      ? criteriaList.current.criteria
      : Circular.eligibleCriteria;
  const dispatch = useDispatch();

  useEffect(() => {
    let uniqueQualificationList = new Set();
    let qualificationFromValues = [];
    values.eligibleCriteria.forEach((item) => {
      if (item.scholarshipDegreeId) {
        uniqueQualificationList.add(parseInt(item.scholarshipDegreeId));
        qualificationFromValues.push(item.scholarshipDegreeId);
      }
    });

    if (uniqueQualificationList.size < qualificationFromValues.length) {
      setCheckDegree(true);
    } else {
      setCheckDegree(false);
    }
  }, [values.eligibleCriteria]);

  useEffect(() => {
    let uniqueQualificationList = new Set();
    let qualificationFromValues = [];
    let degreeList = values.eligibleCriteria[degreeIndex].degreeCriteria || [];
    degreeList.forEach((item) => {
      if (item.educationalQualificationId) {
        uniqueQualificationList.add(parseInt(item.educationalQualificationId));
        qualificationFromValues.push(item.educationalQualificationId);
      }
    });

    if (uniqueQualificationList.size < qualificationFromValues.length) {
      setCheckQualification(true);
    } else {
      setCheckQualification(false);
    }
  }, [values.eligibleCriteria[degreeIndex].degreeCriteria]);



  const deleteDegreeCriteria = (indexx) => {
    dispatch(
      callApi({
        operationId: UrlBuilder.foreignApi(
          ``
        ),
        parameters: {
          method: "PUT",
        },
      })
    );
  };

  const deleteCriteria = (indexx) => {
    dispatch(
      callApi({
        operationId: UrlBuilder.foreignApi(
          ``
        ),
        parameters: {
          method: "PUT",
        },
      })
    );
  };

  return (
    <Form encType="multipart/form-data">
      <Row>


        <Col lg={6} md={12} className="mb-10">
          <label class="form-label">
            Scholarship Program
            <abbr style={{ color: "red" }} class="req">
              *
            </abbr>
          </label>
          <ComboBox
            title="programName"
            name="scholarshipProgramId"
            setField={setFieldValue}
            formType={formType}
            storeName="scholarshipProgram"
            allValue={values}
            // operationId={UrlBuilder.foreignApi(
            //   ""
            // )}
          ></ComboBox>
          <ErrorFormik name="scholarshipProgramId">
            {() => <div style={{ color: "red" }}>Required</div>}
          </ErrorFormik>
        </Col>

        <Col lg={6} md={12} className="mb-10">
          <label class="form-label">
            Academic Session
            <abbr style={{ color: "red" }} class="req">
              *
            </abbr>
          </label>
          <ComboBox
            title="sessionName"
            name="scholarshipSessionId"
            setField={setFieldValue}
            formType={formType}
            storeName="scholarshipSession"
            allValue={values}
            operationId={UrlBuilder.foreignApi(
              "scholarship-session/list?recordStatus=ACTIVE"
            )}
          ></ComboBox>
          <ErrorFormik name="scholarshipSessionId">
            {() => <div style={{ color: "red" }}>Required</div>}
          </ErrorFormik>
        </Col>



        <Col md={6} className="mb-10">
          <InputField
            label="Circular Title"
            name="circularTitle"
            type="text"
            onChange={() => setFieldValue("circularTitle")}
            isRequired="true"
          />
          <ErrorMessage fieldName="circularTitle" />
        </Col>

        <Col lg={6} md={12} className="mb-10">
          {yearVal.length > 0 && (
            <InputSelectStatic
              name="year"
              label="Year"
              data={yearVal}
              onChange={(e) => setFieldValue("year", e.target.value)}
              required
            />
          )}
          <div id="myDiv">
            <Form1.Label>Select Year </Form1.Label>
            <select
              onClick={getYear}
              className="form-control"
              id="selectElementId"
            >
              <option>{values.year}</option>
            </select>
          </div>
        </Col>

        <Col lg={6} md={12} className="mb-10">
          <label class="form-label">
            Review Committee
            <abbr style={{ color: "red" }} class="req">
              *
            </abbr>
          </label>
          <ComboBox
            title="committeeName"
            name="reviewCommitteeId"
            formType={formType}
            setField={setFieldValue}
            storeName="reviewCommittee"
            allValue={values}
            // operationId={UrlBuilder.foreignApi(
            //   "review-committee/all?recordStatus=ACTIVE"
            // )}
          ></ComboBox>
          <ErrorFormik name="reviewCommitteeId">
            {() => <div style={{ color: "red" }}>Required</div>}
          </ErrorFormik>
        </Col>

        <Col md={6} className="mb-10">
          <InputTextArea
            label="Circular Body"
            name="circularBody"
            type="text"
            isRequired="true"
          />
          <ErrorMessage fieldName="circularBody" />
        </Col>

        <Col lg={4} md={12} className="mb-10">
          <InputField
            label="Published Date"
            name="publishedDate"
            type={publishDate}
            placeholder="Enter Published Date"
            onClick={() => {
              setPublishDate("datetime-local");
            }}
            isRequired="true"
          />
          <ErrorMessage fieldName="publishedDate" />
        </Col>

        <Col lg={4} md={12} className="mb-10">
          <InputField
            label="Start Date"
            name="effectiveDate"
            type={effectiveDate}
            placeholder="Enter Start Date"
            onClick={() => {
              setEffectiveDate("datetime-local");
            }}
            isRequired="true"
          />
          <ErrorMessage fieldName="effectiveDate" />
        </Col>

        <Col lg={4} md={12} className="mb-10">
          {/* <input
          type="datetime-local"
          value={values.expiryDate}
          onChange={e => this.handleChange('datetime', e)}
          /> */}
          <InputField
            label="End Date"
            name="expiryDate"
            type={expiryDate}
            placeholder="Enter End date"
            onClick={() => {
              setExpiryDate("datetime-local");
            }}
            isRequired="true"
          />
          <ErrorMessage fieldName="expiryDate" />
        </Col>
        <Col md={6} className="mb-10">
          <InputField
            label="Circular Notes"
            name="circularNotes"
            type="text"
            placeholder="Enter Circular Notes"
          />
          <ErrorMessage fieldName="circularNotes" />
        </Col>

        <Col md={6} className="mb-10">
          <div className="form-group" style={{ width: "100%" }}>
            <label className="d-block">
              ফাইল আপলোড{"  "}
              {formType === "edit" && (
                <a
                  href=""
                  target="_blank"
                  style={{ color: "red" }}
                >
                  PDF
                </a>
              )}
            </label>

            <input
              id="attachment"
              name="file"
              //type="file"
              type={fileSource}
              className="form-control"
        
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
              onClick={() => {
                setFileSource("file");
              }}
            />
          </div>
        </Col>

        <p
          style={{
            color: "primary",
            textAlign: "center",
            marginTop: "20px",
            textDecorationLine: "underline",
          }}
        >
          <b>Eligible Criteria</b>
        </p>
        {/* <ErrorFormik name="eligibleCriteria">
            {() => <div style={{ color: "red" }}>Required</div>}
        </ErrorFormik> */}
        <FieldArray
          name="eligibleCriteria"
          render={(arrayHelpers) => (
            <div>
              <Row>
                <div className="row">
                  <div className="col-6">
                    <Form1.Label className="d-block">Serial No</Form1.Label>
                  </div>

                 
                </div>

              
              </Row>
            </div>
          )}
        />

        <Col md={12} className="mb-10 mt-10">
      

          <Button
            variant=""
            className="f-right btn-color mr-10"
            type="submit"
            onClick={() => {
              circularStatus("save");
            }}
          >
            <FontAwesomeIcon icon={faSave} className="me-2 " /> Save
          </Button>
          <Button
            variant=""
            className="f-right btn-color mr-10"
            style={{ background: "#93a5be" }}
            type="submit"
            onClick={() => {
              circularStatus("draft");
            }}
          >
            <FontAwesomeIcon icon={faPencilRuler} className="me-2 " /> Draft
          </Button>
          <Link to="/scholarship-circular">
            <Button variant="white" className="f-right mr-10" type="cancle">
              <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
            </Button>
          </Link>


        </Col>
      </Row>
    </Form>
  );
};

export default CircularForm;
