import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await auth();
  let userData = null;

  if (session?.user?.name) {
    userData = await prisma.user.findUnique({
      where: { username: session.user.name },
      select: { level: true, exp: true, image: true }
    });
  }

  return <NavbarClient userData={userData} isAuthenticated={!!session} />;
}