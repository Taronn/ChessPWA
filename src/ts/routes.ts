import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';

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
];

export default routes;
