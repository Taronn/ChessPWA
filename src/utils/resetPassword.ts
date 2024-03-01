import { f7 } from 'framework7-react';
import { t } from 'i18next';
import { useEnvVars } from '../hooks/useEnvVars';

export function resetPassword(email: string, username: string) {
  const { authServerURL } = useEnvVars();
  let dialog = f7.dialog.create({
    text: t('SignIn.ResetPasswordMessage', { email }),
    title: t('SignIn.ResetPassword'),
    content: `
            <div class="item-input item-input-outline">
              <div class="item-input-wrap">
                <input type="text" id="token" placeholder="******" class="dialog-input" style="font-family: 'Courier New', monospace; letter-spacing: 12px; border-bottom: 1px solid #ccc;" maxlength="6">
              </div>
            </div>
            <div class="item-input item-input-outline">
              <div class="item-input-wrap">
                <input type="password" id="password" placeholder="${t('SignIn.NewPassword')}" class="dialog-input" style="font-family: 'Courier New', monospace; border-bottom: 1px solid #ccc;">
              </div>
            </div>
            `,
    buttons: [
      {
        text: t('Common.Verify'),
        onClick: async (dialog, event) => {
          event.preventDefault();
          const res = await fetch(`${authServerURL}/auth/reset-password`, {
            method: 'PATCH',
            body: JSON.stringify({
              Username: username,
              Token: dialog.$el.find('#token').val(),
              Password: dialog.$el.find('#password').val(),
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (res.ok) {
            dialog.close();
            f7.dialog.alert(t('SignIn.PasswordResetSuccess'), '', () =>
              f7.views.main.router.navigate('/login')
            );
          } else {
            dialog.close();
            const errorCode = (await res.json()).message;
            const message = t(`Errors.${errorCode}`);
            f7.dialog.alert(message, '', () => dialog.open());
          }
        },
      },
    ],
  });

  dialog.open();
}
