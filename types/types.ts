export interface UserRegistration {
  user: {
    username: string;
    email: string;
    password: string;
    confirmation: string;
  };
  token: string;
}
export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface authState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
