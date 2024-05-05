import { faEdit, faList, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { AuthUser } from "../../../../helpers/AuthUser";
import { userRole } from "../../../../../src/constants/configs";
import moment from "moment";

const CircularDetail = (props) => {
  /**
   * useDispatch: dispatch actions
   */
  const dispatch = useDispatch();
  const [userRoles, setUserRoles] = useState("");

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
        operationId: UrlBuilder.foreignApi(
          `scholarship-circular/find/${props.match.params.id}`
        ),
        output: "details",
        storeName: "circular",
      })
    );
  }, [dispatch, props.match.params.id]);

  let roles = [];

  useEffect(() => {
    //let navs = navMenu.applicant;

    if (AuthUser.isLoggedIn()) {
      roles = AuthUser.getRoles();
      if (roles.includes(userRole.ADMIN)) {
        setUserRoles("admin");
      } else if (roles.includes(userRole.REVIEWER)) {
        setUserRoles("reviewer");
      } else {
        setUserRoles("applicant");
      }
    }
  }, []);

  /**
   * cardProps must need to pass into DefaultCard component.
   * headerSlot: this is a placeholder for action buttons on card header.
   *
   * @type {{headerSlot: (function(): *), title: string}}
   */
  const cardProps = {
    title: "Circular Details",
    headerSlot: () => (
      <>
        {/* {<Link to='/scholarship-circular'>
          <Button variant='link' className='f-right btn-sm p-5 btn-color'>
            <FontAwesomeIcon icon={faList} className='me-2' /> View Circular
            List
          </Button>
        </Link>
      } */}

        {userRoles && userRoles === "admin" ? (
          <Link to={`/scholarship-circular`}>
            <Button variant="" className="f-right btn-color" type="submit">
              <FontAwesomeIcon icon={faList} className="me-2" /> View Circular
              List
            </Button>
          </Link>
        ) : (
          <Link to={`/circular-list`}>
            <Button variant="" className="f-right btn-color" type="submit">
              <FontAwesomeIcon icon={faList} className="me-2" /> View Circular
              List
            </Button>
          </Link>
        )}

        {/* {AuthUser.isLoggedIn() && AuthUser.getUser().preferred_username == "reviewer"        
         && (<Link to={`/circular-list`}>
            <Button variant='' className='f-right btn-color' type='submit'>
              <FontAwesomeIcon icon={faList} className='me-2' /> View Circular
            List
            </Button>
          </Link>)} */}
      </>
    ),
  };

  return (
    <DefaultCard className="mb-50" {...cardProps}>
      {loading && <ProgressBar />}
      <Card border="white" className="table-wrapper ">
        <Card.Body>
          {details !== undefined &&
            details.data.scholarshipProgram !== undefined && (
              <div className="table-responsive">
                <Table className="table table-striped table-hover mb-15">
                  <tbody>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Circular Id</b>
                      </td>
                      <td className="border-0">{details.data.id ?? "N/A"}</td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Program</b>
                      </td>
                      <td className="border-0">
                        {details.data.scholarshipProgram.programName ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Session </b>
                      </td>
                      <td className="border-0">
                        {details.data.scholarshipSession ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Circular Title</b>
                      </td>
                      <td className="border-0">
                        {details.data.circularTitle ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Circular Body</b>
                      </td>
                      <td className="border-0">
                        {details.data.circularBody ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Published Date</b>
                      </td>
                      <td className="border-0">
                        {moment(details.data.publishedDate).format(
                          "DD-MM-Y hh:mm A"
                        ) ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Start Date</b>
                      </td>
                      <td className="border-0">
                        {moment(details.data.effectiveDate).format(
                          "DD-MM-Y hh:mm A"
                        ) ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>End Date</b>
                      </td>
                      <td className="border-0">
                        {moment(details.data.expiryDate).format(
                          "DD-MM-Y hh:mm A"
                        ) ?? "N/A"}
                      </td>
                    </tr>

                    <tr>
                      <td className="border-0 td-width">
                        <b>Circular Notes</b>
                      </td>
                      <td className="border-0">
                        {details.data.circularNotes ?? "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 td-width">
                        <b>Year</b>
                      </td>
                      <td className="border-0">{details.data.year ?? "N/A"}</td>
                    </tr>
                    {details.data &&
                      details.data.scholarshipCircularEncloser &&
                      details.data.scholarshipCircularEncloser.encloserUrl && (
                        <tr>
                          <td className="border-0 td-width">
                            <b>VIEW PDF</b>
                          </td>
                          <td className="border-0">
                            <a
                              target="_blank"
                              //href={`http://103.4.145.245/IEIMS/foreign-service/${details.data && details.data.scholarshipCircularEncloser?details.data.scholarshipCircularEncloser.encloserUrl:""}`}
                              href={UrlBuilder.fileServerApi(
                                `${details.data.scholarshipCircularEncloser.encloserUrl}`
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                className="icon-dark"
                              />
                            </a>
                          </td>
                        </tr>
                      )}
                    <tr>
                      <td className="border-0 td-width">
                        <b>Eligible Criteria</b>
                      </td>
                     <tr>
                     <td className="border-0 td-width">
                        {details.data.eligibleCriteria !== undefined &&
                          details.data.eligibleCriteria &&
                          details.data.eligibleCriteria.length > 0 &&
                          details.data.eligibleCriteria.map((item, index) => {
                            return (
                              <>
                                <table class="table table-responsive table-bordered mb-10">
                                  <thead>
                                    <tr>
                                      <th>Scholarship Degree</th>
                                      <th>Qualification :</th>
                                      <th>Minimum Point Requirement</th>
                                      <th>Out of Score</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.degreeCriteria !== undefined &&
                                      item.degreeCriteria &&
                                      item.degreeCriteria.map((item2) => {
                                        return (
                                          <>
                                            <tr>
                                              <td>
                                                {item.scholarshipDegree
                                                  .educationDegreeName ?? "N/A"}
                                              </td>
                                              <td>
                                                {item2.educationalQualification
                                                  .qualificationName ?? "N/A"}
                                              </td>
                                              <td>
                                                {item2.pointMinimumRequirement ??
                                                  "N/A"}
                                              </td>
                                              <td>
                                                {item2.pointMinimumRequirementOutOfScoreScale ??
                                                  "N/A"}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </>
                            );
                          })}
                      </td>
                     </tr>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          <hr />

          {AuthUser.isLoggedIn() &&
            AuthUser.getUser().preferred_username == "admin" && (
              <Link to={`/scholarship-circular/${details.data.id}/edit`}>
                <Button variant="" className="f-right btn-color" type="submit">
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                  Circular
                </Button>
              </Link>
            )}
        </Card.Body>
      </Card>
    </DefaultCard>
  );
};

export default CircularDetail;
