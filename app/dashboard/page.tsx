import Link from 'next/link'

export default function DashboardPage() {
    return (
      <div>
        <h1>Welcome to your Dashboard!</h1>
        <Link href="/dashboard/succesfull">To succsesfull</Link>
      </div>
    );
  }