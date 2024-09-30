import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';
import { createSession } from '@/app/lib/session';
import { SignupFormSchema } from '@/app/lib/definitions';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function signUp(
  formData: FormData,
) {
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
  const client = await sql.connect();

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
  await createSession(user.rows[0].id);
  await signIn('credentials', formData);
  // Create session for the user

  // Redirect user to profile page
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch){
            console.log("Hello from auth34")
            await createSession(user.id);
            return user;
          } 
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
