import React from "react";

/*
|--------------------------------------------------------------------------
| Site routes
|--------------------------------------------------------------------------
*/

// HomePage
const Home = React.lazy(() => import("./views/site/home/HomePage"));
const Login = React.lazy(() => import("./views/site/login/LoginPage"));
const ResetPassword = React.lazy(() =>
  import("./views/site/login/ResetPassword")
);
const Register = React.lazy(() => import("./views/site/register/RegisterPage"));
const NidAdd = React.lazy(() => import("./views/site/nid/NidAdd"));

const siteRoutes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/register", exact: true, name: "Register", component: Register },
  { path: "/nidAdd", exact: true, name: "nid", component: NidAdd },
  {
    path: "/reset-password",
    exact: true,
    name: "ResetPassword",
    component: ResetPassword,
  },
];

// dashboard
const Dashboard = React.lazy(() =>
  import("./views/portal/dashboard/Dashboard")
);

//applicants Details page

// Application

const ChoiceList = React.lazy(() =>
  import("./views/portal/postingManagement/Application/PreviewForm")
);

const InstituteAdd = React.lazy(() =>
  import("./views/portal/postingManagement/Application/InstituteForm")
);

//Posting Management
const VacantPostsList = React.lazy(() =>
  import("./views/portal/postingManagement/VacancyManagement/VacantPostsList")
);
const VacantPostDetails = React.lazy(() =>
  import("./views/portal/postingManagement/VacancyManagement/VacantPostDetails")
);

const ApplicationApply = React.lazy(() =>
  import("./views/portal/postingManagement/Application/ApplicationApply")
);

const ApplicationList = React.lazy(() =>
  import("./views/portal/postingManagement/Application/ApplicationList")
);

const ApplicationAttachment = React.lazy(() =>
  import("./views/portal/postingManagement/Application/ApplicationAttachment")
);

const ApplicationPreview = React.lazy(() =>
  import("./views/portal/postingManagement/Application/ApplicationPreview")
);

const ApplicationFullPreview = React.lazy(() =>
  import("./views/portal/postingManagement/Application/ApplicationFullPreview")
);

const NtrcaGeneralInfo = React.lazy(() =>
  import("./views/portal/postingManagement/Application/GeneralInfoForm")
);

const Attachment = React.lazy(() =>
  import("./views/portal/postingManagement/Application/Attachment")
);

//Subject Wise Post
const SubjectWisePostList = React.lazy(() =>
  import("./views/portal/settings/subjectwisepostmaping/SubjectWisePostList")
);
const SubjectWisePostAdd = React.lazy(() =>
  import("./views/portal/settings/subjectwisepostmaping/SubjectWisePostAdd")
);

const SubjectWisePostEdit = React.lazy(() =>
  import("./views/portal/settings/subjectwisepostmaping/SubjectWisePostEdit")
);

//Experience Subject Wise Post
const ExperienceSubjectWisePostList = React.lazy(() =>
  import(
    "./views/portal/settings/experiencesubjectwisepostmaping/ExperienceSubjectWisePostList"
  )
);
const ExperienceSubjectWisePostAdd = React.lazy(() =>
  import(
    "./views/portal/settings/experiencesubjectwisepostmaping/ExperienceSubjectWisePostAdd"
  )
);

//Govt-Regulation
const GovtRegulationList = React.lazy(() =>
  import("./views/portal/settings/GovtRegulation/GovtRegulationList")
);
const GovtRegulationAdd = React.lazy(() =>
  import("./views/portal/settings/GovtRegulation/GovtRegulationAdd")
);

const GovtRegulationEdit = React.lazy(() =>
  import("./views/portal/settings/GovtRegulation/GovtRegulationEdit")
);
//rules

const RulesList = React.lazy(() =>
  import("./views/portal/settings/rules/RulesList")
);
const RulesAdd = React.lazy(() =>
  import("./views/portal/settings/rules/RulesAdd")
);

const RulesEdit = React.lazy(() =>
  import("./views/portal/settings/rules/RulesEdit")
);
const RulesDetails = React.lazy(() =>
  import("./views/portal/settings/rules/RulesDetails")
);
// Regulations
const RegulationList = React.lazy(() =>
  import("./views/portal/settings/regulations/RegulationList")
);
const RegulationEdit = React.lazy(() =>
  import("./views/portal/settings/regulations/RegulationEdit")
);
const RegulationAdd = React.lazy(() =>
  import("./views/portal/settings/regulations/RegulationAdd")
);
const RegulationDetails = React.lazy(() =>
  import("./views/portal/settings/regulations/RegulationDetails")
);

//post

const PostList = React.lazy(() =>
  import("./views/portal/settings/teacherPost/TeacherPostList")
);
const PostAdd = React.lazy(() =>
  import("./views/portal/settings/teacherPost/TeacherPostAdd")
);
const PostEdit = React.lazy(() =>
  import("./views/portal/settings/teacherPost/TeacherPostEdit")
);
const PostShow = React.lazy(() =>
  import("./views/portal/settings/teacherPost/TeacherPostShow")
);

// Result

const ResultList = React.lazy(() => import("./views/portal/result/ResultList"));
const ResultGenerate = React.lazy(() =>
  import("./views/portal/result/ResultGenerate")
);
const GeneratedResult = React.lazy(() =>
  import("./views/portal/result/GeneratedResult")
);

const PhaseWiseGeneratedResult = React.lazy(() =>
  import("./views/portal/result/PhaseWiseList")
);
const SelectionProcessApplicantList = React.lazy(() =>
  import("./views/portal/result/SelectionProcessList")
);
const SelectionProcessSelectedApplicantList = React.lazy(() =>
  import("./views/portal/result/SelectedProcessApplicant")
);

// Applicant List
const CertifiedApplicantsList = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantsList")
);
const CertifiedApplicantsAdd = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantsAdd")
);
const CertifiedApplicantsPreviousUploadingList = React.lazy(() =>
  import(
    "./views/portal/certifiedApplicants/CertifiedApplicantsPreviousUploadingList"
  )
);

const CertifiedApplicantsNotUploadingList = React.lazy(() =>
  import(
    "./views/portal/certifiedApplicants/CertifiedApplicantsNotUploadingList"
  )
);

const CertifiedApplicantsDetail = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantsDetail")
);
const CertifiedApplicantsUploadFile = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantsUploadFile")
);

const CertifiedApplicantsEdit = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantsEdit")
);

// designation

const DesignationList = React.lazy(() =>
  import("./views/portal/settings/designation/DesignationList")
);
const DesignationAdd = React.lazy(() =>
  import("./views/portal/settings/designation/DesignationAdd")
);
const DesignationEdit = React.lazy(() =>
  import("./views/portal/settings/designation/DesignationEdit")
);
const DesignationShow = React.lazy(() =>
  import("./views/portal/settings/designation/DesignationShow")
);

const SubjectList = React.lazy(() =>
  import("./views/portal/settings/subject/SubjectList")
);
const SubjectAdd = React.lazy(() =>
  import("./views/portal/settings/subject/SubjectAdd")
);
const SubjectEdit = React.lazy(() =>
  import("./views/portal/settings/subject/SubjectEdit")
);
const SubjectShow = React.lazy(() =>
  import("./views/portal/settings/subject/SubjectShow")
);

const DesWiseSubjectList = React.lazy(() =>
  import("./views/portal/settings/desWiseSubject/DesWiseSubjectList")
);
const DesWiseSubjectAdd = React.lazy(() =>
  import("./views/portal/settings/desWiseSubject/DesWiseSubjectAdd")
);
const DesWiseSubjectEdit = React.lazy(() =>
  import("./views/portal/settings/desWiseSubject/DesWiseSubjectEdit")
);
const DesWiseSubjectShow = React.lazy(() =>
  import("./views/portal/settings/desWiseSubject/DesWiseSubjectShow")
);
const BatchList = React.lazy(() =>
  import("./views/portal/settings/batch/BatchList")
);
const BatchAdd = React.lazy(() =>
  import("./views/portal/settings/batch/BatchAdd")
);
const BatchEdit = React.lazy(() =>
  import("./views/portal/settings/batch/BatchEdit")
);
const PoliceVerificationList = React.lazy(() =>
  import("./views/portal/settings/policeVerification/PoliceVerificationList")
);
const PoliceVerificationAdd = React.lazy(() =>
  import("./views/portal/settings/policeVerification/PoliceVerificationAdd")
);
// const BatchEdit = React.lazy(() =>
//   import("./views/portal/settings")
// );
const QuotaList = React.lazy(() =>
  import("./views/portal/settings/quota/QuotaList")
);
const QuotaAdd = React.lazy(() =>
  import("./views/portal/settings/quota/QuotaAdd")
);
const QuotaEdit = React.lazy(() =>
  import("./views/portal/settings/quota/QuotaEdit")
);
const QuotaShow = React.lazy(() =>
  import("./views/portal/settings/quota/QuotaShow")
);
const CircularList = React.lazy(() =>
  import("./views/portal/settings/circular/CircularList")
);
const ApplicantCircularList = React.lazy(() =>
  import("./views/portal/applicant/ApplicantCircularList")
);

const CertifiedApplicantsNidAddRequest = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantsNidAddRequest")
);
const CertifiedApplicantRegisterList = React.lazy(() =>
  import("./views/portal/certifiedApplicants/CertifiedApplicantRegisterList")
);

const SelectedApplicantJoiningList = React.lazy(() =>
  import("./views/portal/certifiedApplicants/SelectedApplicantJoiningList")
);
const CircularAdd = React.lazy(() =>
  import("./views/portal/settings/circular/CircularAdd")
);
const CircularEdit = React.lazy(() =>
  import("./views/portal/settings/circular/CircularEdit")
);

const CircularPdf = React.lazy(() =>
  import("./views/portal/settings/circular/CircularPdf")
);
const CircularDetails = React.lazy(() =>
  import("./views/portal/settings/circular/CircularDetails")
);

const PhaseWiseCircularAdd = React.lazy(() =>
  import("./views/portal/settings/circular/PhaseWiseCircularAdd")
);

const PhaseWiseCircularEdit = React.lazy(() =>
  import("./views/portal/settings/circular/PhaseWiseCircularEdit")
);

//settings form
const RecommendationLetterAdd = React.lazy(() =>
  import("./views/portal/settings/recommendation/RecommendationLetterAdd")
);
const RecommendationLetterEdit = React.lazy(() =>
  import("./views/portal/settings/recommendation/RecommendationLetterEdit")
);

const RecommendationList = React.lazy(() =>
  import("./views/portal/settings/recommendation/RecommendationList")
);

const eRequisitionCircular = React.lazy(() =>
  import("./views/portal/eRequisitionCircular/ErequisitionCircularAdd")
);
const eRequisitionCircularList = React.lazy(() =>
  import("./views/portal/eRequisitionCircular/ErequisitionCircularList")
);

const eRequisitionDetail = React.lazy(() =>
  import("./views/portal/eRequisitionCircular/ErequisitionCircularDetail")
);

const eRequisitionEdit = React.lazy(() =>
  import("./views/portal/eRequisitionCircular/ErequisitionCircularEdit")
);

// const eRequisitionCircularDetails = React.lazy(() =>
//   import("./views/portal/eRequisitionCircular/ErequisitionCircularDetails")
// );
const OTPPage = React.lazy(() => import("./views/portal/payment/OTPDeatils"));
const PaymentPage = React.lazy(() =>
  import("./views/portal/payment/PaymentPage")
);
const PaymentMethod = React.lazy(() =>
  import("./views/portal/payment/PaymentMethod")
);
const SelectedApplicantList = React.lazy(() =>
  import("./views/portal/applicant/SelectedApplicantList")
);

const SmsTemplate = React.lazy(() => import("./views/portal/SMS/smsTemplate"));
const MeritList = React.lazy(() =>
  import("./views/portal/applicant/MeritList")
);
const MeritListGenarate = React.lazy(() =>
  import("./views/portal/applicant/MeritListGenarate")
);
const WaitingList = React.lazy(() =>
  import("./views/portal/applicant/WaitingList")
);

//Settings
const uploadCertificate = React.lazy(() =>
  import("./views/portal/settings/certificateup/CertificateList")
);
const uploadCertificateAdd = React.lazy(() =>
  import("./views/portal/settings/certificateup/CertificateAdd")
);
const JobRequisitionList = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/JobRequisitionList")
);

const JobRequisitionSubmittedList = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/JobRequisitionSubmittedList")
);

const ReplaceApplicantList = React.lazy(() =>
  import("./views/portal/replaceApplicant/ReplaceApplicantList")
);
const NewERequistionList = React.lazy(() =>
  import("./views/portal/newERequistion/NewERequistionList")
);
const NewERequistionDetails = React.lazy(() =>
  import("./views/portal/newERequistion/NewERequistionDetails")
);
const RequisitionDetails = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/RequisitionDetails")
);

const JobApplyAdd = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/JobApplyAdd")
);
const JobApplyEdit = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/JobApplyEdit")
);

const JobApplyDetail = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/JobApplyDetail")
);
const JobApplicantDetails = React.lazy(() =>
  import("./views/portal/instituteJobRequisition/JobApplicantDetails")
);

const filledPostsList = React.lazy(() =>
  import("./views/portal/filledPosts/filledPostsList")
);

//Reviewer
const RequisitionList = React.lazy(() =>
  import("./views/portal/reviewer/RequisitionList")
);

const RequisitionDetail = React.lazy(() =>
  import("./views/portal/reviewer/RequisitionDetails")
);

// Institute Profile

const ProfileAdd = React.lazy(() =>
  import("./views/portal/InstituteProfile/ProfileAdd")
);

const ApproveReview = React.lazy(() =>
  import("./views/portal/configuration/approve_review")
);
const ApproveReviewAdd = React.lazy(() =>
  import("./views/portal/configuration/approve_review/ApproveReviewAdd")
);
const ApproveReviewDetail = React.lazy(() =>
  import("./views/portal/configuration/approve_review/ApproveReviewDetail")
);
const ApproveReviewEdit = React.lazy(() =>
  import("./views/portal/configuration/approve_review/ApproveReviewEdit")
);

// Teacher Joining

const TeacherJoining = React.lazy(() =>
  import("./views/portal/teacherJoining/TeacherJoiningAdd")
);

// Notifications

const NotificationList = React.lazy(() =>
  import("./views/portal/notification/notificationList/NotificationList")
);
const NotificationTypeAdd = React.lazy(() =>
  import("./views/portal/notification/notificationTypeSet/NotificationTypeAdd")
);
const NotificationTypeEdit = React.lazy(() =>
  import("./views/portal/notification/notificationTypeSet/NotificationTypeEdit")
);
const NotificationTypeList = React.lazy(() =>
  import("./views/portal/notification/notificationTypeSet/NotificationTypeList")
);
const NotificationTypeDetails = React.lazy(() =>
  import(
    "./views/portal/notification/notificationTypeSet/NotificationTypeDetails"
  )
);

// Demo Nid Page

const DemoList = React.lazy(() =>
  import("./views/portal/settings/nidDemo/DemoList")
);

const DemoAdd = React.lazy(() =>
  import("./views/portal/settings/nidDemo/DemoAdd")
);
const DemoEdit = React.lazy(() =>
  import("./views/portal/settings/nidDemo/DemoEdit")
);

// routes
const portalRoutes = [
  {
    path: "/portal/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },

  // Application

  {
    path: "/portal/choice/list",
    exact: true,
    name: ChoiceList,
    component: ChoiceList,
  },
  {
    path: "/portal/ntrca-application/apply/:id",
    exact: true,
    name: ApplicationApply,
    component: ApplicationApply,
  },
  {
    path: "/portal/application/edit/:id",
    exact: true,
    name: ApplicationApply,
    component: ApplicationApply,
  },
  {
    path: "/portal/application/list",
    exact: true,
    name: ApplicationList,
    component: ApplicationList,
  },
  {
    path: "/portal/application/list",
    exact: true,
    name: ApplicationList,
    component: ApplicationList,
  },
  {
    path: "/portal/ntrca-application/basic-info/add",
    exact: true,
    name: NtrcaGeneralInfo,
    component: NtrcaGeneralInfo,
  },
  {
    path: "/portal/ntrca-application/institute/add/:id",
    exact: true,
    name: InstituteAdd,
    component: InstituteAdd,
  },

  {
    path: "/portal/ntrca-application/attachment/add/:id",
    exact: true,
    name: ApplicationAttachment,
    component: ApplicationAttachment,
  },

  {
    path: "/portal/ntrca-application/preview/:id",
    exact: true,
    name: ApplicationPreview,
    component: ApplicationPreview,
  },
  {
    path: "/portal/ntrca-application/application/preview/:id/:name",
    exact: true,
    name: ApplicationFullPreview,
    component: ApplicationFullPreview,
  },
  // {
  //   path: "/portal/ntrca-application/ntrca-info/add",
  //   exact: true,
  //   // name: ApplicationApply,
  //   component: React.lazy(() =>
  //     import("./views/portal/postingManagement/Application/ApplicationForm")
  //   ),
  // },

  // Posting Management

  {
    path: "/portal/posting-management/vacant-posts-list",
    exact: true,
    name: VacantPostsList,
    component: VacantPostsList,
  },
  {
    path: "/portal/posting-management/attachment",
    exact: true,
    name: Attachment,
    component: Attachment,
  },

  {
    path: "/portal/vacant-post/details/:id",
    exact: true,
    name: VacantPostDetails,
    component: VacantPostDetails,
  },

  // ........... Teacher Joining ................
  {
    path: "/portal/joining/teacher-joining",
    exact: true,
    name: TeacherJoining,
    component: TeacherJoining,
  },

  // .............Settings ..............
  {
    path: "/portal/settings/certificate/list",
    exact: true,
    name: uploadCertificate,
    component: uploadCertificate,
  },
  {
    path: "/portal/settings/certificate/add",
    exact: true,
    name: uploadCertificateAdd,
    component: uploadCertificateAdd,
  },
  {
    path: "/portal/settings/designation/list",
    exact: true,
    name: DesignationList,
    component: DesignationList,
  },
  {
    path: "/portal/settings/designation/add",
    exact: true,
    name: DesignationAdd,
    component: DesignationAdd,
  },
  {
    path: "/portal/settings/designation/:id/edit",
    exact: true,
    name: DesignationEdit,
    component: DesignationEdit,
  },
  {
    path: "/portal/settings/designation/:id/show",
    exact: true,
    name: DesignationShow,
    component: DesignationShow,
  },
  {
    path: "/portal/settings/subject-wise-post",
    exact: true,
    name: SubjectWisePostList,
    component: SubjectWisePostList,
  },
  {
    path: "/portal/settings/Subject-Wise-Post-Add",
    exact: true,
    name: SubjectWisePostAdd,
    component: SubjectWisePostAdd,
  },
  {
    path: "/portal/settings/Subject-Wise-Post-Edit/:id/edit",
    exact: true,
    name: SubjectWisePostEdit,
    component: SubjectWisePostEdit,
  },
  //experience subject wise post
  {
    path: "/portal/settings/experience-subject-wise-post",
    exact: true,
    name: ExperienceSubjectWisePostList,
    component: ExperienceSubjectWisePostList,
  },
  {
    path: "/portal/settings/experience-subject-wise-post-add",
    exact: true,
    name: ExperienceSubjectWisePostAdd,
    component: ExperienceSubjectWisePostAdd,
  },

  //Regulation

  {
    path: "/portal/settings/govt-regulation/list",
    exact: true,
    name: GovtRegulationList,
    component: GovtRegulationList,
  },
  {
    path: "/portal/settings/govt-regulation/add",
    exact: true,
    name: GovtRegulationAdd,
    component: GovtRegulationAdd,
  },
  {
    path: "/portal/settings/govt-regulation/:id/edit",
    exact: true,
    name: GovtRegulationEdit,
    component: GovtRegulationEdit,
  },
  // Rules

  {
    path: "/portal/settings/rules/list",
    exact: true,
    name: RulesList,
    component: RulesList,
  },
  {
    path: "/portal/settings/rules/add",
    exact: true,
    name: RulesAdd,
    component: RulesAdd,
  },
  {
    path: "/portal/settings/rules/:id/edit",
    exact: true,
    name: RulesEdit,
    component: RulesEdit,
  },
  {
    path: "/portal/settings/rules/:id/details",
    exact: true,
    name: RulesDetails,
    component: RulesDetails,
  },

  // Regulations
  {
    path: "/portal/settings/regulations/list",
    exact: true,
    name: RegulationList,
    component: RegulationList,
  },
  {
    path: "/portal/settings/regulations/add",
    exact: true,
    name: RegulationAdd,
    component: RegulationAdd,
  },
  {
    path: "/portal/settings/regulations/:id/edit",
    exact: true,
    name: RegulationEdit,
    component: RegulationEdit,
  },
  {
    path: "/portal/settings/regulations/:id/details",
    exact: true,
    name: RegulationDetails,
    component: RegulationDetails,
  },

  // application form
  {
    path: "/portal/settings/recommendation/form",
    exact: true,
    name: RecommendationLetterAdd,
    component: RecommendationLetterAdd,
  },

  {
    path: "/portal/settings/recommendation/:id/edit",
    exact: true,
    name: RecommendationLetterEdit,
    component: RecommendationLetterEdit,
  },

  {
    path: "/portal/settings/recommendation/list",
    exact: true,
    name: RecommendationList,
    component: RecommendationList,
  },

  //post teacher

  {
    path: "/portal/settings/post/list",
    exact: true,
    name: PostList,
    component: PostList,
  },
  {
    path: "/portal/settings/post/add",
    exact: true,
    name: PostAdd,
    component: PostAdd,
  },
  {
    path: "/portal/settings/teacherPost/:id/edit",
    exact: true,
    name: PostEdit,
    component: PostEdit,
  },
  {
    path: "/portal/settings/teacherPost/show",
    exact: true,
    name: PostShow,
    component: PostShow,
  },

  {
    path: "/portal/settings/subject/list",
    exact: true,
    name: SubjectList,
    component: SubjectList,
  },
  {
    path: "/portal/settings/subject/add",
    exact: true,
    name: SubjectAdd,
    component: SubjectAdd,
  },
  {
    path: "/portal/settings/subject/:id/edit",
    exact: true,
    name: SubjectEdit,
    component: SubjectEdit,
  },
  {
    path: "/portal/settings/subject/:id/show",
    exact: true,
    name: SubjectShow,
    component: SubjectShow,
  },

  {
    path: "/portal/settings/designation-wise-subject/list",
    exact: true,
    name: DesWiseSubjectList,
    component: DesWiseSubjectList,
  },
  {
    path: "/portal/settings/designation-wise-subject/add",
    exact: true,
    name: DesWiseSubjectAdd,
    component: DesWiseSubjectAdd,
  },
  {
    path: "/portal/settings/designation-wise-subject/:id/edit",
    exact: true,
    name: DesWiseSubjectEdit,
    component: DesWiseSubjectEdit,
  },
  {
    path: "/portal/settings/designation-wise-subject/:id/show",
    exact: true,
    name: DesWiseSubjectShow,
    component: DesWiseSubjectShow,
  },
  {
    path: "/portal/settings/batch/list",
    exact: true,
    name: BatchList,
    component: BatchList,
  },
  {
    path: "/portal/settings/batch/add",
    exact: true,
    name: BatchAdd,
    component: BatchAdd,
  },
  {
    path: "/portal/settings/batch/:id/edit",
    exact: true,
    name: BatchEdit,
    component: BatchEdit,
  },
  {
    path: "/portal/settings/police-verification",
    exact: true,
    name: PoliceVerificationList,
    component: PoliceVerificationList,
  },
  {
    path: "/portal/settings/police-verification/add",
    exact: true,
    name: PoliceVerificationAdd,
    component: PoliceVerificationAdd,
  },
  {
    path: "/portal/settings/quota/list",
    exact: true,
    name: QuotaList,
    component: QuotaList,
  },
  {
    path: "/portal/settings/quota/add",
    exact: true,
    name: QuotaAdd,
    component: QuotaAdd,
  },

  {
    path: "/portal/settings/quota/:id/edit",
    exact: true,
    name: QuotaEdit,
    component: QuotaEdit,
  },
  {
    path: "/portal/settings/quota/:id/show",
    exact: true,
    name: QuotaShow,
    component: QuotaShow,
  },
  {
    path: "/portal/circular/list",
    exact: true,
    name: CircularList,
    component: CircularList,
  },
  {
    path: "/portal/circular/applicant/list",
    exact: true,
    name: ApplicantCircularList,
    component: ApplicantCircularList,
  },
  {
    path: "/portal/certified-applicant/add-nid/request",
    exact: true,
    name: CertifiedApplicantsNidAddRequest,
    component: CertifiedApplicantsNidAddRequest,
  },

  {
    path: "/portal/certified-applicant/register/list",
    exact: true,
    name: CertifiedApplicantRegisterList,
    component: CertifiedApplicantRegisterList,
  },
  {
    path: "/portal/certified-applicant/joining-details/list",
    exact: true,
    name: SelectedApplicantJoiningList,
    component: SelectedApplicantJoiningList,
  },
  {
    path: "/portal/circular/add",
    exact: true,
    name: CircularAdd,
    component: CircularAdd,
  },
  {
    path: "/portal/circular/:id/edit",
    exact: true,
    name: CircularEdit,
    component: CircularEdit,
  },
  {
    path: "/portal/circular/:id/show",
    exact: true,
    name: CircularDetails,
    component: CircularDetails,
  },

  {
    path: "/portal/phase-wise-circular/add",
    exact: true,
    name: PhaseWiseCircularAdd,
    component: PhaseWiseCircularAdd,
  },
  {
    path: "/portal/phase-wise-circular/:id/edit",
    exact: true,
    name: PhaseWiseCircularEdit,
    component: PhaseWiseCircularEdit,
  },
  // {
  //   path: "/portal/phase-wise-circular/:id/show",
  //   exact: true,
  //   name: PhaseWiseCircularDetails,
  //   component: PhaseWiseCircularDetails,
  // },

  {
    path: "/portal/circular-pdf/show",
    exact: true,
    name: CircularPdf,
    component: CircularPdf,
  },
  {
    path: "/portal/e-requisition/circular",
    exact: true,
    name: eRequisitionCircularList,
    component: eRequisitionCircularList,
  },
  {
    path: "/portal/e-requisition/add",
    exact: true,
    name: eRequisitionCircular,
    component: eRequisitionCircular,
  },
  {
    path: "/portal/e-requisition/details/:id",
    exact: true,
    name: "eRequisitionDetail",
    component: eRequisitionDetail,
  },
  {
    path: "/portal/e-requisition/edit/:id",
    exact: true,
    name: "eRequisitionEdit",
    component: eRequisitionEdit,
  },
  // {
  //   path: "/portal/e-requisition/:id/show",
  //   exact: true,
  //   name: eRequisitionCircularDetails,
  //   component: eRequisitionCircularDetails,
  // },
  // {
  //   path: "/portal/circular/:id/edit",
  //   exact: true,
  //   name: CircularEdit,
  //   component: CircularEdit,
  // },
  // {
  //   path: "/portal/circular/:id/show",
  //   exact: true,
  //   name: QuotaShow,
  //   component: QuotaShow,
  // },
  {
    path: "/portal/otp",
    exact: true,
    name: OTPPage,
    component: OTPPage,
  },
  {
    path: "/portal/payment-page",
    exact: true,
    name: PaymentPage,
    component: PaymentPage,
  },
  {
    path: "/portal/payment-method",
    exact: true,
    name: PaymentMethod,
    component: PaymentMethod,
  },

  //SMS
  {
    path: "/portal/sms-template",
    exact: true,
    name: SmsTemplate,
    component: SmsTemplate,
  },
  // Result

  {
    path: "/portal/result-generate",
    exact: true,
    name: ResultGenerate,
    component: ResultGenerate,
  },
  {
    path: "/portal/generated-result",
    exact: true,
    name: GeneratedResult,
    component: GeneratedResult,
  },

  {
    path: "/portal/phase-wise/generated-result/:circularId",
    exact: true,
    name: PhaseWiseGeneratedResult,
    component: PhaseWiseGeneratedResult,
  },

  {
    path: "/portal/result",
    exact: true,
    name: ResultList,
    component: ResultList,
  },
  {
    path: "/portal/selected-applicant-list",
    exact: true,
    name: "SelectedApplicantList",
    component: SelectedApplicantList,
  },
  {
    path: "/portal/selection-process-applicant-list",
    exact: true,
    name: "SelectionProcessApplicantList",
    component: SelectionProcessApplicantList,
  },
  {
    path: "/portal/selection-process-selected-applicant-list/:id",
    exact: true,
    name: "SelectionProcessSelectedApplicantList",
    component: SelectionProcessSelectedApplicantList,
  },
  {
    path: "/portal/merit-list",
    exact: true,
    name: "MeritList",
    component: MeritList,
  },
  {
    path: "/portal/merit-list-genarate",
    exact: true,
    name: "MeritListGenarate",
    component: MeritListGenarate,
  },
  {
    path: "/portal/waiting-list",
    exact: true,
    name: "WaitingList",
    component: WaitingList,
  },
  {
    path: "/portal/certified-applicants/list",
    exact: true,
    name: "CertifiedApplicantsList",
    component: CertifiedApplicantsList,
  },
  {
    path: "/portal/certified-applicants/add",
    exact: true,
    name: "CertifiedApplicantsAdd",
    component: CertifiedApplicantsAdd,
  },
  {
    path: "/portal/certified-applicants/upload-progress-list",
    exact: true,
    name: "CertifiedApplicantsPreviousUploadingList",
    component: CertifiedApplicantsPreviousUploadingList,
  },
  {
    path: "/portal/certified-applicants/notuploaded/list",
    exact: true,
    name: "CertifiedApplicantsNotUploadingList",
    component: CertifiedApplicantsNotUploadingList,
  },

  {
    path: "/portal/certified-applicants/details/:id/:examRefId",
    exact: true,
    name: "CertifiedApplicantsDetail",
    component: CertifiedApplicantsDetail,
  },
  {
    path: "/portal/certified-applicants/edit/:id/:examRefId",
    exact: true,
    // name: "CertifiedApplicantsUploadFile",
    // component: CertifiedApplicantsUploadFile,
    name: "CertifiedApplicantsEdit",
    component: CertifiedApplicantsEdit,
  },
  {
    path: "/portal/new-job-requisition-list",
    exact: true,
    name: NewERequistionList,
    component: NewERequistionList,
  },
  {
    path: "/portal/new-job-requisition-details",
    exact: true,
    name: NewERequistionDetails,
    component: NewERequistionDetails,
  },
  {
    path: "/portal/replace-applicant-list",
    exact: true,
    name: ReplaceApplicantList,
    component: ReplaceApplicantList,
  },
  {
    path: "/portal/job-requisition-list",
    exact: true,
    name: JobRequisitionList,
    component: JobRequisitionList,
  },
  {
    path: "/portal/submitted/job-requisition-list",
    exact: true,
    name: JobRequisitionSubmittedList,
    component: JobRequisitionSubmittedList,
  },
  {
    path: "/portal/job-requisition-details",
    exact: true,
    name: RequisitionDetails,
    component: RequisitionDetails,
  },
  {
    path: "/portal/job-requisition/add/:id/:name",
    exact: true,
    name: JobApplyAdd,
    component: JobApplyAdd,
  },
  {
    path: "/portal/job-requisition/edit/:id",
    exact: true,
    name: JobApplyEdit,
    component: JobApplyEdit,
  },

  {
    path: "/portal/job-requisition/details/:id",
    exact: true,
    name: JobApplyDetail,
    component: JobApplyDetail,
  },

  {
    path: "/portal/job-application/detail-view/:id",
    exact: true,
    name: "JobApplicantDetails",
    component: JobApplicantDetails,
  },
  //Reviewer

  {
    path: "/portal/review/requisition/list",
    exact: true,
    name: RequisitionList,
    component: RequisitionList,
  },
  {
    path: "/portal/review/requisition/details/:id",
    exact: true,
    name: RequisitionDetail,
    component: RequisitionDetail,
  },

  // Institute Profile
  {
    path: "/portal/institute-profile",
    exact: true,
    name: ProfileAdd,
    component: ProfileAdd,
  },
  {
    path: "/portal/filledPosts/List",
    exact: true,
    name: filledPostsList,
    component: filledPostsList,
  },

  {
    path: "/portal/configuration/approve-review",
    exact: true,
    name: "ApproveReview",
    component: ApproveReview,
  },
  {
    path: "/portal/configuration/approve-review/add",
    exact: true,
    name: "ApproveReviewAdd",
    component: ApproveReviewAdd,
  },
  {
    path: "/portal/configuration/approve-review/:id",
    exact: true,
    name: "ApproveReviewDetail",
    component: ApproveReviewDetail,
  },
  {
    path: "/portal/configuration/approve-review/:id/edit",
    exact: true,
    name: "ApproveReviewEdit",
    component: ApproveReviewEdit,
  },
  //notifications
  {
    path: "/portal/notification/list",
    exact: true,
    name: "NotificationList",
    component: NotificationList,
  },
  {
    path: "/portal/notification-type/add",
    exact: true,
    name: "NotificationTypeAdd",
    component: NotificationTypeAdd,
  },
  {
    path: "/portal/notification-type/:id/edit",
    exact: true,
    name: "NotificationTypeEdit",
    component: NotificationTypeEdit,
  },
  {
    path: "/portal/notification-type/list",
    exact: true,
    name: "NotificationTypeList",
    component: NotificationTypeList,
  },
  {
    path: "/portal/notification-type/:id",
    exact: true,
    name: "NotificationTypeDetails",
    component: NotificationTypeDetails,
  },

  //NID DEMO PAGE
  {
    path: "/portal/settings/demo-nid/list",
    exact: true,
    name: "DemoList",
    component: DemoList,
  },

  {
    path: "/portal/settings/demo-nid/add",
    exact: true,
    name: "DemoAdd",
    component: DemoAdd,
  },
  {
    path: "/portal/settings/demo-nid/:id/edit",
    exact: true,
    name: "DemoEdit",
    component: DemoEdit,
  },
];

export { siteRoutes, portalRoutes };
