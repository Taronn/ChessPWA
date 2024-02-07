import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import {AuthSuccess} from "../pages/AuthSuccess";

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: SignInPage,
  },
  {
    path: '/signup',
    component: SignUpPage,
  },
  {
    path: '/auth-success/:accessToken/:refreshToken',
    component: AuthSuccess,
  }
];

export default routes;
