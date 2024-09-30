import { deleteSession } from '@/app/lib/session';

export async function POST() {
  deleteSession();
  return new Response('Session deleted', { status: 200 });
}