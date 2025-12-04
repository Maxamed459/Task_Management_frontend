export interface UserRegistration {
  data: {
    user: {
      id: number;
      full_name: string;
      email: string;
  };
  access_token: string;
  refresh_token: string;
}
  }
  
export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
}

export interface authState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | Record<string, string[]> | null;
}

export interface Task {
  owner: string;
  id: number;
  title: string;
  description: string;
  due_date: string;
  priority: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}