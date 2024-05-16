import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


interface PrivateAdminLayoutProps {
  children: ReactNode
}

export default async function PrivateAdminLayout({
  children,
}: PrivateAdminLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  
  if(session?.user.exp && Math.floor(Date.now() / 1000) > session?.user.exp || !session) {
    redirect('/login')
  }
  return <>{children}</>
}
