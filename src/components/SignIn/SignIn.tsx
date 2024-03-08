import {
  Button,
  Icon,
  Link,
  List,
  ListInput,
  LoginScreenTitle,
  Page,
  f7,
} from 'framework7-react';
import { useCallback, useMemo, useState } from 'react';
import { validatePassword, validateUsername } from '../../utils/validation';
import { SocialLoginButtons } from '../Shared/SocialLoginButtons';
import { LogoLink } from '../Shared/LogoLink';
import { useTranslation } from 'react-i18next';
import { useIsnFetch } from '../../hooks/useFetch';
import { verifyEmail } from '../../utils/emailVerification';
import { CachePolicies } from 'use-http';
import { handleErrorMessage } from '../../utils/handleErrorMessage';
import { resetPassword } from '../../utils/resetPassword';

export function SignIn() {
  const { t } = useTranslation();
  const { post: postSignin, response: signinResponse, loading: signinLoading } = useIsnFetch('/auth/signin', {
    cachePolicy: CachePolicies.NO_CACHE,
  });
  const { patch: patchForgotPassword, response: forgotPasswordResponse } = useIsnFetch('/auth/forgot-password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      await postSignin({
        Username: username,
        Password: password,
      });
      if (signinResponse.ok) {
        const { AccessToken, RefreshToken } = signinResponse.data;
        f7.view.main.router.navigate(`/auth-success/${AccessToken}/${RefreshToken}`);
      } else {
        const {errorCode, message} = handleErrorMessage(signinResponse);
        f7.dialog.alert(message, '', () => {
          if (errorCode === 'EMAIL_NOT_VERIFIED') {
            verifyEmail(username, username);
          }
        });
      }
    },
    [username, password, postSignin, signinResponse]
  );

  const forgotPassword = useCallback(
      async () => {
        const message = validateUsername(username);
        if (message) {
          return f7.dialog.alert(message, '');
        }
        await patchForgotPassword({ Username: username });
        if (forgotPasswordResponse.ok) {
          resetPassword(forgotPasswordResponse.data, username);
        } else {
          const { message} = handleErrorMessage(forgotPasswordResponse);
          f7.dialog.alert(message, '');
        }
      },[forgotPasswordResponse, patchForgotPassword, username]
  );

  const handleUsernameChange = useCallback((e) => {
    const username = e.target.value;
    const message = validateUsername(username);
    e.target.setCustomValidity(message);
    e.target.reportValidity();
    setUsername(username);
  }, []);
  const handlePasswordChange = useCallback((e) => {
    const password = e.target.value;
    const message = validatePassword(password);
    e.target.setCustomValidity(message);
    e.target.reportValidity();
    setPassword(password);
  }, []);

  const iconClassName = useMemo(
    () => (f7.theme === 'ios' ? 'padding-top margin-top-half' : ''),
    []
  );

  return (
    <Page loginScreen name="login">
      <LoginScreenTitle>
        <LogoLink size="50px" />
      </LoginScreenTitle>
      <List strongIos form>
        <ListInput
          label={t('Common.Username')}
          type="text"
          placeholder={t('SignIn.UsernamePlaceholder')}
          value={username}
          floatingLabel
          validate
          onInput={handleUsernameChange}
        >
          <Icon
            material="alternate_email"
            className={iconClassName}
            slot="media"
          />
        </ListInput>
        <ListInput
          label={t('Common.Password')}
          type="password"
          placeholder={t('SignIn.PasswordPlaceholder')}
          value={password}
          floatingLabel
          validate
          onInput={handlePasswordChange}
        >
          <Icon material="password" className={iconClassName} slot="media" />
        </ListInput>

        <div className="display-flex justify-content-space-between margin-top">
          <div className="display-flex margin-left">
            <Button
              fill
              loading={signinLoading}
              onClick={submit}
              type={'submit'}
              disabled={!username || !password}
            >
              {t('Common.SignIn')}
            </Button>
          </div>
          <div className="display-flex margin-right">
            <a onClick={forgotPassword}>{t('SignIn.ForgotPassword')}</a>
          </div>
        </div>
        <p className="margin-left">
          {t('SignIn.DontHaveAccount')}{' '}
          <Link href={"/signup"} className="margin-left-half">
            {t('Common.SignUp')}
          </Link>
        </p>
        <SocialLoginButtons />
      </List>
    </Page>
  );
}
