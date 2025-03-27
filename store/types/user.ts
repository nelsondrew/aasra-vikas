export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  photoURL: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
} 