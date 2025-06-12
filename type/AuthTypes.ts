export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  country_code?: string;
  login_ip?: string;
  role?: number | string;
  device_type?: string;
  industry?: string;
  location?: string;
  bio?: string;
  website?: string;
  profile_category_type?: number;
  interest_id?: string;
}

export interface SignInFormData {
  email: string;
  password: string;
  device_type: number;
  device_token: string;
  device_token_voip_ios: string;
}

export interface AuthResponse {
  status: number;
  statusText: string;
  message: string;
  data: {
    user: { username: string; email: string; id?: number };
    token: string;
  };
}
