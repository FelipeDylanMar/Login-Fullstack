export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  status?: string; 
  role?: string;   
}