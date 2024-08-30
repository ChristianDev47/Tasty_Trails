export interface LoginType {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  direction?: string | null;
  phone?: string | null;
}

export interface AllUser {
  id?: number;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  person?: Person;
  role?: Role;
  access_tokens?: AccessToken[];
}

export type AccessToken = {
  token?: string;
  expiration?: Date;
};

export type Person = {
  name?: string;
  surname?: string;
  direction?: string;
  phone?: string;
};

export type Role = {
  name?: string;
};
