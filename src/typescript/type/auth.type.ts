export type SignupType = { 
    name: string | undefined
    email: string
    password: string
    
}

export type LoginType = {
    email: string,
    password: string
}

export type LoginResponse = {
  success: boolean;
  message: string;
  user: {
    userId: string ;
    role: string;
    name: string ;
    email: string ;

  };
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    userId: string;
    role: string ;
    name: string ;
    email: string ;
  };
};