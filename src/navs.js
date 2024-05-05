import {
  faAngleRight,
  faCog,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

const adminNav = [
  {
    title: "ড্যাশবোর্ড",
    path: "/portal/dashboard",
    icon: faTachometerAlt,
  },

  {
    title: " নিবন্ধিত শিক্ষক অনুমোদন",
    path: "/portal/certified-applicants/list",
    icon: faTachometerAlt,
    children: [
      {
        title: "আপলোড করুন",
        path: "/portal/certified-applicants/add",
        icon: faAngleRight,
      },
      {
        title: "ফাইল আপলোডের তালিকা",
        path: "/portal/certified-applicants/upload-progress-list",
        icon: faAngleRight,
      },
      {
        title: "নিবন্ধিত শিক্ষক তালিকা",
        path: "/portal/certified-applicants/list",
        icon: faTachometerAlt,
      },
      {
        title: "সম্মিলিত  মেধা তালিকা তৈরি করুন",
        path: "/portal/merit-list-genarate",
        icon: faAngleRight,
      },
      {
        title: "সম্মিলিত মেধা তালিকা",
        path: "/portal/merit-list",
        icon: faAngleRight,
      },
    ],
  },

  {
    title: "ই-রিকুইজিশন বিজ্ঞপ্তি",
    path: "/portal/e-requisition/circular",
    icon: faTachometerAlt,
  },
  {
    title: "গণ বিজ্ঞপ্তি",
    path: "/portal/circular/list",
    icon: faTachometerAlt,
  },

  // {
  //   title: "এসএমএস টেমপ্লেট",
  //   path: "/portal/sms-template",
  //   icon: faTachometerAlt,
  // },
  {
    title: "আবেদিত পদের তালিকা",
    path: "/portal/posting-management/vacant-posts-list",
    icon: faTachometerAlt,
  },
  // {
  //   title: "আবেদনকারী প্রতিস্থাপন",
  //   path: "/portal/replace-applicant-list",
  //   icon: faTachometerAlt,
  // },
  {
    title: "ফলাফল",
    path: "3",
    icon: faTachometerAlt,
    children: [
      {
        title: "প্রার্থী নির্বাচন করুন",
        path: "/portal/result-generate",
        icon: faAngleRight,
      },
      // {
      //   title: "জেনারেটেড রেজাল্ট",
      //   path: "/portal/generated-result",
      //   icon: faAngleRight,
      // },
      {
        title: "ফলাফল প্রাপ্তের সময়কাল",
        path: "/portal/selection-process-applicant-list",
        icon: faAngleRight,
      },
      {
        title: "নির্বাচিত আবেদনকারীদের তালিকা",
        path: "/portal/selected-applicant-list",
        icon: faAngleRight,
      },
      // {
      //   title: "সম্মিলিত জাতীয় মেধা তালিকা",
      //   path: "/portal/merit-list",
      //   icon: faAngleRight,
      // },
      // {
      //   title: "অপেক্ষামান তালিকা",
      //   path: "/portal/waiting-list",
      //   icon: faAngleRight,
      // },
    ],
  },

  // {
  //   title: "NID হালনাগাদ তালিকা",
  //   path: "/portal/certified-applicant/add-nid/request",
  //   icon: faTachometerAlt,
  // },

  {
    title: "নতুন আবেদনকারীর তালিকা",
    path: "/portal/certified-applicant/register/list",
    icon: faTachometerAlt,
  },

  {
    title: "নির্বাচত প্রার্থীদের যোগদানের তথ্য",
    path: "/portal/certified-applicant/joining-details/list",
    icon: faTachometerAlt,
  },

  {
    title: "সেটিংস",
    path: "4",
    icon: faCog,
    children: [
      {
        title: "বিষয়",
        path: "/portal/settings/subject/list",
        icon: faAngleRight,
      },
      {
        title: "পদবি",
        path: "/portal/settings/post/list",
        icon: faAngleRight,
      },
      {
        title: "ব্যাচ",
        path: "/portal/settings/batch/list",
        icon: faAngleRight,
      },
      {
        title: "কোটা",
        path: "/portal/settings/quota/list",
        icon: faAngleRight,
      },
      {
        title: "বিষয়ভিত্তিক পদবি ম্যাপিং",
        path: "/portal/settings/subject-wise-post",
        icon: faAngleRight,
      },
      {
        title: "স্তর ও বিষয় ভিত্তিক পদবি ম্যাপিং",
        path: "/portal/settings/experience-subject-wise-post",
        icon: faAngleRight,
      },
      {
        title: "নীতিমালা",
        path: "/portal/settings/govt-regulation/list",
        icon: faAngleRight,
      },
      {
        title: "বিজ্ঞপ্তির নিয়মাবলী",
        path: "/portal/settings/rules/list",
        icon: faAngleRight,
      },
      {
        title: "পদভিত্তিক ন্যূনতম যোগ্যতা",
        path: "/portal/settings/regulations/list",
        icon: faAngleRight,
      },
      {
        title: "রিকমেন্ডেশন ",
        path: "/portal/settings/recommendation/form",
        icon: faAngleRight,
      },
      {
        title: "Application Review",
        path: "/portal/configuration/approve-review",
        icon: faAngleRight,
      },
      {
        title: "Notification Template",
        path: "/portal/notification-type/list",
        icon: "",
        children: [],
      },
      {
        title: "ADD DEMO NID",
        path: "/portal/settings/demo-nid/list",
        icon: "",
        children: [],
      },

      // {
      //   title: "SMS Template",
      //   path: "/portal/settings/sms-template",
      //   icon: faAngleRight,
      // },
    ],
  },
];

const banbeisInstituteNav = [
  {
    title: "ড্যাশবোর্ড",
    path: "/portal/dashboard",
    icon: faTachometerAlt,
  },
  {
    title: "প্রতিষ্ঠান প্রোফাইল",
    path: "/portal/institute-profile",
    icon: faTachometerAlt,
  },
  {
    title: "ই রিকুইজিশন",
    path: "/portal/job-requisition-list",
    icon: faTachometerAlt,
  },
  {
    title: "সাবমিটেড ই রিকুইজিশন",
    path: "/portal/submitted/job-requisition-list",
    icon: faTachometerAlt,
  },
  // {
  //   title: "নতুন ই রিকুইজিশন",
  //   path: "/portal/new-job-requisition-list",
  //   icon: faTachometerAlt,
  // },
  // {
  //   title: "পূরণকৃত পদ",
  //   path: "/portal/filledPosts/List",
  //   icon: faTachometerAlt,
  // },
  // {
  //   title: "পেমেন্ট",
  //   path: "/portal/payment-page",
  //   icon: faTachometerAlt,
  // },

  // {
  //   title: "সেটিংস",
  //   path: "4",
  //   icon: faCog,
  //   children: [
  //     {
  //       title: "Designation",
  //       path: "4",
  //       icon: faAngleRight,
  //       children: [
  //         {
  //           title: "Add Form",
  //           path: "/portal/settings/designation/add",
  //           icon: faAngleRight,
  //         },
  //         {
  //           title: "Designation List",
  //           path: "/portal/settings/designation/list",
  //           icon: faAngleRight,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Subject",
  //       path: "4",
  //       icon: faAngleRight,
  //       children: [
  //         {
  //           title: "Add Form",
  //           path: "/portal/settings/subject/add",
  //           icon: faAngleRight,
  //         },
  //         {
  //           title: "Subject List",
  //           path: "/portal/settings/subject/list",
  //           icon: faAngleRight,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Designation Wise Subject",
  //       path: "4",
  //       icon: faAngleRight,
  //       children: [
  //         {
  //           title: "Add Form",
  //           path: "/portal/settings/designation-wise-subject/add",
  //           icon: faAngleRight,
  //         },
  //         {
  //           title: "Designation Wise Subject List",
  //           path: "/portal/settings/designation-wise-subject/list",
  //           icon: faAngleRight,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Quota",
  //       path: "4",
  //       icon: faAngleRight,
  //       children: [
  //         {
  //           title: "Add Form",
  //           path: "/portal/settings/quota/add",
  //           icon: faAngleRight,
  //         },
  //         {
  //           title: "Quota List",
  //           path: "/portal/settings/quota/list",
  //           icon: faAngleRight,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Circular",
  //       path: "4",
  //       icon: faAngleRight,
  //       children: [
  //         {
  //           title: "Add Form",
  //           path: "/portal/settings/circular/add",
  //           icon: faAngleRight,
  //         },
  //         {
  //           title: "Circular List",
  //           path: "/portal/settings/circular/list",
  //           icon: faAngleRight,
  //         },
  //       ],
  //     },
  //     {
  //       title: "SMS Template",
  //       path: "/portal/settings/sms-template",
  //       icon: faAngleRight,
  //     },
  //   ],
  // },
];
const applicantNav = [
  {
    title: "ড্যাশবোর্ড",
    path: "/portal/dashboard",
    icon: faTachometerAlt,
  },
  {
    title: "গণ বিজ্ঞপ্তির তালিকা",
    path: "/portal/circular/applicant/list",
    icon: faTachometerAlt,
  },
  // {
  //   title: "আবেদন করুন",
  //   path: "/portal/application/list",
  //   icon: faTachometerAlt,
  // },
  // {
  //   title: "আবেদন ব্যবস্থাপনা",
  //   path: "1",
  //   icon: faTachometerAlt,
  //   children: [
  //     {
  //       title: "বিজ্ঞপ্তির তালিকা",
  //       path: "/portal/settings/circular/list",
  //       icon: faAngleRight,
  //     },
  //     {
  //       title: "আবেদন করুন",
  //       path: "/portal/application/list",
  //       icon: faAngleRight,
  //     },
  //     {
  //       title: "আমার আবেদন",
  //       path: "",
  //       icon: faAngleRight,
  //     },
  //   ],
  // },
  // {
  //   title: "Join Request",
  //   path: "4",
  //   icon: faTachometerAlt,
  //   children: [
  //     {
  //       title: "Joining Form",
  //       path: "/portal/joining-form",
  //       icon: faAngleRight,
  //     },
  //   ]
  // },
  // {
  //   title: "Float Demand",
  //   path: "4",
  //   icon: faTachometerAlt,
  //   children: [
  //     {
  //       title: "List",
  //       path: "/portal/float-demand/list",
  //       icon: faAngleRight,
  //     },
  //     {
  //       title: "Application Form",
  //       path: "/portal/float-demand/add",
  //       icon: faAngleRight,
  //     },
  //   ]
  // },
  // {
  //   title: "পেমেন্ট",
  //   path: "/portal/payment-page",
  //   icon: faTachometerAlt,
  // },
  // {
  //   title: "Admit Card",
  //   path: "/portal/admit-card",
  //   icon: faTachometerAlt,
  // },
  {
    title: "সম্মিলিত মেধা তালিকা",
    path: "/portal/merit-list",
    icon: faTachometerAlt,
  },
  {
    title: "ফলাফল",
    path: "/portal/result",
    icon: faTachometerAlt,
    // children: [
    //   {
    //     title: "ফলাফল",
    //     path: "/portal/result",
    //     icon: faTachometerAlt,
    //   },
    //   {
    //     title: "নির্বাচিত আবেদনকারীদের তালিকা",
    //     path: "/portal/selected-applicant-list",
    //     icon: faAngleRight,
    //   },
    // ],
  },
  // {
  //   title: "সনদ পত্র যুক্ত করুন ",
  //   path: "/portal/settings/certificate/list",
  //   icon: faCog,
  // },
  // {
  //   title: "পুলিশ ভেরিফিকেশন ",
  //   path: "/portal/settings/police-verification",
  //   icon: faCog,
  // },
];
const teacherNav = [
  {
    title: "ড্যাশবোর্ড",
    path: "/portal/dashboard",
    icon: faTachometerAlt,
  },
  {
    title: "গণ বিজ্ঞপ্তি",
    path: "/portal/circular/list",
    icon: faTachometerAlt,
  },
  {
    title: "প্রোফাইল ম্যানেজমেন্ট",
    path: "4",
    icon: faTachometerAlt,
    children: [
      {
        title: "সাধারণ তথ্য",
        path: "/portal/profile/general-information",
        icon: faAngleRight,
      },
      {
        title: "চাকরির তথ্য",
        path: "/portal/profile/job-information",
        icon: faAngleRight,
      },
      {
        title: "শিক্ষাগত যোগ্যতা",
        path: "/portal/profile/educational-qualification",
        icon: faAngleRight,
      },
      {
        title: "প্রশিক্ষণ",
        path: "/portal/profile/training",
        icon: faAngleRight,
      },
    ],
  },
];

const reviewerNav = [
  {
    title: "ড্যাশবোর্ড",
    path: "/portal/dashboard",
    icon: faTachometerAlt,
  },
  {
    title: "ই রিকুইজিশন",
    path: "/portal/review/requisition/list",
    icon: faTachometerAlt,
  },
];

export { adminNav, applicantNav, banbeisInstituteNav, teacherNav, reviewerNav };
