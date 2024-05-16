import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  console.log(session)
  if(session) {
    redirect('/home')
  }
  return <>{children}</>
}
