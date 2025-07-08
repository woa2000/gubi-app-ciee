export const getApiBaseUrl = () => {
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  return devMode ? process.env.NEXT_PUBLIC_API_URL_DEV! : process.env.NEXT_PUBLIC_API_URL_PROD!;
};