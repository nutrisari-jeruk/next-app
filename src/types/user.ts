export interface User {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  role_id: string;
  role: string;
  token: string;
}

export interface Role {
  role_id: number;
  role: string;
}

export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  roles: Role[];
}
