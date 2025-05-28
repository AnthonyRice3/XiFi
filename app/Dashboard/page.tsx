import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}