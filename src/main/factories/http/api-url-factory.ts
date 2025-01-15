export const makeApiUrl = (path: string): string => {
  return `${import.meta.env.API_URL}${path}`;
};
