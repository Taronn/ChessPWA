import { Page } from 'framework7-react';

export function AuthSuccess({f7route}) {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    localStorage.setItem('isLoggedin', 'true');
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    location.href = location.origin + '/players';
    return (
        <Page name="auth-success">
        </Page>
    );
}
