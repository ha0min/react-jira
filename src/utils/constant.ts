export const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  group: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
