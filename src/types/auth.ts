export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expires_in: number;
}
