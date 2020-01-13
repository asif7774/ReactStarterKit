import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { defaultLayout, authLayout } from "./layouts";

// Route Views
import LoginComponent from "./components/authentication/login";
// import ResetPassword from "./views/ResetPassword";


export default [
  {
    path: "/",
    exact: true,
    layout: authLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: authLayout,
    component: LoginComponent
  },
  {
    path: "/reset-password",
    layout: defaultLayout,
    component: LoginComponent
  },
  // {
  //   path: "/forgot-password",
  //   layout: AuthLayout,
  //   component: ForgotPassword
  // },
  // {
  //   path: "/companies",
  //   layout: DefaultLayout,
  //   component: CompanyListComponent
  // },
   
];