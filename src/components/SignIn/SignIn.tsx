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
import { SocialLoginButtons } from '../SocialLoginButtons';
import { LogoLink } from '../LogoLink';
import { useTranslation } from 'react-i18next';

export function SignIn() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
            <Button fill>{t('Common.SignIn')}</Button>
          </div>
          <div className="display-flex margin-right">
            <a>{t('SignIn.ForgotPassword')}</a>
          </div>
        </div>
        <p className="margin-left">
          {t('SignIn.DontHaveAccount')}{' '}
          <Link href="/signup" className="margin-left-half">
            {t('Common.SignUp')}
          </Link>
        </p>
        <SocialLoginButtons />
      </List>
    </Page>
  );
}
