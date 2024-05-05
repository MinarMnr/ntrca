import {
    faSave,
    faList,
    faCloudDownloadAlt,
    faFileAlt,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { callApi, selectApi } from "../../../../reducers/apiSlice";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import moment from "moment";
import { Field, Form } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
import { InputSelect } from "components/form";
import InputDatePicker from "components/form/InputDatePicker";
import InputFieldNumber from "components/form/InputFieldNumber";
import applicantImage from "./images/ap_img.jpg";
import signature from "./images/sig.png";
import RowSerial from "helpers/rowSerial";
import { AuthUser } from "helpers/AuthUser";
import swal from "sweetalert";
import Cookies from "js-cookie";

const ApplicationFullPreview = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();
    var nid = AuthUser.getUserName();

    var circularId = props.match.params.id;
    var circularTitle = props.match.params.name;
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
                operationId:
                    circularId &&
                    UrlBuilder.ntrcaApi(
                        `job-application/final-details/${nid}/${circularId}`
                    ),
                output: "details",
                storeName: "preview",
            })
        );
    }, [dispatch, circularId, nid]);

    const getFileClicked = (cid, nid) => {
        let format = "pdf";
        fetch(
            UrlBuilder.ntrcaApi(
                `report/ntrca-special-job-application-download?jobApplicationCircularId=${cid}&NID=${nid}`
            ),
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
                link.setAttribute("download", `Preview_${nid}.pdf`);
                // 3. Append to html page
                document.body.appendChild(link);
                // 4. Force download
                link.click();
                // 5. Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };

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
        //nid,
        mobile,
        email,
        examNameBn,
        examName,
        presentDivisionNameBn,
        presentDistrictNameBn,
        presentThanaNameBn,
        presentPostCode,
        permanentAddress,
        permanentDistrict,
        permanentThana,
        permanentPostOffice,
        permanentPostCode,
        designationNameBn,
        educationalQualificationList,
        preferredInstituteList,
        photoEncloserUrl,
        esignEncloserUrl,
        isAgreed,
    } = details?.data || {};
    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        headerSlot: () => (
            <>
                <Link to="/portal/circular/applicant/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color ml-10"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        গণ বিজ্ঞপ্তির তালিকা
                    </Button>
                </Link>

                <Button
                    variant="link"
                    className="btn-sm btn-success f-right ml-10"
                    onClick={() => {
                        swal({
                            title: "Do you want to download preview?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        }).then((willDownload) => {
                            willDownload && getFileClicked(circularId, nid);
                        });
                    }}
                >
                    <FontAwesomeIcon icon={faDownload} className="me-2" />{" "}
                    সম্পূর্ণ প্রিভিউ ডাউনলোড করুন
                </Button>
            </>
        ),
    };
    return (
        <DefaultCard className="mb-50" title={circularTitle} {...cardProps}>
            <div className="contentBox-modified">
                {/* <div className="col-2">
                    <img
                        src={UrlBuilder.fileServerApi(`${photoEncloserUrl}`)}
                        alt="no image available"
                        style={{
                            marginTop: "34px",
                            width: "100%",
                            border: "1px solid #808080f0",
                            boxShadow:
                                "0 0.5rem 1rem rgba(104, 104, 104, 0.15) !important;",
                        }}
                    />
                </div> */}

                <div className="contentBoxBody mt-20"></div>
                <div className="contentBox-modified">
                    <div className="section-header-custom">
                        <h5 className="m-10 text-white">আবেদনকারীর তথ্য</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>আবেদনকারীর নাম</b>
                                    </td>
                                    <td>{applicantName}</td>
                                    <td>
                                        <b>Batch Name</b>
                                    </td>
                                    <td>{examNameBn ?? examName}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Roll</b>
                                    </td>
                                    <td>{rollNo}</td>
                                    <td>
                                        <b>Registration Number</b>
                                    </td>
                                    <td>{registrationNo}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Total Selected Institute</b>
                                    </td>
                                    <td>{totalSelectedInstitutes}</td>

                                    <td>
                                        <b>Payment Status</b>
                                    </td>
                                    <td
                                        className={`bg-${
                                            paymentStatus === "Unpaid"
                                                ? "warning"
                                                : "success"
                                        }`}
                                    >
                                        {paymentStatus === "Unpaid"
                                            ? "Unpaid"
                                            : "Paid"}
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

                <div className="contentBoxBody mt-20"></div>
                <div className="contentBox-modified">
                    <div className="section-header-custom">
                        <h5 className="m-10 text-white">ব্যক্তিগত তথ্য</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="table-responsive">
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
                                    <td>
                                        {moment.utc(dob).format("DD/MM/yyyy") ||
                                            "N/A"}
                                    </td>
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

                <div className="contentBoxBody mt-20"></div>
                <div className="contentBox-modified">
                    <div className="section-header-custom">
                        <h5 className="m-10 text-white">
                            শিক্ষা সংক্রন্ত তথ্য
                        </h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th style={{ verticalAlign: "middle" }}>
                                        পরীক্ষার নাম
                                    </th>
                                    <th style={{ verticalAlign: "middle" }}>
                                        গ্রুপ / বিষয়
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
                                                <td>{row?.groupOrSubject}</td>
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

                <div className="contentBoxBody mt-20"></div>
                <div className="contentBox-modified">
                    <div className="section-header-custom">
                        <h5 className="m-10 text-white">
                            নির্বাচিত প্রতিষ্ঠানসমূহ
                        </h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="table-responsive">
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
                                            <td>
                                                {row?.instituteNameBn ?? "N/A"}
                                            </td>
                                            <td>
                                                {row?.designationNameBn ??
                                                    "N/A"}
                                            </td>
                                            <td>{row?.jobType ?? "N/A"}</td>

                                            <td>{row?.subjectName ?? "N/A"}</td>

                                            <td>
                                                {row?.divisionNameBn ?? "N/A"}
                                            </td>

                                            <td>
                                                {row?.districtNameBn ?? "N/A"}
                                            </td>

                                            <td>{row?.thanaNameBn ?? "N/A"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="contentBoxBody mt-20"></div>
                <div className="contentBox-modified">
                    <div className="section-header-custom">
                        <h5 className="m-10 text-white">সংযুক্তি</h5>
                    </div>
                    <div className="contentBoxBody mt-20"></div>

                    <div className="table-responsive">
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
                                    {/* <th className="">
                                    <b>আবেদনকারীর মন্তব্য:</b>
                                </th> */}
                                </tr>
                                <tr>
                                    <td className="wd-350">
                                        <img
                                            src={UrlBuilder.fileServerApi(
                                                `${photoEncloserUrl}`
                                            )}
                                            alt="no image available"
                                            style={{
                                                padding: "10px",
                                                width: "150px",
                                            }}
                                        />
                                    </td>

                                    <td className="wd-350 ">
                                        <img
                                            src={UrlBuilder.fileServerApi(
                                                `${esignEncloserUrl}`
                                            )}
                                            alt="no image available"
                                            style={{
                                                padding: "10px",
                                                width: "150px",
                                            }}
                                        />
                                    </td>
                                    {/* <td className="wd-350 ">
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
                                </td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <Col md={12} className="mt-10 text-right ">
                    <input type="checkbox" checked={true} />
                    আমি উপরোক্ত সকল তথ্য সঠিক এই মৰ্মে সম্মতি প্রদান করছি
                </Col>
                {/* <Form>
                    <Col md={12} className="mb-10 mt-10">
                        <Button
                            variant=""
                            className="f-right btn-primary"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                            Submit
                        </Button>

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
                </Form> */}
            </div>
        </DefaultCard>
    );
};

export default ApplicationFullPreview;
