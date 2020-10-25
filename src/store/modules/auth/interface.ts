export interface AuthUser {
  token: string;
  expiresIn: Date | string | number;
  firstName: string;
  lastName: string;
  email: string;
  refreshToken: string;
  dob?: string;
}
