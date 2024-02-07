export function useEnvVars() {
    const {VITE_IDENTITY_SERVER_URL} = import.meta.env;
    return {
        authServerURL: VITE_IDENTITY_SERVER_URL,
    };
}