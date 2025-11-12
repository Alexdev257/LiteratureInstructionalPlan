

import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { Route as homeRoute } from "./home";
import { Route as loginRoute } from "./auth/login";
import { Route as registerRoute } from "./auth/register";
import { Route as forgotPasswordRoute } from "./auth/forgotpassword";
import { Route as examLayoutRoute } from "./exam/_layout";
import { Route as examIndexRoute } from "./exam/index";
import { Route as examDetailRoute } from "./exam/[id]/index";
import { Route as takeExamLayoutRoute } from "./exam/[id]/[attemptId]/_layout";
import { Route as takeExamRoute } from "./exam/[id]/[attemptId]/index";
import { Route as authLayoutRoute } from "./auth/_layout";
import { Route as dashboardLayoutRoute } from "./dashboard/_layout";
import { Route as dashboardUsersRoute } from "./dashboard/users";
import { Route as dashboardQuestionsRoute } from "./dashboard/questions";
import { Route as teacherLayoutRoute } from "./teacher/_layout";
import { Route as templateRouteByTeacher } from "./teacher/template";
import { Route as matrixLayoutRoute } from "./teacher/matrix/_layout";
import { Route as matrixCreateIndexRoute } from "./teacher/matrix/create/index";
import { Route as editMatrixRoute } from "./teacher/matrix/[id]/edit/index";
import { Route as userProfileLayoutRoute } from "./userProfile/_layout";
import { Route as userProfileRoute } from "./userProfile/[id]/index";
import { Route as matrixDetailLayoutRoute } from "./teacher/matrix/[id]/_layout";
import { Route as matrixIndexRoute } from "./teacher/matrix/index";
import { Route as matrixDetailRoute } from "./teacher/matrix/[id]/index";
import { Route as matrixEditRoute } from "./teacher/matrix/[id]/edit/_layout";
import { Route as matrixCreateLayoutRoute } from "./teacher/matrix/create/_layout";
import { Route as questionLayoutRoute } from "./teacher/question/_layout";
import { Route as questionIndexRoute } from "./teacher/question/index";
import { Route as questionCreateLayoutRoute } from "./teacher/question/create/_layout";
import { Route as questionCreateIndexRoute } from "./teacher/question/create/index";
import { Route as questionDetailLayout } from "./teacher/question/[id]/_layout";
import { Route as questionDetailRoute } from "./teacher/question/[id]/index";
import { Route as questionEditLayout } from "./teacher/question/[id]/edit/_layout";
import { Route as editQuestionRoute } from "./teacher/question/[id]/edit/index";
import {Route as examTeacherLayoutRoute} from "./teacher/exam/_layout";
import {Route as examTeacherIndexRoute} from "./teacher/exam/index";
import {Route as examTeacherDetailRoute} from "./teacher/exam/[id]/index";
import {Route as examTeacherDetailayoutRoute} from "./teacher/exam/[id]/_layout";

import {Route as examSelectMatrixLayoutRoute} from "./teacher/exam/select-matrix/_layout";
import {Route as examSelectQuestionLayoutRoute} from "./teacher/exam/select-question/_layout";
import {Route as examSelectQuestionIndexRoute} from "./teacher/exam/select-question/index";
import {Route as examSelectMatrixIndexRoute} from "./teacher/exam/select-matrix/index";
import {Route as examReviewMatrixIndexRoute } from "./teacher/exam/review/index";
import { Route as examReviewMatrixLayoutRoute } from "./teacher/exam/review/_layout";

import {Route as examEditLayoutRoute} from './teacher/exam/[id]/edit/_layout';
import {Route as examEditIndexRoute} from './teacher/exam/[id]/edit/index';

const routeTree = rootRoute.addChildren([
    homeRoute,
    examLayoutRoute.addChildren([
        examIndexRoute,
        examDetailRoute.addChildren([
            takeExamLayoutRoute.addChildren([
                takeExamRoute,
            ]),
        ]),
    ]),

    authLayoutRoute.addChildren([
        loginRoute,
        registerRoute,
        forgotPasswordRoute,
    ]),

    teacherLayoutRoute.addChildren([
        templateRouteByTeacher,




         //exam 
        examTeacherLayoutRoute.addChildren([
            examTeacherIndexRoute,
            examTeacherDetailayoutRoute.addChildren([
                examTeacherDetailRoute,
                examEditLayoutRoute.addChildren([
                    examEditIndexRoute,
                ]),
            ]),
             
            examSelectMatrixLayoutRoute.addChildren([
                examSelectMatrixIndexRoute,
            ]),
            examSelectQuestionLayoutRoute.addChildren([
                examSelectQuestionIndexRoute,
            ]),
            examReviewMatrixLayoutRoute.addChildren([
                examReviewMatrixIndexRoute,
            ]),

        ]),

        // question routes
        questionLayoutRoute.addChildren([
            questionIndexRoute,
            questionCreateLayoutRoute.addChildren([
                questionCreateIndexRoute,
            ]),
            questionDetailLayout.addChildren([
                questionDetailRoute,
                questionEditLayout.addChildren([
                    editQuestionRoute,
                ])
            ]),
        ]),

        // matrix routes
        matrixLayoutRoute.addChildren([
            matrixIndexRoute,
            matrixCreateLayoutRoute.addChildren([
                matrixCreateIndexRoute,
            ]),
            matrixDetailLayoutRoute.addChildren([
                matrixDetailRoute,
                matrixEditRoute.addChildren([
                    editMatrixRoute,
                ])
            ])
        ])
    ]),

    userProfileLayoutRoute.addChildren([
        userProfileRoute,
    ]),

    dashboardLayoutRoute.addChildren([
        dashboardUsersRoute,
        dashboardQuestionsRoute,
    ]),
]);

export const router = createRouter({ routeTree });