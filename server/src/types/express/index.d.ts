export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  status?: string; 
  role?: string;   
}

declare module 'prerender-node' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prerender: any;
  export = prerender;
}