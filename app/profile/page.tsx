// app/profile/page.tsx
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import Link from 'next/link';
import { fetchUserData } from '@/app/lib/actions';
import { SessionPayload } from '@/app/lib/definitions';

export default async function ProfilePage() {
  const sessionCookie = cookies().get('session')?.value;
  console.log(sessionCookie);
  
  // Decrypt the session to get the user data
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  console.log(session);
  
    // Fetch user data using userId from the session
    
    const typedSession = session as SessionPayload | null;

  // Check if the session exists and has a valid userId
  if (!typedSession || !typedSession.userId) {
    return <div>No valid session found</div>;
  }

  // Fetch user data using userId from the session
  const userData = await fetchUserData(typedSession.userId);
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
// app/profile/page.tsx
// import Link from 'next/link';
// import { fetchUserData } from '@/app/lib/actions';

// export default async function ProfilePage() {
  
//   const session = await fetch('/api/session', {
//     method: 'GET',
//   });
//   // console.log(session);
//   // Fetch user data using userId from the session
//   // const userData = await fetchUserData(session.userId);

//   return (
//     <div className="profile-page">
//       <h1>Profile</h1>
//       {/* <h1>User ID: {userData.id}</h1>
//       <h1>Email: {userData.email}</h1>
//       <h1>Name: {userData.name}</h1> */}
      
//       <Link href="/succesfull">To Succesfull</Link>
//     </div>
//   );
// }
