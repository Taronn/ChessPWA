export function useEnvVars() {
    const {VITE_IDENTITY_SERVER_URL, VITE_RECAPTCHA_SITE_KEY} = import.meta.env;
    return {
        authServerURL: VITE_IDENTITY_SERVER_URL,
        recaptchaSiteKey: VITE_RECAPTCHA_SITE_KEY,
    };
}