'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres'; // Ensure this imports your db connection
import { SignupFormSchema } from '@/app/lib/definitions';
import { createSession } from '@/app/lib/session'; // Session handling logic

export async function signup(formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  
  // If validation fails, return the error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);
  const client = await db.connect();

  // Check if user already exists
  const existingUser = await client.sql`SELECT * FROM users WHERE email = ${email}`;
  if (existingUser.rowCount > 0) {
    return { error: 'User already exists' };
  }

  // Insert new user into the database
  const user = await client.sql`
    INSERT INTO users (name, email, password, task_ids, project_ids)
    VALUES (${name}, ${email}, ${hashedPassword}, ${JSON.stringify([])}, ${JSON.stringify([])})
    RETURNING id
  `;

  // If user creation fails, return an error
  if (!user) {
    return { error: 'An error occurred while creating your account.' };
  }
  await signIn('credentials', formData);
  // Create session for the user
  await createSession(user.rows[0].id);

  // Redirect user to profile page
  redirect('/succesfull');
}


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
          }
        }
        throw error;
      }
}



export async function fetchUserData(userId: string) {
  const client = await db.connect();
  const data = await client.sql`
    SELECT * FROM users
    WHERE id = ${userId}
  `;

  // Check if data is retrieved
  if (data.rows.length === 0) {
    throw new Error('User not found');
  }

  const { password, ...user } = data.rows[0]; // Destructure to remove password
  console.log(user.name); // Log the user's name for debugging
  return user;
}