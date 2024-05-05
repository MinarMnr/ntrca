import React, { useEffect, useState } from "react";
import { faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callApi, clearState, selectApi } from "reducers/apiSlice";
import { UrlBuilder } from "helpers/UrlBuilder";
import { AuthUser } from "helpers/AuthUser";
import Cookies from "js-cookie";
import swal from "sweetalert";

function ResultList(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        loading,
        details = {
            data: {},
        },
        employeeHistoryData = {
            data: {},
          },
    } = useSelector(selectApi);

    console.log('details', details);
    console.log('employeeHistoryData', employeeHistoryData?.data);

    

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application-selection-process-result-detail/details/${AuthUser.getApplicantNid()}`
                ),
                output: "details",
            })
        );
    }, [dispatch]);

    // const getDataFromNidDbCheck = () => {
    
    //     if (details?.data?.nid !== '' && details?.data?.dateOfBirth !== undefined ) {

    //         dispatch(
    //           callApi({
    //             operationId: UrlBuilder.mpoDsheApi(
    //               `employee/duplicate-checking-and-call-directorate?dob=${details?.data?.dateOfBirth}&nid=${details?.data?.nid}&directorateId=3`
    //             ),
    //             output: "employeeHistoryData",
    //             storeName: "employeeHistoryData",
    //           })
    //         );

    //         if(employeeHistoryData?.data !== null && employeeHistoryData?.data?.isExist == false){
    //         history.push(`/portal/joining/teacher-joining?roll=${details?.data?.rollNo}&batch=${details?.data?.batch}&instituteId=${details?.data?.instituteId}&instituteName=${details?.data?.instituteName}&selectedDate=${details?.data?.selectedDate}`);
    //         }
    //       }
    // };

    useEffect(() => {
        if (employeeHistoryData?.data !== null && (employeeHistoryData?.data?.isExist == true || employeeHistoryData?.data?.isExist == false)) {
            history.push(`/portal/joining/teacher-joining?roll=${details?.data?.rollNo}&batch=${details?.data?.batch}&instituteId=${details?.data?.instituteId}&instituteName=${details?.data?.instituteName}&selectedDate=${details?.data?.selectedDate}&designationStatus=${details?.data?.designationStatus}&educationLevelId=${details?.data?.educationLevelId}&joiningStartDate=${details?.data?.joiningStartDate}&joiningEndDate=${details?.data?.joiningEndDate}&jobApplicationCircularId=${details?.data?.jobApplicationCircularId}&instituteTypeId=${details?.data?.instituteTypeId}`);
        }
        dispatch(
            clearState({
                output: "employeeHistoryData",
            })
        );
    }, [employeeHistoryData?.data?.isExist]);

    // const getDataFromNidDbCheck = () => {
    //     if (details?.data?.nid !== '' && details?.data?.dateOfBirth !== undefined) {
    //         dispatch(
    //             callApi({
    //                 operationId: UrlBuilder.mpoDsheApi(
    //                     `employee/duplicate-checking-and-call-directorate?dob=${details?.data?.dateOfBirth}&nid=${details?.data?.nid}&directorateId=3`
    //                 ),
    //                 output: "employeeHistoryData",
    //                 storeName: "employeeHistoryData",
    //             })
    //         );
    //     }
    // };

    const getDataFromNidDbCheck = () => {
        if (details?.data?.nid !== '' && details?.data?.dateOfBirth !== undefined && details?.data?.instituteTypeId ) {
            let operationId;
            if (details?.data?.instituteTypeId == "4" || details?.data?.instituteTypeId == "5") {
                operationId = UrlBuilder.mpoJoiningApi(
                    `employee/duplicate-checking-and-call-directorate?dob=${details?.data?.dateOfBirth}&nid=${details?.data?.nid}&directorateId=4`, parseInt(details?.data?.instituteTypeId)
                );
            } else if (details?.data?.instituteTypeId == "14" ) {
                operationId = UrlBuilder.mpoJoiningApi(
                    `employee/duplicate-checking-and-call-directorate?dob=${details?.data?.dateOfBirth}&nid=${details?.data?.nid}&directorateId=5`, parseInt(details?.data?.instituteTypeId)
                );
            } else {
                operationId = UrlBuilder.mpoJoiningApi(
                    `employee/duplicate-checking-and-call-directorate?dob=${details?.data?.dateOfBirth}&nid=${details?.data?.nid}&directorateId=3`, parseInt(details?.data?.instituteTypeId) 
                );
            }
            dispatch(
                callApi({
                    operationId: operationId,
                    output: "employeeHistoryData",
                    storeName: "employeeHistoryData",
                })
            );
        }
    };

    

    const getDownload = (nid) => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `report/recommendation-letter-pdf?NID=${nid}`
                ),
                output: "download",
                storeName: "download",
            })
        );
    };

    const getFileClicked = (nid) => {
        let format = "pdf";
        fetch(
            UrlBuilder.ntrcaApi(`report/recommendation-letter-pdf?NID=${nid}`),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookies.get("access_token"),
                },
            }
        )
            .then((response) => response.blob())
            .then((blob) => {
                // 2. Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Recommendation_${nid}.pdf`);
                // 3. Append to html page
                document.body.appendChild(link);
                // 4. Force download
                link.click();
                // 5. Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={12}>
                    <h3 class=" text-center mt-20">
                        নির্বাচিত প্রার্থীর ফলাফল{" "}
                        {/* <p size="4">(৩য় চক্র: ২য় পর্যায়)</p> */}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10} className="mt-10">
                    <Card className="p-20">
                        <table className="bg-white border table text-center">
                            <tr>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    আবেদন নং:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white">
                                    {details?.data?.applicationNo}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    আবেদনকারীর নাম:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white">
                                    {details?.data?.applicantName}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    ব্যাচ:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.examNameBn ??
                                        details?.data?.examName}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    রোল নং:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.rollNo}
                                </td>
                            </tr>
                            <tr>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    প্রতিষ্ঠানের নাম:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.instituteNameBn}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    প্রতিষ্ঠানের EIIN:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.eiinNo}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    বিষয়:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.subjectName}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    Status:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    <span className="text-success fw-bold">
                                        {details?.data?.applicationStatus}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    প্রতিষ্ঠানের বিভাগ:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.divisionNameBn}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    প্রতিষ্ঠানের জেলা:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.districtNameBn}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    প্রতিষ্ঠানের উপজেলা:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    {details?.data?.thanaNameBn}
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white fw-bold">
                                    পুলিশ ভেরিফিকেশন:
                                </td>
                                <td className="pl-20 pt-10 pb-5 bg-white text-center">
                                    <span className="text-success fw-bold">
                                        {details?.data?.isPoliceVerified
                                            ? "Verified"
                                            : "Not Verified Yet"}
                                    </span>
                                </td>
                            </tr>
                            {/* <tr></tr> */}
                        </table>
                        <Row>
                            <Col md={4}></Col>

                            {/* <Col md={2} className="text-center">
                                <Link
                                    to={`/portal/joining/teacher-joining?roll=${details?.data?.rollNo}&batch=${details?.data?.batch}&instituteId=${details?.data?.instituteId}&instituteName=${details?.data?.instituteName}&selectedDate=${details?.data?.selectedDate}`}
                                >
                                    <Button
                                        variant="link"
                                        className="f-right btn-sm btn-color mt-20"
                                        // onClick={getDataFromNidDbCheck}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="me-2"
                                        />{" "}
                                        প্রতিষ্ঠানে যোগদান করুন
                                    </Button>
                                </Link>
                            </Col> */}
                            <Col md={2} className="text-center">
                                
                                    <Button
                                        variant="link"
                                        className="f-right btn-sm btn-color mt-20"
                                        onClick={getDataFromNidDbCheck}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="me-2"
                                        />{" "}
                                        প্রতিষ্ঠানে যোগদান করুন
                                    </Button>
                                
                            </Col>
                            {details?.data?.applicationStatus == "SELECTED" && (
                                <Col md={3} className="text-center">
                                    <Button
                                        variant="link"
                                        className="btn-sm btn-success mt-20 mr-90"
                                        onClick={() => {
                                            swal({
                                                title: "Do you want to download?",
                                                icon: "warning",
                                                buttons: true,
                                                dangerMode: true,
                                            }).then((willDownload) => {
                                                willDownload &&
                                                    getFileClicked(
                                                        AuthUser.getApplicantNid()
                                                    );
                                            });
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faDownload}
                                            className="me-2"
                                        />{" "}
                                        সুপারিশ ডাউনলোড করুন
                                    </Button>
                                </Col>
                            )}
                            <Col md={3}></Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={1}></Col>
            </Row>
        </div>
    );
}

export default ResultList;
