import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GameDashboardClient from "./GameDashboardClient";

export default async function GamePage() {
  const session = await auth();
  
  if (!session?.user?.name) redirect("/login");

  return <GameDashboardClient />;
}