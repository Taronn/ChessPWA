import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { AuthSuccess } from '../pages/AuthSuccess';
import { MainPage } from '../pages/MainPage';

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
    beforeEnter: function ({ resolve, reject }) {
      const isLoggedIn = localStorage.getItem('isLoggedin') === 'true';
      if (!isLoggedIn) {
        resolve();
      } else {
        reject();
      }
    },
  },
  {
    name: 'login',
    path: '/login',
    component: SignInPage,
  },
  {
    name: 'signup',
    path: '/signup',
    component: SignUpPage,
  },
  {
    name: 'auth-success',
    path: '/auth-success/:accessToken/:refreshToken',
    component: AuthSuccess,
  },
  {
    path: '/',
    component: MainPage,
    tabs: [
      {
        name: 'players',
        path: '/players',
        id: 'players',
      },
      {
        name: 'games',
        path: '/games',
        id: 'games',
      },
      {
        name: 'chess',
        path: '/chess',
        id: 'chess',
      },
      {
        name: 'chat',
        path: '/chat',
        id: 'chat',
      },
      {
        name: 'profile',
        path: '/profile',
        id: 'profile',
      },
    ],
  },
];

export default routes;
