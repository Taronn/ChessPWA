import { f7 } from 'framework7-react';
import { t } from 'i18next';
import { useEnvVars } from '../hooks/useEnvVars';

export function verifyEmail(email: string, username: string) {
  const { authServerURL } = useEnvVars();
  let dialog = f7.dialog.create({
    text: t('Common.VerifyEmailMessage', { email }),
    title: t('Common.VerifyEmail'),
    content: `
            <div class="item-input item-input-outline">
              <div class="item-input-wrap">
                <input type="text" class="dialog-input" style="font-family: 'Courier New', monospace; letter-spacing: 12px; border-bottom: 1px solid #ccc;" maxlength="6">
              </div>
            </div>
            `,
    buttons: [
      {
        text: t('Common.Verify'),
        onClick: async (dialog, event) => {
          event.preventDefault();
          const res = await fetch(`${authServerURL}/auth/verify-email`, {
            method: 'PATCH',
            body: JSON.stringify({
              Username: username,
              Token: dialog.$el.find('input').val(),
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (res.ok) {
            dialog.close();
            f7.dialog.alert(t('Common.EmailVerified'), '', () =>
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
