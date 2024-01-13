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
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateUsername,
} from '../../utils/validation';
import { SocialLoginButtons } from '../SocialLoginButtons';
import { LogoLink } from '../LogoLink';
import { useTranslation } from 'react-i18next';

export function SignUp() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    const message = validateEmail(email);
    e.target.setCustomValidity(message);
    e.target.reportValidity();
    setEmail(email);
  }, []);

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

  const handleConfirmChange = useCallback(
    (e) => {
      const confirm = e.target.value;
      const message = validatePasswordMatch(password, confirm);
      e.target.setCustomValidity(message);
      e.target.reportValidity();
      setConfirm(e.target.value);
    },
    [password]
  );

  const iconClassName = useMemo(
    () => (f7.theme === 'ios' ? 'padding-top margin-top-half' : ''),
    []
  );

  return (
    <Page loginScreen name="signup">
      <LoginScreenTitle>
        <LogoLink size="50px" />
      </LoginScreenTitle>
      <List strongIos form>
        <ListInput
          label={t('Common.Email')}
          type="email"
          placeholder="example@email.com"
          value={email}
          floatingLabel
          validate
          onInput={handleEmailChange}
        >
          <Icon material="email" className={iconClassName} slot="media" />
        </ListInput>

        <ListInput
          label={t('Common.Username')}
          type="text"
          placeholder={t('SignUp.UsernamePlaceholder')}
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
          placeholder={t('SignUp.PasswordPlaceholder')}
          value={password}
          floatingLabel
          validate
          onInput={handlePasswordChange}
        >
          <Icon material="password" className={iconClassName} slot="media" />
        </ListInput>
        <ListInput
          label={t('SignUp.ConfirmPassword')}
          type="password"
          placeholder={t('SignUp.RepeatPassword')}
          value={confirmPassword}
          floatingLabel
          validate
          onInput={handleConfirmChange}
        >
          <Icon material="password" className={iconClassName} slot="media" />
        </ListInput>

        <div className="display-flex justify-content-space-between margin-top">
          <div className="display-flex margin-left">
            <Button fill type="submit">
              {t('Common.SignUp')}
            </Button>
          </div>
          <div className="display-flex margin-right">
            <Link href="/login">{t('SignUp.AlreadyHaveAccount')}</Link>
          </div>
        </div>
        <p className="margin-left">{t('SignUp.LogInWith')}</p>
        <SocialLoginButtons />
      </List>
    </Page>
  );
}
