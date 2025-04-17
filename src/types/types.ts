export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UserUpdateData {
  id: string;
  email?: string;
  password?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface loginData {
  email: string;
  password: string;
}
