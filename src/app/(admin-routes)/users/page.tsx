'use client'

import Sidebar from "../../../components/Sidebar";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/services/api";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { PencilIcon, Trash } from "lucide-react";
import ModalUser from "@/components/ModalUser";

export default function UsersPage() {
  const [users, setUsers] = useState<object[]>([]);
  const [user, setUser] = useState<object>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data) {
          const response: AxiosResponse = await axiosInstance.get('user', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.accessToken}`
            }
          });
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <>
      <Sidebar />
      <ModalUser isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} title="Editar usuário" data={user} />
      <div className="p-5 sm:ml-72 bg-gray-50 dark:bg-gray-900">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="grid gap-4 mb-4">
            <div className="pb-4 bg-white dark:bg-gray-900 ">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative mt-1">
                <input type="text" id="table-search" className="block h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar" />
              </div>
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
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.name}
                      </th>
                      <td className="px-6 py-4">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        {user.status}
                      </td>
                      <td className="px-6 py-4">
                        {user.role?.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <PencilIcon size={18} onClick={() => {setOpenModal(true); setUser(user)}} className="cursor-pointer"/>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Trash size={18} className="cursor-pointer"/>
                      </td>
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
