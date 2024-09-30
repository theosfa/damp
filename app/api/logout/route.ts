import { signOut } from '@/auth';

export async function POST() {
  await signOut();
  return new Response('Logged out', { status: 200 });
}