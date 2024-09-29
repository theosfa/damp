// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
import { JWTPayload } from 'jose';

// definitions.ts
export interface SessionPayload extends JWTPayload {
  userId: string;      // The user's ID to uniquely identify them
  expiresAt: Date;     // The expiration date of the session
}
import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

  
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  task_ids: JSON;
  project_ids: JSON;
};

export type Task = {
  id: string;
  title: string;
  task: string;
  creator_id: string;
  worker_ids: JSON;
  status: 'todo' | 'done' | 'inprogress';
}

export type Project = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority_ids: JSON;
  task_ids: JSON;
  admin_ids: JSON;
  manager_ids: JSON;
  worker_ids: JSON;
}

