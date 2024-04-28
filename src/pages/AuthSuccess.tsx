import { Page } from 'framework7-react';

export function AuthSuccess({f7route}) {
    const {accessToken, refreshToken} = f7route.params;
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
