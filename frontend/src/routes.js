import React from "react";
import { Redirect } from "react-router-dom";

import { DefaultLayout, CustomLayout } from "./layouts";

import Errors from "./views/Errors";
import Dashboard from "./views/Dashboard";
import Signin from "./views/Signin";
import Signup from "./views/Signup";

import AuthService from './services/AuthService';

export default [
    {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/dashboard" />
    },
    {
        path: "/dashboard",
        layout: DefaultLayout,
        component: () => !AuthService.loggedIn() ? <Redirect to="/login" /> : Dashboard
    },
    {
        path: "/404",
        layout: DefaultLayout,
        component: Errors
    },
    {
        path: "/signup",
        layout: CustomLayout,
        component: Signup
    },
    {
        path: "/login",
        layout: CustomLayout,
        component: Signin
    },
];
