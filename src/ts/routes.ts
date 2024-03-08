import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import {AuthSuccess} from "../pages/AuthSuccess";
import { MainPage } from '../pages/MainPage';

const routes = [
  {
    path: '/',
    component: HomePage,
    beforeEnter: function({ resolve, reject }) {
      const isLoggedIn = localStorage.getItem('isLoggedin') === 'true';
      if (!isLoggedIn) {
        resolve();
      } else {
        reject();
      }
    },
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
  },
  {
    path: '/play',
    component: MainPage,
  },
];

export default routes;
