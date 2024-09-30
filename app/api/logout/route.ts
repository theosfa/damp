import { deleteSession } from '@/app/lib/session';
import { signOut } from '@/auth';

export async function POST() {
  deleteSession();
  await signOut();
  return new Response('Logged out', { status: 200 });
}