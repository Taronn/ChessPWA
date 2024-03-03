import { Button } from 'framework7-react';

export function Profile() {
  function logOut() {
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
window.location.href = '/login';
  }
  return (
    <div>
      <Button onClick={logOut} text='Log Out'/>
    </div>
  );
}