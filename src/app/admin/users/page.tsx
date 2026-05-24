import { prisma } from "@/lib/prisma";
import UsersClient from "./UsersClient";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <header className="border-b-2 border-[#D7CCC8] pb-6 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-[#4E342E] uppercase italic tracking-tighter">
            Daftar Pengguna
          </h1>
          <p className="text-[11px] text-[#8D6E63] font-black uppercase tracking-widest mt-2">
            Pengelolaan Pengguna
          </p>
        </div>
      </header>

      <UsersClient users={users} />
    </>
  );
}