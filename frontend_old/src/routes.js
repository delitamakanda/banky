import React from 'react';
import { Redirect } from "react-router-dom";

import { DefaultLayout, CustomLayout } from "./layouts";

import Errors from "./views/Errors";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Transactions from './views/Transactions';
import Notifications from './views/Notifications';
import StaticPages from './views/StaticPages';

export default [
    {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/dashboard" />
    },
    {
        path: "/dashboard",
        exact: true,
        layout: DefaultLayout,
        component: Dashboard
    },
    {
        path: "/transactions",
        exact: true,
        layout: DefaultLayout,
        component: Transactions
    },
    {
        path: "/notifications",
        exact: true,
        layout: DefaultLayout,
        component: Notifications
    },
    {
        path: "/profile/:username",
        exact: true,
        layout: DefaultLayout,
        component: Profile
    },
    {
        path: "/profile/:username?editing=true",
        exact: true,
        layout: DefaultLayout,
        component: Profile
    },
    {
        path: "/404",
        exact: true,
        layout: DefaultLayout,
        component: Errors
    },
    {
        path: "/signup",
        exact: true,
        layout: CustomLayout,
        component: Signup
    },
    {
        path: "/login",
        exact: true,
        layout: CustomLayout,
        component: Signin
    },
    {
        path: '/static-pages/:page',
        exact: true,
        layout: CustomLayout,
        component: StaticPages
    }
];
