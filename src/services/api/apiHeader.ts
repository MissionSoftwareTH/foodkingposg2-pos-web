

export const getApiHeaders = () => {
  const username = import.meta.env.VITE_API_AUTH_USERNAME;
  const password = import.meta.env.VITE_API_AUTH_PASSWORD;
  const basicAuth = "Basic " + btoa(`${username}:${password}`);

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "Authorization": basicAuth,
    "x-platform": 'WEB',
    "accept-language": 'TH',
    };

  return headers;
}
