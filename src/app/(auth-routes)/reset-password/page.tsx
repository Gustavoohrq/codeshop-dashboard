'use client'
import { useSearchParams } from 'next/navigation';
import axiosInstance from "@/app/services/api";
import Alert from "@/components/Alert";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ForgotPasswordImage from "@/components/svgs/ForgotPasswordImage";
import { AxiosResponse } from "axios";
export default function ResetPasssword() {

  const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
  const validationSchema = object().shape({
    password: string()
      .required('Por favor, digite sua nova senha'),
    passwordConfirmation: string()
      .oneOf([ref('password'), ''], 'As senhas não coincidem')
      .required('Por favor, confirme sua nova senha'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const router = useSearchParams();
  const searchParams = new URLSearchParams(router);
  const token = searchParams.get('token');
  async function onSubmit(data: any) {
    try {

      const response: AxiosResponse = await axiosInstance.post('reset-password', { data }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      setAlert([response?.data?.message, "success"]);
    } catch (error: any) {
      setAlert([error?.response?.data?.message || 'Erro ao redefinir senha.', 'error']);
      return
    }
  }

  return (
    <div className="bg-gray-900 flex  w-full h-screen roboto-regular">
      {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : <></>}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="max-w-max text-center">
          <ForgotPasswordImage />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl mb-6  text-left roboto-medium">Redefinir senha</h1>
          <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} >
            <input
              className="p-2 block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="password"
              {...register('password')}
              placeholder="Digite sua nova senha"
            />
            {errors.password && (
              <p className="text-xs roboto-medium  text-red-500">{errors.password.message}</p>
            )}
            <input
              className="p-2 block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="password"
              {...register('passwordConfirmation')}
              placeholder="Confirme sua nova senha"
            />
            {errors.passwordConfirmation && (
              <p className="text-xs roboto-medium  text-red-500">{errors.passwordConfirmation.message}</p>
            )}

            <button
              type="submit"
              className="h-12 rounded-md bg-gray-900 text-white hover:bg-gray-700"
            >
              Enviar
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}