export const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  group: string;
  token: string;
}
