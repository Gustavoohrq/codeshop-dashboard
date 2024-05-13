'use client'

import Sidebar from "../../../components/Sidebar";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/services/api";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { PencilIcon, Trash } from "lucide-react";
import ModalUser from "@/components/ModalUser";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Estado para armazenar os usuários filtrados
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para armazenar
  const session: any = useSession()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.data) {
          const response: AxiosResponse = await axiosInstance.get('user', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.data?.accessToken}`
            }
          });
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchData();
  }, [session?.data?.accessToken]);
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);
  return (
    <>
      <Sidebar />

      <ModalUser isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} deleteModal={deleteModal} title="Editar usuário" user={user} />
      <div className="p-5 sm:ml-72 bg-gray-50 dark:bg-gray-900">

        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="grid gap-4 mb-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="pb-4 bg-white dark:bg-gray-900 ">
                <div className="relative mt-1">
                  <input type="text" id="table-search" onChange={(e) => setSearchTerm(e.target.value)} className="block h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar" />
                </div>

              </div>
              {session?.data?.user?.role?.name == "ADMIN" ?
                <div className="pb-4 bg-white dark:bg-gray-900 ">
                  <button type="submit" onClick={() => { setOpenModal(true); setUser(null); setDeleteModal(false) }} className="text-white mr-6 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Criar usuário
                  </button>
                </div>
                : <></>
              }

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cargo
                    </th>
                    {session?.data?.user?.role?.name == "ADMIN" ?
                      <>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Remove</span>
                        </th>
                      </>
                      : <></>
                    }
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.name}
                      </th>
                      <td className="px-6 py-4">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">

                        {user.status == "active" ?
                          <span className="px-2 py-1  font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Ativo </span>
                          :
                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> Inativo </span>
                        }
                      </td>
                      <td className="px-6 py-4">

                        {user.role?.name}
                      </td>
                      {session?.data?.user.role?.name == "ADMIN" ?
                        <>
                          <td className="px-6 py-4 text-right">
                            <PencilIcon size={18} onClick={() => { setOpenModal(true); setUser(user); setDeleteModal(false) }} className="cursor-pointer" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Trash size={18} className="cursor-pointer" onClick={() => { setOpenModal(true); setUser(user); setDeleteModal(true) }} />
                          </td>
                        </>
                        : <></>
                      }

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
