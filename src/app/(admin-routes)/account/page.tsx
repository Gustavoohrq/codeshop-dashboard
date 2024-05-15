'use client'

import axiosInstance from '@/app/services/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import Alert from "@/components/Alert";
import Sidebar from '@/components/Sidebar';
import ModalPassword from '@/components/ModalPassword';

export default function AccountPage() {
  const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState();

  const {
    register,
    reset,
    handleSubmit,
  } = useForm()
  const session: any = useSession()
  useEffect(() => {
    setUser(user)
    reset({
      name: session?.data?.user?.name || "",
      email: session?.data?.user?.email || "",
      picture: session?.data?.user?.picture || "",
    })
  }, [session?.data?.user]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  async function handleEdit(data: object) {
    try {
      setAlert(null)
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('picture', selectedImage);

      await axiosInstance.put(`user/${session?.data?.user?.id}`, selectedImage ? formData : data, {
        headers: {
          'Content-Type': selectedImage ? 'multipart/form-data' : 'application/json',
          'Authorization': `Bearer ${session?.data?.access_token}`
        }
      });
      setAlert(["Dados atualizados com sucesso.", "success"]);
      reset()
    } catch (error: any) {
      setAlert([error?.response?.data?.message || 'Erro ao alterar informações.', 'error']);
      return;
    }

  }


  return (
    <>
      {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : <></>}
      <Sidebar />

      <ModalPassword isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

      <div className="p-5 sm:ml-72 bg-gray-50 dark:bg-gray-900">
        <div className="p-4 border-2  justify-center items-center border-gray-200 rounded-lg dark:border-gray-700">
          <div className='flex justify-center items-center'>
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : session?.data?.user?.picture ? session?.data?.user?.picture : `https://robohash.org/${session?.data?.user?.email}`} alt="" className="w-20 h-20 rounded-full dark:bg-gray-500" />

          </div>
          <form className="p-4 md:p-5 " onSubmit={handleSubmit(handleEdit)} >
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">

                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                <input type="text" {...register('name')} name="name" id="name" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />

              </div>
              <div className="col-span-2">
                <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto</label>
                <input type="file" onChange={imageChange} name="picture" id="picture" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>

                <input type="email" disabled {...register('email')} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
              </div>

            </div>
            < button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Salvar
            </button>


          </form>
            < button onClick={() => { setOpenModal(true); }} type="button" className="text-white inline-flex items-center m-4 bg-slate-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-900 border-2 border-gray-200 dark:hover:bg-slate-700 dark:focus:ring-blue-800 transition-all duration-300">
              Alterar senha
            </button>
        </div>

      </div >



    </>


  );
}
