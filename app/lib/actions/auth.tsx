// import { SignupFormSchema, FormState } from '@/app/lib/definitions'
// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers'
// import { createSession, deleteSession  } from '@/app/lib/session'

 
// export async function signup(state: FormState, formData: FormData) {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//   })
  
//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }
//   const { name, email, password } = validatedFields.data
//   // e.g. Hash the user's password before storing it
//   const hashedPassword = await bcrypt.hash(password, 10)
//   const client = await db.connect();
//   // 3. Insert the user into the database or call an Auth Library's API
//   const existingUser = await client.sql`SELECT * FROM users WHERE email = ${email}`;
//   if (existingUser.rowCount > 0) {
//     return NextResponse.json({ error: 'User already exists' }, { status: 400 });
//   }
//   const user = await client.sql`
//   INSERT INTO users (name, email, password, task_ids, project_ids)
//   VALUES (${name}, ${email}, ${hashedPassword}, ${JSON.stringify([])}, ${JSON.stringify([])})
// `;
 
//   if (!user) {
//     return {
//       message: 'An error occurred while creating your account.',
//     }
//   }
//  // Current steps:
//   // 4. Create user session
//   await createSession(user.id)
//   // 5. Redirect user
//   redirect('/profile')
// }

// export async function logout() {
//   deleteSession()
//   redirect('/login')
// }