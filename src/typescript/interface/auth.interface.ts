

export interface InputInterface {
    label: string
    type: string
    required: boolean
    name: string
    
 }

 export interface AuthState {
  loading: boolean;
  registerError: string | null;
  loginError: string | null;
  token: string | null;
  user: {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
  };
  role: string | null;
}
 

 