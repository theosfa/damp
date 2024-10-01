'use server';

import { signIn, signUp } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres'; // Ensure this imports your db connection
import { SignupFormSchema } from '@/app/lib/definitions';
import { createSession } from '@/app/lib/session'; // Session handling logic

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     // await signIn('credentials', formData);
//     const result = await signIn('credentials', {
//       redirect: false, // Prevent default redirect behavior
//       email: formData.get('email'),
//       password: formData.get('password'),
//     });

//     if (result?.error) {
//       return { success: false, errorMessage: result.error };
//     }

//     // Manually redirect after successful login
//     redirect('/dashboard/profile');
//     // If login was successful, create a session and redirect to dashboard
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//           default:
//             return 'Something went wrong.';
//           }
//         }
//         throw error;
//       }
// }

export async function authenticate(
  state: { success: boolean; errorMessage?: string | undefined } | undefined,
  formData: FormData
): Promise<{ success: boolean; errorMessage?: string | undefined }> {
  try {
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (result?.error) {
      return {
        success: false,
        errorMessage: result.error || 'Invalid credentials.',
      };
    }
    redirect('/dashboard');
    // On success, redirect or set success status
    return {
      success: true,
      errorMessage: undefined, // No error in success case
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'Something went wrong during authentication.',
    };
  }
}




export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signUp(formData);
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