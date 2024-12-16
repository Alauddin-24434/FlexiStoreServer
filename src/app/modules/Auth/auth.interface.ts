import { Role } from "@prisma/client";

export interface TUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
