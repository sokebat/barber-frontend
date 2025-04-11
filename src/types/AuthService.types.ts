export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  token?: string | null;
}