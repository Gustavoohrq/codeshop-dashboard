'use client'

import axiosInstance from '@/app/services/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from "@/components/Alert";
import Sidebar from '@/components/Sidebar';
import ModalPassword from '@/components/ModalPassword';

export default function AccountPage() {
  const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { register, reset, handleSubmit } = useForm();
  const session: any = useSession();

  useEffect(() => {
    setUser(user);
    reset({
      name: session?.data?.user?.name || "",
      email: session?.data?.user?.email || "",
      picture: session?.data?.user?.picture || "",
    });
  }, [session?.data?.user]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  async function handleEdit(data: object) {
    try {
      setAlert(null);
      const formData = new FormData();
      formData.append('name', data?.name);
      if (selectedImage) {
        formData.append('picture', selectedImage);
      }

      await axiosInstance.put(`user/${session?.data?.user?.id}`, selectedImage ? formData : data, {
        headers: {
          'Content-Type': selectedImage ? 'multipart/form-data' : 'application/json',
          'Authorization': `Bearer ${session?.data?.access_token}`
        }
      });
      setAlert(["Dados atualizados com sucesso.", "success"]);
      reset();
    } catch (error: any) {
      setAlert([error?.response?.data?.message || 'Erro ao alterar informações.', 'error']);
      return;
    }
  }

  return (
    <>
      {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : null}
      <Sidebar />
      <ModalPassword isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

      <div className="p-5 sm:ml-72 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className='relative flex justify-center items-center mb-6'>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : session?.data?.user?.picture ? session?.data?.user?.picture : `https://robohash.org/${session?.data?.user?.email}`}
              alt=""
              className="w-20 h-20 rounded-full dark:bg-gray-500"
            />
            <label htmlFor="picture" className="absolute inset-0 flex items-center justify-center rounded-full">
              <div className='w-20 h-20 items-center flex justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full'>
                Alterar
                <input
                  type="file"
                  onChange={imageChange}
                  name="picture"
                  id="picture"
                  className="hidden"
                />
              </div>
            </label>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleEdit)}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
              <input
                type="text"
                {...register('name')}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                disabled
                {...register('email')}
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Salvar
            </button>
            <button
              onClick={() => setOpenModal(true)}
              type="button"
              className="w-full mt-4 text-white bg-slate-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-slate-900 border-2 border-gray-200 dark:hover:bg-slate-700 dark:focus:ring-blue-800 transition-all duration-300"
            >
              Alterar senha
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
