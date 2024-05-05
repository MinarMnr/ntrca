import React from "react";
import { DefaultCard } from "components/card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button } from "@themesberg/react-bootstrap";
import {
    faCloudDownloadAlt,
    faList,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import applicantImage from "./images/ap_img.jpg";
import signature from "./images/sig.png";

const ChoiceList = () => {
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
                                    <td>মাসুদ হোসাইন</td>
                                    <td>
                                        <b>প্রতিষ্ঠানের ধরন</b>
                                    </td>
                                    <td>স্কুল</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Batch</b>
                                    </td>
                                    <td>16</td>
                                    <td>
                                        <b>Roll</b>
                                    </td>
                                    <td>0125</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Registration Number</b>
                                    </td>
                                    <td>11001101</td>
                                    <td>
                                        <b>Total Selected Institute</b>
                                    </td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Application Track Number</b>
                                    </td>
                                    <td>35663462</td>
                                    <td>
                                        <b>Payment Status</b>
                                    </td>
                                    <td className="btn-success">35663462</td>
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
                                    <td>Md. Abu Hanif</td>
                                    <td>
                                        <b>মায়ের নাম</b>
                                    </td>
                                    <td>Nurun Nahar</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>জন্ম তারিখ</b>
                                    </td>
                                    <td>25/09/1998</td>
                                    <td>
                                        <b>জাতীয় পরিচয়পত্র নম্বর</b>
                                    </td>
                                    <td>123567894444</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>মোবাইল নম্বর</b>
                                    </td>
                                    <td>0170325818</td>
                                    <td>
                                        <b>ইমেইল</b>
                                    </td>
                                    <td>tanvir@test.com</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>বর্তমান ঠিকানা</b>
                                    </td>
                                    <td>
                                        উপজেলা: Nabinagar, জেলা: Gazipur, বিভাগ:
                                        Dhaka, পদবি কোড:1230
                                    </td>
                                    <td>
                                        <b>স্থায়ী ঠিকানা</b>
                                    </td>
                                    <td>
                                        উপজেলা: Nabinagar, জেলা: Gazipur, বিভাগ:
                                        Dhaka, পদবি কোড:1230
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
                                <tr>
                                    <td>
                                        <b>স্নাতক (সম্মান)</b>
                                    </td>
                                    <td>Dhaka University</td>
                                    <td>
                                        <b>Dhaka</b>
                                    </td>
                                    <td>2020</td>
                                    <td>4.00/4.00</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>এইচএসসি</b>
                                    </td>
                                    <td>Dhaka Commerce College</td>
                                    <td>
                                        <b>Dhaka</b>
                                    </td>
                                    <td>2016</td>
                                    <td>5.00/5.00</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>এসএসসি</b>
                                    </td>
                                    <td>
                                        Sahajuddin Sarkar Model School And
                                        College
                                    </td>
                                    <td>
                                        <b>Dhaka</b>
                                    </td>
                                    <td>2014</td>
                                    <td>5.00/5.00</td>
                                </tr>
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
                                        ক্রঃ নঃ
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
                                    <th style={{ verticalAlign: "middle" }}>
                                        অর্ডার
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>9</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>9</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>8</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>7</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Satkhira High School</td>
                                    <td>Assistant Teacher(ICT)</td>
                                    <td>MPO</td>

                                    <td>ICT</td>

                                    <td>Khulna</td>

                                    <td>Satkhira</td>

                                    <td>Satkhira Sadar</td>
                                    <td>1</td>
                                </tr>
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

export default ChoiceList;
