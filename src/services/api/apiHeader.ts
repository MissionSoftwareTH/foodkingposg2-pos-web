

export const getApiHeaders = () => {
  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;
  const basicAuth = "Basic " + btoa(`${username}:${password}`);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": basicAuth,
    "x-platform": 'web',
    "accept-language": 'EN',
  };

  return headers;
}
