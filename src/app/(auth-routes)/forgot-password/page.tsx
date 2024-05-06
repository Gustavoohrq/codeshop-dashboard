'use client'

import axiosInstance from "@/app/services/api";
import Alert from "@/components/Alert";
import ForgotPasswordImage from "@/components/svgs/ForgotPasswordImage";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { object, ref, string, } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from "axios";
export default function ForgotPasssword() {
  const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
  const validationSchema = object().shape({
    email: string()
      .min(4, "A senha deve ter no mínimo 4 caracteres")
      .max(20, "A senha deve ter no máximo 20 caracteres")
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'A senha é fraca. Deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial'
      )
      .required('Por favor, digite seu email'),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  async function onSubmitForm(data: object) {
    try {
      setAlert(null)
      const response: AxiosResponse = await axiosInstance.post('forgot-password', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setAlert([response?.data?.message, "success"]);
      reset()
    } catch (error: any) {
      setAlert([error?.response?.data?.message || 'Erro ao enviar email de reset.', 'error']);
      return
    }

  }

  return (
    <div className="bg-gray-900 flex  w-full h-screen roboto-regular">
      <Alert message={alert ? alert[0] : ''} showAlert={!!alert} alertType={alert ? alert[1] : 'error'} />
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="max-w-max text-center">
          <ForgotPasswordImage />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl mb-6 text-left roboto-medium">Esqueceu sua senha?</h1>
          <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit(onSubmitForm)} >
            <input
              className="p-2 block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Digite seu e-mail"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs roboto-medium  text-red-500">{errors.email.message}</p>
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