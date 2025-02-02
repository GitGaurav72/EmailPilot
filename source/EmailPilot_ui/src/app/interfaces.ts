// User-related interfaces
export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName : string;
    about : string;
    email: string;
    password?: string; // Optional, used only during registration/login
    crtAt: Date;
    updtdBy: Date;
  }
  export interface LoginReposne {
    token: string;
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string | null;
  }
  export interface LoginCredentials {
    usernameOrEmail: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    firstName : string;
    lastName : string;
    userName: string;
    email: string;
    password: string;
  }
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }
  // Error handling interfaces
  export interface ErrorResponse {
    statusCode: number;
    message: string;
    error: string;
  }