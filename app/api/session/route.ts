import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers'

export async function GET() {
  const sessionCookie = cookies().get('session')?.value;

  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  console.log(session);

//   return session;
  return new Response('Session deleted', { status: 200 });
}