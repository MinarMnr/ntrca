import {
    faSave,
    faList,
    faCloudDownloadAlt,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import moment from "moment";
import { FieldArray } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
import { InputSelect } from "components/form";
import InputDatePicker from "components/form/InputDatePicker";
import InputFieldNumber from "components/form/InputFieldNumber";
import applicantImage from "./images/ap_img.jpg";
import signature from "./images/sig.png";
import RowSerial from "helpers/rowSerial";

const JobApplyDetail = (props) => {
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

    const postType = [
        {
            id: "MPO",
            name: "MPO",
        },
        {
            id: "NON_MPO",
            name: "NON_MPO",
        },
    ];

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application/final-details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "jobApplicationDetails",
            })
        );
    }, [dispatch, props.match.params.id]);
    const {
        applicantName,
        batch,
        rollNo,
        registrationNo,
        totalSelectedInstitutes,
        paymentStatus,
        fatherName,
        motherName,
        dob,
        nid,
        mobile,
        email,
        instituteTypeName,
        presentDivisionNameBn,
        presentDistrictNameBn,
        presentThanaNameBn,
        presentPostCode,
        permanentAddress,
        permanentDistrict,
        permanentThana,
        permanentPostOffice,
        permanentPostCode,
        designationName,
        educationalQualificationList,
        preferredInstituteList,
    } = details.data;
    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        headerSlot: () => (
            <>
                <Link to="/portal/application/add">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color ml-10"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        আবেদন করুন
                    </Button>
                </Link>
            </>
        ),
    };
    return (
        <DefaultCard
            className="mb-50"
            title="আবেদনকারীর সকল তথ্য"
            {...cardProps}
        >
            <div className="row">
                <div className="col-2">
                    <img
                        src={applicantImage}
                        alt="no image available"
                        style={{
                            marginTop: "34px",
                            width: "100%",
                            border: "1px solid #808080f0",
                            boxShadow:
                                "0 0.5rem 1rem rgba(104, 104, 104, 0.15) !important;",
                        }}
                    />
                </div>
                <div className="col-10 p-25">
                    <div className="table-responsive">
                        <p className="fw-bold">আবেদনকারীর তথ্য</p>
                        <table className="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>আবেদনকারীর নাম</b>
                                    </td>
                                    <td>{applicantName}</td>
                                    <td>
                                        <b>প্রতিষ্ঠানের ধরন</b>
                                    </td>
                                    <td>{instituteTypeName}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Batch</b>
                                    </td>
                                    <td>{batch}</td>
                                    <td>
                                        <b>Roll</b>
                                    </td>
                                    <td>{rollNo}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Registration Number</b>
                                    </td>
                                    <td>{registrationNo}</td>
                                    <td>
                                        <b>Total Selected Institute</b>
                                    </td>
                                    <td>{totalSelectedInstitutes}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Application Track Number</b>
                                    </td>
                                    <td>N/A</td>
                                    <td>
                                        <b>Payment Status</b>
                                    </td>
                                    <td className="btn-success">
                                        {paymentStatus}
                                    </td>
                                </tr>

                                {/* <tr>
                                    <td>
                                        <b>Status</b>
                                    </td>
                                    <td>
                                        <span className="btn btn-danger">
                                            Pending
                                        </span>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 p-25">
                    <div className="table">
                        <p className="fw-bold">ব্যক্তিগত তথ্য</p>
                        <table className="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>পিতার নাম</b>
                                    </td>
                                    <td>{fatherName}</td>
                                    <td>
                                        <b>মায়ের নাম</b>
                                    </td>
                                    <td>{motherName}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>জন্ম তারিখ</b>
                                    </td>
                                    <td>{dob}</td>
                                    <td>
                                        <b>জাতীয় পরিচয়পত্র নম্বর</b>
                                    </td>
                                    <td>{nid}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>মোবাইল নম্বর</b>
                                    </td>
                                    <td>{mobile}</td>
                                    <td>
                                        <b>ইমেইল</b>
                                    </td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>বর্তমান ঠিকানা</b>
                                    </td>
                                    <td>
                                        বিভাগ:{presentDivisionNameBn}, জেলা:{" "}
                                        {presentDistrictNameBn}, উপজেলা:{" "}
                                        {presentThanaNameBn}, পোস্ট-কোড:
                                        {presentPostCode}
                                    </td>
                                    <td>
                                        <b>স্থায়ী ঠিকানা</b>
                                    </td>
                                    <td>
                                        জেলা: {permanentDistrict}, উপজেলা:{" "}
                                        {permanentThana}, পোস্ট-অফিস:
                                        {permanentPostOffice}
                                        পোস্ট-কোড : {permanentPostCode}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 p-25">
                    <div className="table">
                        <p className="fw-bold">শিক্ষা সংক্রন্ত তথ্য</p>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th style={{ verticalAlign: "middle" }}>
                                        পরীক্ষার নাম
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        প্রতিষ্ঠানের নাম
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        বোর্ড / বিশ্ববিদ্যালয়
                                    </th>

                                    <th style={{ verticalAlign: "middle" }}>
                                        পাশের সন
                                    </th>

                                    <th style={{ verticalAlign: "middle" }}>
                                        জিপিএ / সিজিপিএ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {educationalQualificationList !== undefined &&
                                    educationalQualificationList?.length > 0 &&
                                    educationalQualificationList.map(
                                        (row, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {row?.educationDegreeName}
                                                </td>
                                                <td>{row?.instituteName}</td>
                                                <td>{row?.boardOrInstitute}</td>

                                                <td>{row?.passingYear}</td>

                                                <td>{row?.examGrade}</td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 p-25">
                    <div className="table-responsive">
                        <p className="fw-bold">নির্বাচিত প্রতিষ্ঠানসমূহ</p>
                        <table className="table table-bordered mb-50 text-center">
                            <thead>
                                <tr>
                                    <th style={{ verticalAlign: "middle" }}>
                                        পছন্দ-ক্রম
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        প্রতিষ্ঠানের নাম
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        পদ
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        পদের ধরন
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        বিষয়
                                    </th>

                                    <th style={{ verticalAlign: "middle" }}>
                                        বিভাগ
                                    </th>

                                    <th style={{ verticalAlign: "middle" }}>
                                        জেলা
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        উপজেলা
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {preferredInstituteList !== undefined &&
                                    preferredInstituteList?.length > 0 &&
                                    preferredInstituteList.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span>{index + 1}</span>
                                            </td>
                                            <td>{row?.instituteNameBn}</td>
                                            <td>{row?.designationName}</td>
                                            <td>{row?.jobType}</td>

                                            <td>{row?.subjectName}</td>

                                            <td>{row?.divisionNameBn}</td>

                                            <td>{row?.districtNameBn}</td>

                                            <td>{row?.thanaNameBn}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 p-25">
                    <div className="table">
                        <p className="fw-bold">সংযুক্তি</p>
                    </div>
                    <table className="table table-bordered text-center ">
                        <tbody>
                            <tr>
                                <th className=" ">
                                    {" "}
                                    <b>আবেদনকারীর ছবি:</b>{" "}
                                </th>
                                <th className="">
                                    <b>আবেদনকারীর স্বাক্ষর:</b>
                                </th>
                                <th className="">
                                    <b>আবেদনকারীর মন্তব্য:</b>
                                </th>
                            </tr>
                            <tr>
                                <td className="wd-350">
                                    <img
                                        src={applicantImage}
                                        alt="no image available"
                                        style={{
                                            padding: "10px",
                                            width: "30%",
                                        }}
                                    />
                                </td>

                                <td className="wd-350 ">
                                    <img
                                        src={signature}
                                        alt="no image available"
                                        style={{
                                            padding: "10px",
                                            width: "inherit",
                                        }}
                                    />
                                </td>
                                <td className="wd-350 ">
                                    Lorem Ipsum হল মুদ্রণ এবং টাইপসেটিং শিল্পের
                                    ডামি পাঠ্য। লোরেম ইপসাম 1500 এর দশক থেকে
                                    শিল্পের মানক ডামি টেক্সট হয়েছে, যখন একটি
                                    অজানা প্রিন্টার টাইপের একটি গ্যালি নিয়েছিল
                                    এবং একটি টাইপ নমুনা বই তৈরি করতে এটিকে
                                    স্ক্র্যাম্বল করেছিল। এটি শুধুমাত্র পাঁচ শতক
                                    নয়, ইলেকট্রনিক টাইপসেটিং-এ লাফিয়েও টিকে
                                    আছে, যা অপরিহার্যভাবে অপরিবর্তিত রয়েছে। এটি
                                    1960-এর দশকে লোরেম ইপসাম প্যাসেজ সম্বলিত
                                    লেট্রাসেট শীট প্রকাশের মাধ্যমে এবং অতি
                                    সম্প্রতি লোরেম ইপসামের সংস্করণ সহ অ্যালডাস
                                    পেজমেকারের মতো ডেস্কটপ প্রকাশনা
                                    সফ্টওয়্যারের মাধ্যমে জনপ্রিয় হয়েছিল।
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Col md={12} className="mt-10 text-right ">
                    <input type="checkbox" checked={true} />
                    আমি উপরোক্ত সকল শর্তাবলীর সাথে সম্মতি প্রদান করছি
                </Col>
                <Col md={12} className="mt-20 mb-30 ">
                    <Link to="/portal/payment-page">
                        <Button
                            variant="link"
                            className="f-right btn-color"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                            Submit
                        </Button>
                    </Link>
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color  mr-10"
                    >
                        <FontAwesomeIcon
                            icon={faCloudDownloadAlt}
                            className="me-2"
                        />
                        Download
                    </Button>
                </Col>
            </div>
        </DefaultCard>
    );
};

export default JobApplyDetail;
