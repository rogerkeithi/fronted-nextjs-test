import { LogoutButton } from "@/app/auth";
import { User } from "app/user";
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <User />
      <div className="mb-8">
        <LogoutButton />
      </div>
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Server Session</h2>
        <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </main>
  );
}
