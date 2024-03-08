export function useEnvVars() {
    // @ts-expect-error  - This is a valid import statement
    const {VITE_IDENTITY_SERVER_URL, VITE_DOTNET_URL, VITE_RECAPTCHA_SITE_KEY} = import.meta.env;
    return {
        authServerURL: VITE_IDENTITY_SERVER_URL,
        dotnetURL: VITE_DOTNET_URL,
        recaptchaSiteKey: VITE_RECAPTCHA_SITE_KEY,
    };
}