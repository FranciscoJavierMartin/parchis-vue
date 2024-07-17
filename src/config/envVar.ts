export const envVars = {
  debug: !import.meta.env.PROD && import.meta.env.VITE_APP_DEBUG === 'true',
};
