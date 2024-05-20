'use client'
import { LogOut, LayoutDashboard, Users, Store, } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";


export default function Sidebar() {
    const session: any = useSession()
    const router = useRouter()


    async function logout() {
        signOut({
            redirect: false
        }).then(res => {
            router.replace('/login')
        })
    }
    return (
        <>
            <aside id="default-sidebar" className=" fixed bg-gray-100 px-4 py-4 dark:text-white  dark:bg-gray-800 top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="flex items-center p-2 space-x-4 mb-5">
                    <img src={session?.data?.user?.picture ? session?.data?.user?.picture : `https://robohash.org/${session?.data?.user?.email}`} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                    <div>
                        <h2 className="text-lg font-semibold">{session?.data?.user?.name || ""}</h2>
                        <span className="flex items-center space-x-1">
                            <a rel="noopener noreferrer" href="account" className="text-xs hover:underline dark:text-gray-400 ">Ver perfil</a>
                        </span>
                    </div>
                </div>
                <div className="h-full overflow-y-auto ">
                    <div className="w-full bg-gray-600 h-px"></div>
                    <ul className="mt-4 space-y-2 font-medium">
                        <li>
                            <a href="home" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="users" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Users className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="products" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Store className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={logout} className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LogOut className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap" >Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </aside>
        </>
    );
}
