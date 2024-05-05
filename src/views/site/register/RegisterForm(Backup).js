import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Divider, Grid, Modal, Typography
} from "@mui/material";
import { Col, Form as ThemeForm, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "react-topbar-progress-indicator";
import { InputField, InputSelect } from "../../../components/form";
import InputSelectApi from "../../../components/form/InputSelectApi";
import { BasicTable } from "../../../components/table";
import ErrorMessage from "../../../components/text/ErrorMessage";
import EmployeeTypeStatus from "../../../constants/EmployeeTypeStatus";
import EmploymentType from "../../../constants/EmploymentType";
import GenderType from "../../../constants/GenderType";
import JobRecommendationType from "../../../constants/JobRecommendationType";
import PositionType from "../../../constants/PositionType";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import useListApi from "../../../hooks/useListApi";
import { callApi, clearState, selectApi } from "../../../reducers/apiSlice";
import "./Register.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegisterForm = ({ setFieldValue, resetForm, values, ...props }) => {

  const {
    InstituteTypeList = {
      data: {},
    },
    ntrcaData = {
      data: {},
    }
  } = useSelector(selectApi);

  const [imgState, setImgState] = useState({
    path: "",
  });
  const [isIndex, setIsIndex] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [recommendator, setRecommendator] = useState("");
  const [institute, setInstitute] = useState("");
  const [empoyeeType, setEmpoyeeType] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [preview, setPreview] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const dispatch = useDispatch();
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [ntrcaRoll, setNtrcaRoll] = useState("");
  const [jobRecommendationType, setJobRecommendationType] = useState("");

  const getFirstErrorKey = (object, keys = []) => {
    const firstErrorKey = Object.keys(object)[0];
    if (
      (typeof object[firstErrorKey] === "object" ||
        typeof object[firstErrorKey] === "function") &&
      object[firstErrorKey] !== null
    ) {
      return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
    }
    return [...keys, firstErrorKey].join(".");
  };

  useEffect(() => {
    if (!props.isValid && props.submitCount !== 0 && props.isSubmitting) {
      const firstErrorKey = getFirstErrorKey(props.errors);
      if (global.window.document.getElementsByName(firstErrorKey).length) {
        global.window.document.getElementsByName(firstErrorKey)[0].focus();
      }
    }
  }, [props.submitCount, props.isValid, props.errors, props.isSubmitting]);

  const tableProps = {
    headers: [
      { id: "", label: "select" },
      { id: "id", label: "Sl." },
      { id: "instituteNameBn", label: "Institute Name" },
      { id: "eiinNo", label: " EIIN" },
      { id: "instituteTypeNameBn", label: "Type" },
      { id: "managementNameBn", label: "Management" },
      { id: "divisionNameBn", label: "Division" },
      { id: "districtNameBn", label: "District" },
      { id: "thanaNameBn", label: "Thana" },
    ],
    perPage: [10, 25, 50, 100],
    config: {
      operationId: UrlBuilder.ntrcaApi(
        `employee/institute/all?page=${page}&size=${size}`
      ),
      output: "InstituteList",
      storeName: "InstituteList",
    },
    customStyle: {
      overflowY: "scroll",
      maxHeight: "250px",
    },
    meta: {},
    totalData: 0,
  };

  const {
    loading,
    data = {},
    meta
  } = useListApi(tableProps.config);
  tableProps.meta = meta;
  tableProps.totalData = data && data.length;

  const onPageChange = (pageNo) => {
    dispatch(
      callApi({
        operationId:
          searchValue === ""
            ? UrlBuilder.ntrcaApi(
              `employee/institute/all?page=${setPage.current}&size=${size}`
            )
            : UrlBuilder.ntrcaApi(
              `employee/institute/all?page=${setPage.current}&size=${size}search=${searchValue}`
            ),
        output: "InstituteList",
      })
    );
  };


  /**
   * Change the page size on table and update the state.
   * Fetch data by dispatching callApi.
   */
  const onSizeChange = (pageSize) => {
    setSize(pageSize);
    setPage.current = 1;
    dispatch(
      callApi({
        operationId: UrlBuilder.ntrcaApi(
          `employee/institute/all?page=${setPage.current}&size=${size}`
        ),
        output: "InstituteList",
      })
    );
  };

  const handleNTRCAData = () => {
    // setNtrcaRoll(ntrcaroll)
    dispatch(
      callApi({
        operationId: UrlBuilder.ntrcaApi(
          `employee/ntrca/applicant?examYear=${values.ntrcaExamYear}&rollNo=${values.ntrcaExamRollNumber}`
        ),
        output: "ntrcaData",
      })
    );
  }

  if (ntrcaData.data !== undefined &&
    ntrcaData.data.length > 0) {
    setFieldValue("employeeName", ntrcaData.data[0].applicantName ?? "");
    setFieldValue("employeeNameBn", ntrcaData.data[0].applicantNameBn ?? "");
    setFieldValue("fathersName", ntrcaData.data[0].fatherName ?? "");
    setFieldValue("mothersName", ntrcaData.data[0].motherName ?? "");
    setFieldValue("dateOfBirth", moment(ntrcaData.data[0].dob).format("YYYY-MM-DD") ?? "");
    setFieldValue("gender", ntrcaData.data[0].gender ?? "");
    setFieldValue("religion", ntrcaData.data[0].religion ?? "");
    setFieldValue("nid", ntrcaData.data[0].nid ?? "");
    setFieldValue("birthRegNo", ntrcaData.data[0].registrationNo ?? "");
    setFieldValue("emergencyContactMobile", ntrcaData.data[0].mobileNo ?? "");
    setFieldValue("emergencyContactEmail", ntrcaData.data[0].email ?? "");
    dispatch(
      clearState({
        output: "ntrcaData",
      })
    );
  }


  const onSearchByValue = (val) => {
    setSearchValue(val);
    setPage.current = 1;
    dispatch(
      callApi({
        operationId:
          val === ""
            ? UrlBuilder.ntrcaApi(
              `employee/institute/all?page=${setPage.current}&size=${size}`
            )
            : UrlBuilder.ntrcaApi(
              `employee/institute/all?page=${setPage.current}&size=${size}&search=${val}`
            ),
        output: "InstituteList",
      })
    );
  };

  const handleFileChange = (e) => {
    setImgState({
      ...imgState,
      path: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleIsIndexChange = (event) => {
    if (event.target.value > 0) {
      setIsIndex(parseInt(event.target.value));
      setFieldValue("isIndex", parseInt(event.target.value));
      setFieldValue("ntrcaExamRollNumber", "");
      setFieldValue("ntrcaExamYear", "");
      setJobRecommendationType("");
      setPreview("");
      setFilePreview("");
    }
    //props.resetForm();
  };

  const handleInstitutionChange = (event) => {
    if (event.target.value > 0) {
      setInstitute(parseInt(event.target.value));
      setFieldValue("employeeTypeName", parseInt(event.target.value));
    }
  };

  const handleEmployeeTypeChange = (event) => {
    if (event.target.value != 0) {
      setEmpoyeeType(event.target.value);
      setJobRecommendationType("");
      setFieldValue("employeeTypeStatus", event.target.value);
      setFieldValue("employeeName", "");
      setFieldValue("employeeNameBn", "");
      setFieldValue("fathersName", "");
      setFieldValue("mothersName", "");
      setFieldValue("dateOfBirth", "");
      setFieldValue("gender", "");
      setFieldValue("religion", "");
      setFieldValue("nid", "");
      setFieldValue("birthRegNo", "");
      setFieldValue("emergencyContactMobile", "");
      setFieldValue("emergencyContactEmail", "");

      setFieldValue("positionType", "");
      setFieldValue("employmentType", "");
      setFieldValue("designation", "");
      setFieldValue("subject", "");
      setFieldValue("institute", "");
      setFieldValue("instituteFieldValue", "");
      setFieldValue("activeInstituteId", "");
      setFieldValue("instituteId", "");
      setFieldValue("jobRecommendationType", "");
      setFieldValue("activeInstituteDateOfJoining", "");
      setFieldValue("ntrcaExamRollNumber", "");
      setFieldValue("ntrcaExamYear", "");
    }
  };

  const handleNTRCAChange = (event) => {
    if (event.target.value != 0) {
      setJobRecommendationType(event.target.value);
      //setFieldValue("employeeTypeStatus", "");
      setFieldValue("employeeName", "");
      setFieldValue("employeeNameBn", "");
      setFieldValue("fathersName", "");
      setFieldValue("mothersName", "");
      setFieldValue("dateOfBirth", "");
      setFieldValue("gender", "");
      setFieldValue("religion", "");
      setFieldValue("nid", "");
      setFieldValue("birthRegNo", "");
      setFieldValue("emergencyContactMobile", "");
      setFieldValue("emergencyContactEmail", "");

      setFieldValue("positionType", "");
      setFieldValue("employmentType", "");
      setFieldValue("designation", "");
      setFieldValue("subject", "");
      setFieldValue("institute", "");
      setFieldValue("instituteFieldValue", "");
      setFieldValue("activeInstituteId", "");
      setFieldValue("instituteId", "");
      setFieldValue("jobRecommendationType", event.target.value);
      setFieldValue("activeInstituteDateOfJoining", "");
      setFieldValue("ntrcaExamRollNumber", "");
      setFieldValue("ntrcaExamYear", "");
    }
  };

  const handleInstituteValue = (value) => {
    //setInstituteValue(value.eiinNo + " - " + value.instituteNameBn);
    setFieldValue(
      "instituteFieldValue",
      value.eiinNo + " - " + value.instituteNameBn
    );
    setFieldValue("institute", value.institute);
    setFieldValue("instituteValue", value.id);
    setFieldValue("activeInstituteId", value.id);
    setOpen(false);
  };

  const handleRecommendator = (value) => {
    setRecommendator(value);
    setFieldValue("jobRecommendationType", value);
  };

  if (values.divisionId == 1 || values.divisionId == "null") {
    values.divisionId = "";
    values.districtId = "";
    values.thanaId = "";
    values.unionId = "";
  }

  const filterData = () => {
    setPage.current = 1;
    dispatch(
      callApi({
        operationId: UrlBuilder.ntrcaApi(
          `employee/institute/all?instituteTypeId=${values.instituteTypeId}&divisionId=${values.divisionId}&managementId=${values.managementId}&districtId=${values.districtId}&thanaId=${values.thanaId}&eiinNo=${values.eiinNumber}&page=${setPage.current}&size=${size}`
        ),
        output: "InstituteList",
      })
    );
  };

  useEffect(() => {
    dispatch(
      callApi({
        operationId: UrlBuilder.ntrcaApi(`employee/institute-type/list`),
        output: "InstituteTypeList",
      })
    );
  }, []);

  const instituteTypeList = [];
  const instituteType = [];

  InstituteTypeList &&
    InstituteTypeList.data !== undefined &&
    InstituteTypeList.data.length > 0 &&
    InstituteTypeList.data.map((item, index) => {
      if (
        item.instituteTypeName == "SCHOOL" ||
        item.instituteTypeName == "COLLEGE"
      ) {
        instituteTypeList.push(item);
        instituteType.push(item);
      }

    });





  let gender_data = [
    { id: GenderType.MALE, name: "পুরুষ" },
    { id: GenderType.FEMALE, name: "মহিলা" },
    { id: GenderType.TRANS_GENDER, name: "ট্রান্সজেন্ডার" },
  ];


  return (
    <Form encType="multipart/form-data">
      <Box>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={8}
          sx={{ padding: 2, pb: 4 }}
        >
          <Grid item xs={12} md={6} lg={4}>
            <ThemeForm.Group className="mb-3">
              <ThemeForm.Label>আপনার কি ইনডেক্স নাম্বার আছে?</ThemeForm.Label>
              <ThemeForm.Select
                name="isIndex"
                id="isIndex"
                className="p-9"
                aria-label="Select ইনডেক্স নাম্বার"
                value={isIndex}
                onChange={handleIsIndexChange}
              >
                <option value="0">Select ইনডেক্স নাম্বার</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </ThemeForm.Select>
            </ThemeForm.Group>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ThemeForm.Group className="mb-3">
              <ThemeForm.Label>প্রতিষ্ঠানের ধরন নির্বাচন</ThemeForm.Label>
              <ThemeForm.Select
                name="employeeTypeName"
                id="employeeTypeName"
                className="p-9"
                aria-label="Select প্রতিষ্ঠানের ধরন"
                value={institute}
                onChange={handleInstitutionChange}
              >
                <option value="0">Select প্রতিষ্ঠানের ধরন</option>
                {instituteType.length > 0 && instituteType.map((item, index) => {
                  return (<option key={index} value={item.id}>{item.instituteTypeNameBn}</option>)


                })}

              </ThemeForm.Select>
            </ThemeForm.Group>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ThemeForm.Group className="mb-3">
              <ThemeForm.Label>পেশার ধরন</ThemeForm.Label>
              <ThemeForm.Select
                name="employeeTypeStatus"
                id="employeeTypeStatus"
                className="p-9"
                aria-label="Select পেশার ধরন"
                value={empoyeeType}
                onChange={handleEmployeeTypeChange}
              >
                <option value="0">Select পেশার ধরন</option>
                <option value={EmployeeTypeStatus.TEACHING_EMPLOYEE}>Teacher</option>
                <option value={EmployeeTypeStatus.NON_TEACHING_EMPLOYEE}>Employee</option>
              </ThemeForm.Select>
            </ThemeForm.Group>
          </Grid>
          {isIndex === 2 && values.employeeTypeStatus !== "" && (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <ThemeForm.Group className="mb-3">
                  <ThemeForm.Label>নিয়োগ সুপারিশকারী</ThemeForm.Label>
                  <ThemeForm.Select
                    name="jobRecommendationType"
                    id="jobRecommendationType"
                    className="p-9"
                    aria-label="Select নিয়োগ সুপারিশকারী"
                    value={jobRecommendationType}
                    onChange={handleNTRCAChange}
                  >
                    <option value="0">Select নিয়োগ সুপারিশকারী</option>
                    <option value={JobRecommendationType.NTRCA}>এনটিআরসিএ</option>
                    <option value={JobRecommendationType.GB_SMC}>নিয়োগ বোর্ড(জিবি/এসএমসি)</option>
                  </ThemeForm.Select>
                </ThemeForm.Group>
              </Grid>
              {values.jobRecommendationType ===
                JobRecommendationType.NTRCA && (
                  <>
                    <Grid item xs={12} md={6} lg={4}>
                      <InputSelect
                        label="পরীক্ষার বছর"
                        name="ntrcaExamYear"
                        type="number"
                        value="id"
                        data={[
                          { id: 2022, name: "2022" },
                          { id: 2021, name: "2021" },
                          { id: 2020, name: "2020" },
                        ]}
                        text="name"
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <InputField
                        label="এনটিআরসিএ পরীক্ষার রোল নাম্বার"
                        name="ntrcaExamRollNumber"
                        type="text"
                      //placeholder="Enter NTRCA Roll (if any)"
                      />
                      <ErrorMessage fieldName="ntrcaExamRollNumber" />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} alignSelf="end">
                      <Button onClick={handleNTRCAData} title="তথ্য খুঁজুন" variant="contained" disabled={values.ntrcaExamYear && values.ntrcaExamRollNumber ? false : true} className="btn-theme"> তথ্য খুঁজুন <FontAwesomeIcon className="pl-5" icon={faSearch} size="xl" />
                      </Button>
                    </Grid>
                  </>
                )}
            </>
          )
          }
        </Grid>
      </Box>
      {
        (isIndex !== null || institute !== null) &&
        isIndex === 1 &&
        institute > 0 &&
        values.employeeTypeStatus !== "" && (
          <Box>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={8}
              sx={{ padding: 2, pb: 4 }}
              alignItems="flex-end"
            >
              <Grid item xs={12} md={4}>
                <InputField
                  label="আইডি/ইনডেক্স নম্বর"
                  name="indexNo"
                  type="text"
                //placeholder="Enter index number"
                />
                <ErrorMessage fieldName="indexNo" />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" className="btn-theme ">
                  তথ্য খুঁজুন <FontAwesomeIcon className="pl-5" icon={faSearch} size="xl" />
                </Button>
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5">
              সাধারণ তথ্য
            </Typography>
            <Divider />
            <Grid
              container
              rowSpacing={4}
              columnSpacing={8}
              sx={{ padding: 2, pb: 4 }}
            >
              <Grid item xs={12} md={4}>
                <InputField
                  label="নাম (বাংলায়)"
                  name="employeeNameBn"
                  type="text"
                //placeholder="Enter Full Name (Bn)"
                />
                <ErrorMessage fieldName="employeeNameBn" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="নাম (ইংরেজিতে)"
                  name="employeeName"
                  type="text"
                //placeholder="Enter Full Name"
                />
                <ErrorMessage fieldName="employeeName" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="পিতার নাম (ইংরেজিতে)"
                  name="fathersName"
                  type="text"
                //placeholder="Enter Father's Name"
                />
                <ErrorMessage fieldName="fathersName" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="মাতার নাম (ইংরেজিতে)"
                  name="mothersName"
                  type="text"
                //placeholder="Enter Mother's Name"
                />
                <ErrorMessage fieldName="mothersName" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="জাতীয়তা"
                  name="nationality"
                  type="text"
                //placeholder="Enter Nationality"
                />
                <ErrorMessage fieldName="nationality" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="জন্মতারিখ"
                  name="dateOfBirth"
                  //placeholder="Enter Date Of Birth"
                  type="text"
                />
                <ErrorMessage fieldName="dateOfBirth" />
              </Grid>

              <Grid item xs={12} md={4}>
                <label className="mb-10">পুরুষ/মহিলা</label>
                <InputSelect
                  name="gender"
                  type="text"
                  value="id"
                  data={gender_data}
                  text="name"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="জাতীয় পরিচয়পত্র নম্বর"
                  name="nid"
                  type="text"
                //placeholder="Enter NID Number"
                />
                <ErrorMessage fieldName="nid" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="জন্ম নিবন্ধন নম্বর"
                  name="birthRegNo"
                  type="text"
                //placeholder="Enter Birth Reg Number"
                />
                <ErrorMessage fieldName="birthRegNo" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="মোবাইল নম্বর"
                  name="emergencyContactMobile"
                  type="text"
                //placeholder="Enter Contact Number"
                />
                <ErrorMessage fieldName="emergencyContactMobile" />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="ই-মেইল"
                  name="emergencyContactEmail"
                  type="email"
                //placeholder="Enter Email address"
                />
                <ErrorMessage fieldName="emergencyContactEmail" />
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={8}
              sx={{ padding: 2, pb: 4 }}
            >
              <Grid item xs={12} md={4}>
                <label className="mb-10">বর্তমান পদের ধরন</label>
                <InputSelect
                  name="designation"
                  type="number"
                  value="id"
                  data={[
                    {
                      id: 1,
                      name: "Junior Instructor - জুনিয়র ইন্সট্রাক্টর",
                    },
                    { id: 2, name: "ASSISTANT PROFESSOR - সহকারী অধ্যাপক" },
                    { id: 3, name: "SENIOR LECTURER - জ্যেষ্ঠ প্রভাষক" },
                  ]}
                  text="name"
                />
              </Grid>
            </Grid>
            <Grid
              container
              //rowSpacing={4}
              columnSpacing={2}
              direction="row-reverse"
              sx={{ padding: 2, pb: 4 }}
            >
              <Grid item xs={12} md={2}>
                <Button
                  variant=""
                  className="mt-2 btn-theme btn-block"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant=""
                  className="mt-2 btn-theme btn-block"
                //type="text"
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Box>
        )
      }
      {
        (isIndex !== null || institute !== null) &&
        isIndex === 2 &&
        institute > 0 &&
        values.employeeTypeStatus !== "" && values.jobRecommendationType !== "" && (
          <Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  প্রতিষ্ঠান নির্বাচন
                </Typography>
                <Divider />
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={2}
                >
                  <Grid item xs={12} sm={3} md={3}>
                    <InputField
                      label="EIIN নম্বর"
                      name="eiinNumber"
                      type="text"
                    //placeholder="Enter EIIN Number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                    <InputSelect
                      label="Institute Type"
                      name="instituteTypeId"
                      value="id"
                      data={instituteTypeList}
                      text="instituteTypeNameBn"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <InputSelectApi
                      label="Management"
                      name="managementId"
                      operationId={UrlBuilder.ntrcaApi(
                        "employee/management/list"
                      )}
                      storeName="management"
                      value="id"
                      text="managementNameBn"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <InputSelectApi
                      label="Division"
                      name="divisionId"
                      operationId={UrlBuilder.ntrcaApi(
                        "employee/division/list"
                      )}
                      storeName="division"
                      value="id"
                      text="divisionNameBn"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <InputSelectApi
                      label="District"
                      name="districtId"
                      operationId={
                        values.divisionId !== "null"
                          ? UrlBuilder.ntrcaApi(
                            `employee/district/all?divisionId=${values.divisionId}`
                          )
                          : ""
                      }
                      storeName="district"
                      value="id"
                      text="districtNameBn"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <InputSelectApi
                      label="Thana"
                      name="thanaId"
                      operationId={
                        values.districtId
                          ? UrlBuilder.ntrcaApi(
                            `employee/thana/all?districtId=${values.districtId}`
                          )
                          : ""
                      }
                      storeName="thana"
                      value="id"
                      text="thanaNameBn"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <InputSelectApi
                      label="Union"
                      name="unionId"
                      operationId={
                        values.thanaId
                          ? UrlBuilder.ntrcaApi(
                            `employee/union/all?thanaId=${values.thanaId}`
                          )
                          : ""
                      }
                      storeName="union"
                      value="id"
                      text="unionNameBn"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3} className="pt-30">
                    <Button
                      variant="contained"
                      color="success"
                      className="mt-2"
                      //type="text"
                      onClick={() => {
                        filterData();
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                {loading && <ProgressBar />}
                <BasicTable
                  {...tableProps}
                  onSizeChange={(pageSize) => onSizeChange(pageSize)}
                  onPageChange={(pageNo) => {
                    setPage.current = pageNo;
                    onPageChange(pageNo);
                  }}
                  onSearch={(searchVal) => onSearchByValue(searchVal)}
                  isTableCustomStyle={true}
                  searchOption={false}
                  sizeOption={false}
                >
                  {data !== undefined &&
                    JSON.parse(JSON.stringify(data)).map((row, index) => (
                      <tr key={index}>
                        <td>
                          <Button
                            sx={{
                              '&:hover': {
                                backgroundColor: 'green',
                                color: 'white',
                              },
                            }}
                            variant="text"
                            size="small"
                            onClick={() => handleInstituteValue(row)}
                            title="Click To Select"
                          >
                            Select
                          </Button>
                        </td>
                        <td>
                          <span>{row.id}</span>
                        </td>
                        <td>
                          <span className="text-center">
                            {row.instituteNameBn}
                          </span>
                        </td>
                        <td>
                          <span className="text-center">{row.eiinNo}</span>
                        </td>
                        <td>
                          <span className="text-center">
                            {row.instituteTypeNameBn}
                          </span>
                        </td>
                        <td>
                          <span className="text-center">
                            {row.managementNameBn}
                          </span>
                        </td>
                        <td>
                          <span className="text-center">
                            {row.divisionNameBn}
                          </span>
                        </td>
                        <td>
                          <span className="text-center">
                            {row.districtNameBn}
                          </span>
                        </td>
                        <td>
                          <span className="text-center">{row.thanaNameBn}</span>
                        </td>
                      </tr>
                    ))}
                </BasicTable>
                <Grid
                  container
                  direction={"row-reverse"}
                  //columns={15}
                  sx={{ py: 1, pr: 0 }}
                >
                  <Grid
                    item
                    xs={6}
                    md={1}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      বাতিল
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
            <Row className="p-20 pb-4 gx-6 gy-2">
              <Col xs={12} md={12} className="mb-10">
                <h4 className="text-start">
                  সাধারণ তথ্য
                </h4>
                <hr className="border border-info border-1" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="নাম (বাংলায়)"
                  name="employeeNameBn"
                  type="text"
                  //placeholder="Enter Full Name (Bn)"
                  required={true}
                />
                <ErrorMessage fieldName="employeeNameBn" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="নাম (ইংরেজিতে)"
                  name="employeeName"
                  type="text"
                  //placeholder="Enter Full Name"
                  required={true}
                />
                <ErrorMessage fieldName="employeeName" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="পিতার নাম (ইংরেজিতে)"
                  name="fathersName"
                  type="text"
                  //placeholder="Enter Father's Name"
                  required={true}
                />
                <ErrorMessage fieldName="fathersName" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="মাতার নাম (ইংরেজিতে)"
                  name="mothersName"
                  type="text"
                  //placeholder="Enter Mother's Name"
                  required={true}
                />
                <ErrorMessage fieldName="mothersName" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="জন্মতারিখ"
                  name="dateOfBirth"
                  //placeholder="Enter Date Of Birth"
                  required={true}
                  type="date"
                />
                <ErrorMessage fieldName="dateOfBirth" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputSelect
                  name="gender"
                  label="পুরুষ/মহিলা"
                  type="number"
                  value="id"
                  data={gender_data}
                  text="name"
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputSelectApi
                  label="ধর্ম"
                  name="religion"
                  operationId={UrlBuilder.ntrcaApi("employee/religion/all")}
                  storeName="religionList"
                  type="text"
                  value="id"
                  required={true}
                  text="religionNameBn"
                />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="জাতীয় পরিচয়পত্র নম্বর"
                  name="nid"
                  type="text"
                  placeholder="উদাহরণ- ৭৪৫০১২৫৪০২"
                  required={true}
                />
                <ErrorMessage fieldName="nid" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="জন্ম সনদ নম্বর"
                  name="birthRegNo"
                  type="text"
                  placeholder="উদাহরণ- ১৯৯৪৪৫৮৭৪৫০১২৫৪০২"
                />
                <ErrorMessage fieldName="birthRegNo" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputSelect
                  label="জাতীয়তা"
                  name="nationality"
                  type="text"
                  value="id"
                  data={[
                    {
                      id: "Bangladeshi",
                      name: "Bangladeshi",
                    },
                  ]}
                  text="name"
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputSelectApi
                  label="নিজ জেলা"
                  name="homeDistrict"
                  operationId={UrlBuilder.ntrcaApi("employee/district/all")}
                  storeName="districtList"
                  type="text"
                  value="id"
                  required={true}
                  text="districtNameBn"
                />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="মোবাইল নম্বর"
                  name="emergencyContactMobile"
                  type="text"
                  placeholder="8801XXXXXXXXX"
                  required={true}
                />
                <ErrorMessage fieldName="emergencyContactMobile" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <InputField
                  label="ই-মেইল"
                  name="emergencyContactEmail"
                  type="email"
                  placeholder="name@example.com"
                  required={true}
                />
                <ErrorMessage fieldName="emergencyContactEmail" />
              </Col>
            </Row>
            {values.employeeTypeStatus === "TEACHING_EMPLOYEE" && (
              <>
                <Row className="p-20 pb-4 gx-6 gy-2">
                  <Col xs={12} md={12} className="mb-10">
                    <h4 className="text-start">
                      কর্মস্থলের তথ্য
                    </h4>
                    <hr className="border border-info border-1" />
                  </Col>
                  <Col xs={12} md={6} className="mb-10">
                    <InputSelect
                      label="পদের ধরন"
                      name="positionType"
                      type="number"
                      value="id"
                      data={[
                        { id: PositionType.GENERAL, name: "সাধারণ" },
                        { id: PositionType.ADMINISTRATIVE, name: "প্রশাসনিক" },
                      ]}
                      required={true}
                      text="name"
                    />
                  </Col>
                  <Col xs={12} md={6} className="mb-10">
                    <InputSelect
                      label="চাকরির ধরন"
                      name="employmentType"
                      type="text"
                      value="id"
                      data={[
                        { id: EmploymentType.PERMANENT, name: "FULL TIME" },
                        { id: EmploymentType.PARTTIME, name: "PART TIME" },
                      ]}
                      required={true}
                      text="name"
                    />
                  </Col>
                  <Col xs={12} md={6} className="mb-10">
                    <InputSelectApi
                      label="বর্তমান পদের ধরন"
                      name="designation"
                      operationId={UrlBuilder.ntrcaApi(
                        `employee/designation/list?instituteTypeId=${values.employeeTypeName}&isGovt=false&positionType=${values.positionType}`
                      )}
                      storeName="designationList"
                      type="text"
                      value="id"
                      required={true}
                      text="designationNameBn"
                    />
                  </Col>
                  <Col xs={12} md={6} className="mb-10">
                    <InputSelectApi
                      label="বিষয়"
                      name="subject"
                      //TODO api call decision issue
                      operationId={UrlBuilder.ntrcaApi(
                        `employee/subject/list?instituteTypeId=${values.employeeTypeName}`
                      )}
                      storeName="subjectList"
                      type="text"
                      value="id"
                      required={true}
                      text="subjectNameBn"
                    />
                  </Col>
                  <Col xs={12} md={6} className="mb-10">
                    <label className="mb-10">
                      প্রতিষ্ঠান নির্বাচন{" "}
                      <abbr style={{ color: "red" }} className="req">
                        *
                      </abbr>
                    </label>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <InputField
                        //label="প্রতিষ্ঠান নির্বাচন"
                        error={
                          props.touched.activeInstituteId &&
                            props.errors.activeInstituteId
                            ? true
                            : false
                        }
                        name="institute"
                        type="text"
                        value={values.instituteFieldValue}
                        readOnly
                        disabled
                      //required={true}
                      />
                      <FontAwesomeIcon
                        onClick={handleOpen}
                        icon={faSearch}
                        size="xl"
                        color="gray"
                        className="pl-5"
                      />
                      <input
                        name="activeInstituteId"
                        type="hidden"
                        value={instituteId}
                      />
                    </Box>
                    <ErrorMessage fieldName="institute" />
                  </Col>

                  <Col xs={12} md={6} className="mb-10">
                    <InputField
                      label="যোগদানের তারিখ"
                      name="activeInstituteDateOfJoining"
                      //placeholder="Enter Joining Date"
                      type="date"
                      required={true}
                    />
                    <ErrorMessage fieldName="activeInstituteDateOfJoining" />
                  </Col>

                  {values.employeeTypeStatus === "NON_TEACHING_EMPLOYEE" && (
                    <>
                      <Col xs={12} md={6} className="mb-10">
                        <InputSelect
                          label="পদের ধরন"
                          name="positionType"
                          type="text"
                          value="id"
                          data={[
                            {
                              id: PositionType.NON_GOVT_EMPLOYEE,
                              name: "বেসরকারি কর্মচারী",
                            },
                          ]}
                          required={true}
                          text="name"
                        />
                      </Col>
                      <Col xs={12} md={6} className="mb-10">
                        <InputSelect
                          label="চাকরির ধরন"
                          name="employmentType"
                          type="text"
                          value="id"
                          data={[
                            { id: EmploymentType.PERMANENT, name: "FULL TIME" },
                            { id: EmploymentType.PARTTIME, name: "PART TIME" },
                          ]}
                          required={true}
                          text="name"
                        />
                      </Col>
                      <Col xs={12} md={6} className="mb-10">
                        <InputSelectApi
                          label="বর্তমান পদের ধরন"
                          name="designation"
                          operationId={UrlBuilder.ntrcaApi(
                            `employee/designation/list?instituteTypeId=${values.employeeTypeName}&isGovt=false&positionType=${values.positionType}`
                          )}
                          storeName="designationList"
                          type="text"
                          value="id"
                          required={true}
                          text="designationNameBn"
                        />
                      </Col>
                      <Col xs={12} md={6} className="mb-10">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <InputField
                            label="প্রতিষ্ঠান নির্বাচন"
                            error={
                              props.touched.activeInstituteId &&
                                props.errors.activeInstituteId
                                ? true
                                : false
                            }
                            name="institute"
                            type="text"
                            value={values.instituteFieldValue}
                            readOnly
                            disabled
                            required={true}
                          />
                          <FontAwesomeIcon
                            onClick={handleOpen}
                            icon={faSearch}
                            size="xl"
                            className="pl-5"
                          />
                          <input
                            name="activeInstituteId"
                            type="hidden"
                            value={instituteId}
                          />
                        </Box>
                      </Col>

                      <Col xs={12} md={6} className="mb-10">
                        <InputField
                          label="যোগদানের তারিখ"
                          name="activeInstituteDateOfJoining"
                          //placeholder="Enter Joining Date"
                          type="date"
                          required={true}
                        />
                        <ErrorMessage fieldName="activeInstituteDateOfJoining" />
                      </Col>
                    </>
                  )}
                </Row>
              </>
            )}
            <Row className="p-20 pb-4 gx-6 gy-2">
              <Col xs={12} md={12} className="mb-10">
                <h4 className="text-start">
                  সংযুক্তি
                </h4>
                <hr className="border border-info border-1" />
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <label className="mb-10">
                  ছবি{" "}
                  <abbr style={{ color: "red" }} className="req">
                    *
                  </abbr>
                  <br />
                  <ul>
                    <li> photo format (jpg, jpeg, png)</li>
                    <li> file size must be 160kb or less</li>
                  </ul>
                </label>

                {preview && (
                  <img
                    src={preview}
                    onError={(i) => (i.target.style.display = "none")}
                    height="200px"
                  />
                )}

                <input
                  //required
                  id="employeeImage"
                  name="employeeImage"
                  type="file"
                  className={`form-control ${props.touched.employeeImage && props.errors.employeeImage
                    ? "is-invalid"
                    : ""
                    }`}
                  onChange={(event) => {
                    setFieldValue(
                      "employeeImage",
                      event.currentTarget.files[0]
                    );
                    event.target.files.length !== 0
                      ? setPreview(URL.createObjectURL(event.target.files[0]))
                      : setPreview("");
                  }}
                />
                {props.errors.employeeImage && (
                  <div id="feedback" className="invalid-feedback">
                    {props.errors.employeeImage}
                  </div>
                )}
              </Col>
              <Col xs={12} md={6} className="mb-10">
                <label className="mb-10">
                  নিয়োগ সংক্রান্ত সংযুক্তি(নিয়োগ ও যোগদানপত্র){" "}
                  <abbr style={{ color: "red" }} className="req">
                    *
                  </abbr>
                  <br />
                  <ul>
                    <li> file format (jpg, jpeg, png, pdf, docx)</li>
                    <li> total file size must be 5mb or less</li>
                  </ul>
                </label>

                <input
                  //required
                  id="employeeAppoinment"
                  name="employeeAppoinment"
                  type="file"
                  className={`form-control ${props.touched.employeeAppoinment &&
                    props.errors.employeeAppoinment
                    ? "is-invalid"
                    : ""
                    }`}
                  onChange={(event) => {
                    setFieldValue(
                      "employeeAppoinment",
                      event.currentTarget.files
                    );
                    // event.target.files.length !== 0
                    //   ? setFilePreview(URL.createObjectURL(event.target.files))
                    //   : setFilePreview("");
                  }}
                  multiple
                />
                {props.errors.employeeAppoinment && (
                  <div id="feedback" className="invalid-feedback">
                    {props.errors.employeeAppoinment}
                  </div>
                )}
              </Col>
            </Row>
            <Row className="p-20 pb-4 gx-6 gy-2 justify-content-end">
              <Col xs={12} md={2} className="mb-10">
                <Button
                  variant=""
                  className="mt-2 btn-theme btn-block"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Box>
        )
      }
    </Form >
  );
};

export default RegisterForm;
