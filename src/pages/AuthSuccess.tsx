import { Page } from 'framework7-react';

export function AuthSuccess({f7route}) {
    const {accessToken, refreshToken} = f7route.params;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log(location)
    location.href = location.origin + '/play';
    return (
        <Page name="auth-success">
        </Page>
    );
}
