import { signOut } from '@/auth'
import Link from 'next/link'
import { deleteSession } from '@/app/lib/session';
export default function SuccesfullPage () {
    return (
    <main>
        <h1>Logged in succesfully</h1>
        <Link href="/profile">To profile</Link>
        <form
          action={async () => {
            'use server';
            await deleteSession();
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </main>
    )
}
// 'use client';

// import Link from 'next/link';

// export default function SuccesfullPage() {
//   const handleLogout = async () => {
//     await fetch('/api/logout', {
//       method: 'POST',
//     });
//     await fetch('/api/session/delete', {
//       method: 'POST',
//     });
//     window.location.href = '/login'; // Redirect to home after logging out
//   };

//   return (
//     <main>
//       <h1>Logged in successfully</h1>
//       <Link href="/profile">To profile</Link>
//       <button
//         className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
//         onClick={handleLogout}
//       >
//         <div className="hidden md:block">Sign Out</div>
//       </button>
//     </main>
//   );
// }
