import React, { useEffect, useState } from "react";
import { Formik } from "formik/dist/index";
import ProgressBar from "react-topbar-progress-indicator";
import { Link } from "react-router-dom";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultCard } from "../../../components/card";
import { Button, Card } from "@themesberg/react-bootstrap";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import TeacherJoiningForm from "./TeacherJoiningForm";
import { TeacherJoining } from "./TeacherJoining";
import { UrlBuilder } from "helpers/UrlBuilder";
import { TeacherRejoining } from "./TeacherRejoining";

const TeacherJoiningAdd = (props) => {
    const dispatch = useDispatch();
    const {
        loading,
        ntrcaData = {
            data: {},
        },
        teacherJoining = {
            data: {},
        },
        employeeHistoryCheckData = {
            data: {},
          }
    } = useSelector(selectApi);

    const [show, setShow] = useState(false);

    console.log('ntrcaData', ntrcaData);

    console.log('employeeHistoryCheckData', employeeHistoryCheckData);

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    // useEffect(() => {
    //     if (ntrcaData?.data?.nid && ntrcaData?.data?.dob) {
    //         dispatch(
    //             callApi({
    //                 operationId: UrlBuilder.mpoDsheApi(
    //                     `employee/duplicate-checking-and-call-directorate?dob=${ntrcaData?.data?.dob}&nid=${ntrcaData?.data?.nid}&directorateId=3`
    //                 ),
    //                 output: "employeeHistoryCheckData",
    //                 storeName: "employeeHistoryCheckData",
    //             })
    //         );
    //     }
    // }, [ntrcaData?.data?.nid, ntrcaData?.data?.dateOfBirth, dispatch]);

    
    

    const cardProps = {
        title: "শিক্ষক যোগদান ফরম",
        headerSlot: () => (
            <>
                <Link to="/portal/result">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        শিক্ষক যোগদানের অবস্থা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    const extractRollBatch = () => {
        let x = {};
        if (props.location.search) {
            let searhData = props.location.search;
            let newSearchData = searhData.slice(1).split("&");
            newSearchData.forEach((item) => {
                let splitedData = item.split("=");
                x = { ...x, [splitedData[0]]: splitedData[1] };
            });
            return x;
        } else return undefined;
    };

    console.log('extractRollBatch', extractRollBatch());

    

    const data = {
        employeeNameBn: ntrcaData?.data?.applicantNameBn,
        employeeName: ntrcaData?.data?.applicantName,
        fathersName: ntrcaData?.data?.fatherName,
        mothersName: ntrcaData?.data?.motherName,
        dateOfBirth: ntrcaData?.data?.dob,
        gender: ntrcaData?.data?.gender?.toUpperCase(),
        // religionInfo: ntrcaData?.data?.religion,
        nationality: "BANGLADESHI",
        birthRegNo: ntrcaData?.data?.birthRegNo,
        nid: ntrcaData?.data?.nid,
        mobile: ntrcaData?.data?.mobileNo,
        email: ntrcaData?.data?.email,
        religionInfo: ntrcaData?.data?.religion,
        isNtrca: true,
        designationName: ntrcaData?.data?.designationName,
        designationCode: ntrcaData?.data?.designationCode,
        subject: ntrcaData?.data?.subjectId,
        subjectCode: ntrcaData?.data?.subjectCode,
        subjectName: ntrcaData?.data?.subjectName,
        // subjectId: ntrcaData?.data?.subjectId,
        instituteName: String(extractRollBatch()?.instituteName)?.replace(
            /%[0-9]*\s?/g,
            " "
        ),
        activeInstituteId: parseInt(extractRollBatch()?.instituteId),
        ntrcaExamRollNumber: String(extractRollBatch()?.roll),
        ntrcaExamBatch: parseInt(extractRollBatch()?.batch),
        selectedDate: extractRollBatch()?.selectedDate,
        designationStatus: extractRollBatch()?.designationStatus,
        educationLevelId: parseInt(extractRollBatch()?.educationLevelId),
        ntrcaStartJoiningDate: extractRollBatch()?.joiningStartDate,
        ntrcaLastJoiningDate: extractRollBatch()?.joiningEndDate,
        ntrcaJobCircularId: parseInt(extractRollBatch()?.jobApplicationCircularId),
        instituteTypeId: parseInt(extractRollBatch()?.instituteTypeId),
    };

    const [commonSearch, setCommonsearch] = useState({
        examBatch: parseInt(extractRollBatch()?.batch),
        roll: String(extractRollBatch()?.roll),
    });

    // console.log('commonSearch', commonSearch);

    const getNtrcaData = () => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `certified-applicant/profile/educational-qualification/applicant/${commonSearch?.examBatch}/${commonSearch?.roll}`
                ),
                output: "ntrcaData",
                storeName: "ntrcaData",
            })
        );
    };

    useEffect(() => {
        getNtrcaData();
    }, []);

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        if (ntrcaData?.data?.nid && ntrcaData?.data?.dob && data?.instituteTypeId) {
            let operationId;
            if (data.instituteTypeId === 4 || data.instituteTypeId === 5) {
                operationId = UrlBuilder.mpoJoiningApi(
                    `employee/duplicate-checking-and-call-directorate?dob=${ntrcaData?.data?.dob}&nid=${ntrcaData?.data?.nid}&directorateId=4`, data?.instituteTypeId
                );
            } else if (data.instituteTypeId === 14) {
                operationId = UrlBuilder.mpoJoiningApi(
                    `employee/duplicate-checking-and-call-directorate?dob=${ntrcaData?.data?.dob}&nid=${ntrcaData?.data?.nid}&directorateId=5`, data?.instituteTypeId
                );
            } else {
                operationId = UrlBuilder.mpoJoiningApi(
                    `employee/duplicate-checking-and-call-directorate?dob=${ntrcaData?.data?.dob}&nid=${ntrcaData?.data?.nid}&directorateId=3`, data?.instituteTypeId
                );
            }
            dispatch(
                callApi({
                    operationId: operationId,
                    output: "employeeHistoryCheckData",
                    storeName: "employeeHistoryCheckData",
                })
            );
        } 
    }, [ntrcaData?.data?.nid, ntrcaData?.data?.dateOfBirth, dispatch, data?.instituteTypeId]);

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white" className="table-wrapper table-responsive">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={(employeeHistoryCheckData?.data !== null && employeeHistoryCheckData?.data?.isExist == false) ? TeacherJoining.fromJson(data) : TeacherRejoining.fromJson(data)}

                        validationSchema={(employeeHistoryCheckData?.data !== null && employeeHistoryCheckData?.data?.isExist == false) ? TeacherJoining.validator() : TeacherRejoining.validator()}
                        
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            // setShow(true)
                            console.log('values', values);

                            let body = TeacherJoining.toFormData(values);

                            let rejoiningbody = TeacherRejoining.toFormData(values);


                            console.log('body', body);
                            console.log('rejoiningbody', rejoiningbody);

                            if(employeeHistoryCheckData?.data !== null && employeeHistoryCheckData?.data?.isExist == false ){

                                console.log('Joining IF Condition');

                                // dispatch(
                                //   callApi({
                                //     operationId:  UrlBuilder.mpoDsheApi("employee-joining/save"),
                                //     output: "teacherJoining",
                                //     parameters: {
                                //       method: "POST",
                                //       body: body,
                                //       hasFile: true,
                                //     },
                                //   })
                                // );

                                dispatch(
                                    callApi({
                                      operationId:  UrlBuilder.mpoJoiningApi("employee-joining/save", values?.instituteTypeId),
                                      output: "teacherJoining",
                                      parameters: {
                                        method: "POST",
                                        body: body,
                                        hasFile: true,
                                      },
                                    })
                                );
                                
                            }
                            else
                            {
                                console.log("Rejoining IF Condition");
                                // dispatch(
                                //     callApi({
                                //       operationId: UrlBuilder.mpoDsheApi("employee-joining/re-joining"),
                                //       output: "teacherJoining",
                                //       parameters: {
                                //         method: "POST",
                                //         body: rejoiningbody,
                                //         hasFile: true,
                                //       },
                                //     })
                                //   );

                                dispatch(
                                    callApi({
                                      operationId:  UrlBuilder.mpoJoiningApi("employee-joining/re-joining", values?.instituteTypeId),
                                      output: "teacherJoining",
                                      parameters: {
                                        method: "POST",
                                        body: rejoiningbody,
                                        hasFile: true,
                                      },
                                    })
                                );
            
                            }

                            // dispatch(
                            //     callApi({
                            //         operationId:
                            //             UrlBuilder.mpoDsheApi(
                            //                 `employee/joining`
                            //             ),
                            //         output: "teacherJoining",
                            //         parameters: {
                            //             method: "POST",
                            //             body: body,
                            //             hasFile: true,
                            //         },
                            //     })
                            // );
                        }}
                    >
                        {(props) => {
                            return (
                                <TeacherJoiningForm
                                    {...props}
                                    show={show}
                                    setShow={setShow}
                                    status={teacherJoining?.status}
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default TeacherJoiningAdd;
