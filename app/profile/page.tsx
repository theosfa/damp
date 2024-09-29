// app/profile/page.tsx
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session'; // Your custom session decrypt function
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { fetchUserData } from '@/app/lib/actions';

export default async function ProfilePage() {
  const sessionCookie = cookies().get('authjs.session-token')?.value;
  console.log(sessionCookie);
  
  // Decrypt the session to get the user data
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  console.log(session);
  
  // Check if session is valid, if not redirect to login
  // if (!session) {
  //   redirect('/login'); // If no session, redirect to login
  // }

  // Fetch user data using userId from the session
  const userData = await fetchUserData(session.userId);
  console.log(userData);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <h1>User ID: {userData.id}</h1>
      <h1>Email: {userData.email}</h1>
      <h1>Name: {userData.name}</h1>
      
      <Link href="/succesfull">To Succesfull</Link>
    </div>
  );
}
