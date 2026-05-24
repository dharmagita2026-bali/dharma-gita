import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.name) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { username: session.user.name },
  });

  if (!user) redirect("/login");

  if (user.role === "admin") {
    redirect("/admin");
  }

  return <ProfileClient user={user} />;
}