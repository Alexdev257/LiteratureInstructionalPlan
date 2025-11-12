import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { Route as homeRoute } from "./home";

// Auth
import { Route as authLayoutRoute } from "./auth/_layout";
import { Route as loginRoute } from "./auth/login";
import { Route as registerRoute } from "./auth/register";
import { Route as forgotPasswordRoute } from "./auth/forgotpassword";

// Exam (User)
import { Route as examLayoutRoute } from "./exam/_layout";
import { Route as examIndexRoute } from "./exam/index";
import { Route as examDetailRoute } from "./exam/[id]/index";
import { Route as examDetailLayoutRoute } from "./exam/[id]/_layout";
import { Route as takeExamLayoutRoute } from "./exam/[id]/[attemptId]/_layout";
import { Route as takeExamRoute } from "./exam/[id]/[attemptId]/index";
import { Route as ResultLayoutRoute } from "./exam/[id]/result/_layout";
import { Route as ResultRoute } from "./exam/[id]/result/index";
// Dashboard
import { Route as dashboardLayoutRoute } from "./dashboard/_layout";
import { Route as dashboardUsersRoute } from "./dashboard/users";
import { Route as dashboardQuestionsRoute } from "./dashboard/questions";

// Teacher
import { Route as teacherLayoutRoute } from "./teacher/_layout";
import { Route as templateTeacherRoute } from "./teacher/template";
import { Route as teacherOVerviewRoute } from "./teacher/overview";

// Teacher → Exam
import { Route as teacherExamLayoutRoute } from "./teacher/exam/_layout";
import { Route as teacherExamIndexRoute } from "./teacher/exam/index";
import { Route as teacherExamDetailLayoutRoute } from "./teacher/exam/[id]/_layout";
import { Route as teacherExamDetailRoute } from "./teacher/exam/[id]/index";
import { Route as teacherExamEditLayoutRoute } from "./teacher/exam/[id]/edit/_layout";
import { Route as teacherExamEditRoute } from "./teacher/exam/[id]/edit/index";
import { Route as teacherExamSelectMatrixLayoutRoute } from "./teacher/exam/select-matrix/_layout";
import { Route as teacherExamSelectMatrixRoute } from "./teacher/exam/select-matrix/index";
import { Route as teacherExamSelectQuestionLayoutRoute } from "./teacher/exam/select-question/_layout";
import { Route as teacherExamSelectQuestionRoute } from "./teacher/exam/select-question/index";
import { Route as teacherExamReviewLayoutRoute } from "./teacher/exam/review/_layout";
import { Route as teacherExamReviewRoute } from "./teacher/exam/review/index";

// Teacher → Matrix
import { Route as teacherMatrixLayoutRoute } from "./teacher/matrix/_layout";
import { Route as teacherMatrixIndexRoute } from "./teacher/matrix/index";
import { Route as teacherMatrixCreateLayoutRoute } from "./teacher/matrix/create/_layout";
import { Route as teacherMatrixCreateRoute } from "./teacher/matrix/create/index";
import { Route as teacherMatrixDetailLayoutRoute } from "./teacher/matrix/[id]/_layout";
import { Route as teacherMatrixDetailRoute } from "./teacher/matrix/[id]/index";
import { Route as teacherMatrixEditLayoutRoute } from "./teacher/matrix/[id]/edit/_layout";
import { Route as teacherMatrixEditRoute } from "./teacher/matrix/[id]/edit/index";

// Teacher → Question
import { Route as teacherQuestionLayoutRoute } from "./teacher/question/_layout";
import { Route as teacherQuestionIndexRoute } from "./teacher/question/index";
import { Route as teacherQuestionCreateLayoutRoute } from "./teacher/question/create/_layout";
import { Route as teacherQuestionCreateRoute } from "./teacher/question/create/index";
import { Route as teacherQuestionDetailLayoutRoute } from "./teacher/question/[id]/_layout";
import { Route as teacherQuestionDetailRoute } from "./teacher/question/[id]/index";
import { Route as teacherQuestionEditLayoutRoute } from "./teacher/question/[id]/edit/_layout";
import { Route as teacherQuestionEditRoute } from "./teacher/question/[id]/edit/index";

// User Profile
import { Route as userProfileLayoutRoute } from "./userProfile/_layout";
import { Route as userProfileRoute } from "./userProfile/[id]/index";

// Template (User)
import { Route as templateUserRoute } from "./template";
import { Route as cartRoute } from "./cart";

// ------------------------- ROUTE TREE -------------------------
const routeTree = rootRoute.addChildren([
  homeRoute,
  templateUserRoute,
  cartRoute,

  // Exam (User)
  examLayoutRoute.addChildren([
    examIndexRoute,
    examDetailLayoutRoute.addChildren([
      examDetailRoute,
      takeExamLayoutRoute.addChildren([
        takeExamRoute,
        ResultLayoutRoute.addChildren([
          ResultRoute
        ])

      ]


      ),

    ]),
  ]),

  // Auth
  authLayoutRoute.addChildren([loginRoute, registerRoute, forgotPasswordRoute]),

  // Teacher
  teacherLayoutRoute.addChildren([
    templateTeacherRoute,
    teacherOVerviewRoute,

    // Exam (Teacher)
    teacherExamLayoutRoute.addChildren([
      teacherExamIndexRoute,
      teacherExamDetailLayoutRoute.addChildren([
        teacherExamDetailRoute,
        teacherExamEditLayoutRoute.addChildren([teacherExamEditRoute]),
      ]),
      teacherExamSelectMatrixLayoutRoute.addChildren([
        teacherExamSelectMatrixRoute,
      ]),
      teacherExamSelectQuestionLayoutRoute.addChildren([
        teacherExamSelectQuestionRoute,
      ]),
      teacherExamReviewLayoutRoute.addChildren([teacherExamReviewRoute]),
    ]),

    // Matrix
    teacherMatrixLayoutRoute.addChildren([
      teacherMatrixIndexRoute,
      teacherMatrixCreateLayoutRoute.addChildren([teacherMatrixCreateRoute]),
      teacherMatrixDetailLayoutRoute.addChildren([
        teacherMatrixDetailRoute,
        teacherMatrixEditLayoutRoute.addChildren([teacherMatrixEditRoute]),
      ]),
    ]),

    // Question
    teacherQuestionLayoutRoute.addChildren([
      teacherQuestionIndexRoute,
      teacherQuestionCreateLayoutRoute.addChildren([teacherQuestionCreateRoute]),
      teacherQuestionDetailLayoutRoute.addChildren([
        teacherQuestionDetailRoute,
        teacherQuestionEditLayoutRoute.addChildren([teacherQuestionEditRoute]),
      ]),
    ]),
  ]),

  // User Profile
  userProfileLayoutRoute.addChildren([userProfileRoute]),

  // Dashboard
  dashboardLayoutRoute.addChildren([
    dashboardUsersRoute,
    dashboardQuestionsRoute,
  ]),
]);

export const router = createRouter({ routeTree });
