export const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  group: string;
  token: string;
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
