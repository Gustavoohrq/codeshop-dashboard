'use client'
import { LogOut, LayoutDashboard, Users, Store, Code2Icon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter()
    async function logout() {
         signOut({
            redirect: false
        }).then(res => {
            router.replace('/login')
        })
    }
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center p-3.5 mb-5">
                    <Code2Icon className="h-6 w-6 me-3 sm:h-7 dark:text-white" />
                    <span className="text-xl font-bold whitespace-nowrap dark:text-white">CodeShop</span>
                </div>
                <div className="w-full bg-gray-600 h-px"></div>
                <ul className="mt-4 space-y-2 font-medium">
                    <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <Users className="w-5 h-5" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
    );
}
